/* eslint-disable @typescript-eslint/no-explicit-any */
export const cssClasses = (...classes: unknown[]) => {
  if (!classes.length) return '';
  return classes
    .filter((e) => typeof e === 'string' && e.trim())
    .map((e: any) => e.trim())
    .join(' ');
};
