import { UnknownObject } from 'types';

export const ChevronsLeft = (props: UnknownObject) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-chevrons-left"
      {...props}
    >
      <path d="M11 17L6 12 11 7" />
      <path d="M18 17L13 12 18 7" />
    </svg>
  );
};
