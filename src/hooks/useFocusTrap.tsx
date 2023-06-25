/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react';

const convertToIntOrFallback = (stringToConvert: string) => {
  const parsed = parseInt(stringToConvert);
  return parsed ? parsed : 0;
};

const sortByTabIndex = (firstNode: any, secondNode: any) => {
  const tabIndexes = [firstNode, secondNode].map((node) => getTabIndexOfNode(node));
  return tabIndexes
    .map((tabIndexValue) => sanitizeTabIndexInput(tabIndexValue, Math.max(...tabIndexes)))
    .reduce((previousValue, currentValue) => previousValue - currentValue);
};

/**
 * Prepares a tab-index to be further processed for the tab order of the focus trap.
 * It can't be less than 0, because negative values can not be part of the tab order at all.
 * In case it's exactly 0 it actually needs to be higher than any positive (> 0) value, since tab-index=0 means "follow the system default order".
 * The default tab order comes _after_ special tab indexes (>0).
 * @param {number} tabIndex The index to sanitize
 * @param {number} highestPositiveTabIndex The largest number among the tab indexes from the same context
 * @throws An error if the tabIndex is less than 0
 * @returns Tha sanitized tab index
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex} for further information on the tabindex and its order
 */
const sanitizeTabIndexInput = (tabIndex: number, highestPositiveTabIndex: number) => {
  if (tabIndex < 0) {
    throw new Error(`Unable to sort given input. A negative value is not part of the tab order: ${tabIndex}`);
  }
  // 0 based tab indexes have a higher order than positive valued indicies, thus we add 1 to the max value
  return tabIndex === 0 ? highestPositiveTabIndex + 1 : tabIndex;
};

const getTabIndexOfNode = (targetNode: any) => {
  return convertToIntOrFallback(targetNode.getAttribute('tabindex'));
};

const focusableElementsSelector =
  'a[href], area[href], input:not([disabled]):not([type=hidden]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
const TAB_KEY = 9;

export const useFocusTrap = () => {
  const trapRef = useRef(null);

  const selectNextFocusableElem = useCallback((sortedFocusableElems: any[], currentIndex: number | undefined, shiftKeyPressed = false, skipCount = 0): any => {
    if (skipCount > sortedFocusableElems.length) {
      // this means that it ran through all of elements but non was properly focusable
      // hence we stop it to avoid running in an infinite loop
      return false;
    }

    const backwards = !!shiftKeyPressed;
    const maxIndex = sortedFocusableElems.length - 1;

    if (!currentIndex) {
      currentIndex = sortedFocusableElems.indexOf(document.activeElement) ?? 0;
    }

    let nextIndex = backwards ? currentIndex - 1 : currentIndex + 1;
    if (nextIndex > maxIndex) {
      nextIndex = 0;
    }

    if (nextIndex < 0) {
      nextIndex = maxIndex;
    }

    const newFocusElem = sortedFocusableElems[nextIndex];

    newFocusElem.focus();

    if (document.activeElement !== newFocusElem) {
      // run another round
      selectNextFocusableElem(sortedFocusableElems, nextIndex, shiftKeyPressed, skipCount + 1);
    }
  }, []);

  // defining the trap function first
  const trapper = useCallback((evt: { which: number; key: string; preventDefault: () => void; shiftKey: any }) => {
    const trapRefElem: any = trapRef.current;
    if (trapRefElem !== null) {
      if (evt.which === TAB_KEY || evt.key === 'Tab') {
        evt.preventDefault();
        const shiftKeyPressed = !!evt.shiftKey;
        let focusableElems = Array.from(trapRefElem.querySelectorAll(focusableElementsSelector)).filter(
          (focusableElement) => getTabIndexOfNode(focusableElement) >= 0
        ); // caching this is NOT a good idea in dynamic applications - so don't!
        // now we need to sort it by tabIndex, highest first
        focusableElems = focusableElems.sort(sortByTabIndex);

        selectNextFocusableElem(focusableElems, undefined, shiftKeyPressed);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', trapper);

    return () => {
      window.removeEventListener('keydown', trapper);
    };
  }, []);

  return [trapRef];
};
