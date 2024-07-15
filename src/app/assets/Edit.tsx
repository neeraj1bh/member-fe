import React, { FC } from "react";

type Props = React.SVGProps<SVGSVGElement>;

const Edit: FC<Props> = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <g clip-path="url(#clip0_1235_14)">
        <path
          d="M14.1667 2.49999C14.3855 2.28112 14.6454 2.1075 14.9313 1.98905C15.2173 1.8706 15.5238 1.80963 15.8333 1.80963C16.1429 1.80963 16.4493 1.8706 16.7353 1.98905C17.0213 2.1075 17.2811 2.28112 17.5 2.49999C17.7189 2.71886 17.8925 2.97869 18.0109 3.26466C18.1294 3.55063 18.1903 3.85713 18.1903 4.16665C18.1903 4.47618 18.1294 4.78268 18.0109 5.06865C17.8925 5.35461 17.7189 5.61445 17.5 5.83332L6.24999 17.0833L1.66666 18.3333L2.91666 13.75L14.1667 2.49999Z"
          stroke="currentColor"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1235_14">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Edit;
