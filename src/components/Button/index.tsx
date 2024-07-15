import React, { ButtonHTMLAttributes, DOMAttributes, FC, useMemo } from "react";

type Variant = "filled" | "outlined";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  customClassName?: string;
  children: React.ReactNode;
  variant?: Variant;
  fullWidth?: boolean;
}
const DEFAULT_CLASSNAME = "px-4 py-2 rounded-lg";

const OUTLINE_CLASSNAME = "border-gray-300 hover:bg-gray-300 border";

const FILLED_CLASSNAME =
  "bg-purple-600 text-white hover:bg-purple-700 disabled:bg-purple-300";

const Button: FC<Props> = (props) => {
  const variantClassname = useMemo(() => {
    switch (props.variant) {
      case "filled":
        return FILLED_CLASSNAME;
      case "outlined":
        return OUTLINE_CLASSNAME;
      default:
        return "";
    }
  }, [props.variant]);

  return (
    <button
      {...props}
      className={
        props?.customClassName ||
        ` ${DEFAULT_CLASSNAME}  ${variantClassname} ${props?.className} ${
          props.fullWidth ? "w-full" : ""
        } `
      }
    >
      {props.children}
    </button>
  );
};

export default Button;
