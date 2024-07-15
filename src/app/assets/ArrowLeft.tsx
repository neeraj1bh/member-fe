import React, { FC } from "react";

type Props = React.SVGProps<SVGSVGElement>;

const ArrowLeft: FC<Props> = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.8334 9.99999H4.16669M4.16669 9.99999L10 15.8333M4.16669 9.99999L10 4.16666"
        stroke="#344054"
        stroke-width="1.67"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ArrowLeft;
