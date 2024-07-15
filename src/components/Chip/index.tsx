import React, { FC, ReactNode } from "react";
import StatusDot from "@/app/assets/StatusDot";

type Props = {
  className?: string;
  children: ReactNode;
};

const Chip: FC<Props> = ({ className, children }) => {
  return (
    <div
      className={`inline-flex items-center px-[8px] rounded-2xl overflow-hidden py-[2px] text-sm font-medium ${className} `}
    >
      {children}
    </div>
  );
};

export default Chip;
