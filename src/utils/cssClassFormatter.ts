/* eslint-disable @typescript-eslint/no-explicit-any */
//
// example using tailwindCSS intellisense
//
// tag the code block with /*tw*/
//
//
// const fieldStyles = /*tw*/ classnames('flex', 'h-screen w-screen', 'flex-col items-center', 'justify-center p-8 transition-colors')
//

/**
 * to use tailwindCSS intellisense tag the code block with /\*tw\*\/
 * @example
 * const fieldStyles = tw classnames('flex', 'h-screen w-screen', 'flex-col items-center', 'justify-center p-8 transition-colors')
 */

export const classnames = (...classes: unknown[]) => {
  if (!classes.length) return '';
  return classes
    .filter((e) => typeof e === 'string' && e.trim())
    .map((e: any) => e.trim())
    .join(' ');
};
