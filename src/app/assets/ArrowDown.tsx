import React, { FC } from "react";

type Props = React.SVGProps<SVGSVGElement>;

const ArrowDown: FC<Props> = (props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.00001 3.33334V12.6667M8.00001 12.6667L12.6667 8.00001M8.00001 12.6667L3.33334 8.00001"
        stroke="#667085"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ArrowDown;
