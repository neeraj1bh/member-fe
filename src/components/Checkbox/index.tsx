import React, { FC } from "react";

const Checkbox: FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input
      {...props}
      className="w-4 h-4 text-purple-600 bg-gray-100  rounded-md accent-purple-500 focus:ring-purple-500 "
      type="checkbox"
    />
  );
};

export default Checkbox;
