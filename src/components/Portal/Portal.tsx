import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChildrenType } from 'types';

const createWrapperAndAppendToBody = (elementId: string) => {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', elementId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

type PortalPropTypes = {
  elementId: string;
  children: ChildrenType;
};

export const Portal = ({ children, elementId }: PortalPropTypes) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(elementId) as HTMLElement;
    let systemCreated = false;
    // if element is not found with elementId or elementId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(elementId);
    }
    setWrapperElement(element);

    return () => {
      // delete the programatically created element
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [elementId]);

  // wrapperElement state will be null on very first render.
  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};
