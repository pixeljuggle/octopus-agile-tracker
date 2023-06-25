import { UnknownObject } from 'types';

export const Spinner = (props: UnknownObject) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" stroke="#000" viewBox="0 0 24 24" {...props}>
      <style>
        {
          '@keyframes spinner_4N1C{to{transform:rotate(360deg)}}@keyframes spinner_MX3P{0%{stroke-dasharray:0 150;stroke-dashoffset:0}47.5%{stroke-dasharray:42 150;stroke-dashoffset:-16}95%,to{stroke-dasharray:42 150;stroke-dashoffset:-59}}'
        }
      </style>
      <g
        style={{
          transformOrigin: 'center',
          animation: 'spinner_4N1C 2s linear infinite',
        }}
      >
        <circle
          cx={12}
          cy={12}
          r={9.5}
          fill="none"
          strokeWidth={3}
          style={{
            animation: 'spinner_MX3P 1.5s ease-in-out infinite',
          }}
          strokeLinecap="round"
          stroke="currentColor"
        />
      </g>
    </svg>
  );
};
