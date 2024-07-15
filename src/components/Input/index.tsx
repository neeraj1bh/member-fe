import React, { FC } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const DEFAULT_INPUT_CLASS =
  "px-4 py-2 text-md text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-xs focus:outline-none focus:border-purple-500";

const Input: FC<Props> = (props) => {
  return (
    <input
      {...props}
      className={`${DEFAULT_INPUT_CLASS} ${props?.className}`}
    />
  );
};

export default Input;
