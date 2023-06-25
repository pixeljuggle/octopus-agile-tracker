import { UnknownObject } from 'types';

export const ChevronsRight = (props: UnknownObject) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-chevrons-right"
      {...props}
    >
      <path d="M13 17L18 12 13 7" />
      <path d="M6 17L11 12 6 7" />
    </svg>
  );
};
