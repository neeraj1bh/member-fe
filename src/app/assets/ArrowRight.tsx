import React, { FC } from "react";

type Props = React.SVGProps<SVGSVGElement>;

const ArrowRight: FC<Props> = (props) => {
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
        d="M4.16666 9.99999H15.8333M15.8333 9.99999L9.99999 4.16666M15.8333 9.99999L9.99999 15.8333"
        stroke="#344054"
        stroke-width="1.67"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ArrowRight;
