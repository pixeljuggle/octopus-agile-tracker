import { UnknownObject } from 'types';

export const CalendarIcon = (props: UnknownObject) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-calendar"
      {...props}
    >
      <rect width={18} height={18} x={3} y={4} rx={2} ry={2} />
      <path d="M16 2L16 6" />
      <path d="M8 2L8 6" />
      <path d="M3 10L21 10" />
    </svg>
  );
};
