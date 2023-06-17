export const ArrowDownIcon = ({ className = '', size = 1.5, width = 1.5 }) => {
  return (
    <span className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={`${size}rem`}
        height={`${size}rem`}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={width}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
      </svg>
    </span>
  );
};
