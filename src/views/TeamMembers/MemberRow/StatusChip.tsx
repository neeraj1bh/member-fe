import React, { FC } from "react";
import StatusDot from "@/app/assets/StatusDot";
import Chip from "@/components/Chip";

interface Props  {
  isActive: boolean;
};

const StatusChip: FC<Props> = ({ isActive }) => {
  return (
    <Chip
      className={
        isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }
    >
      <div className={`inline-flex items-center gap-[6px]`}>
        <StatusDot className={isActive ? "text-green-800" : "text-red-800"} />
        {isActive ? "Active" : "Inactive"}
      </div>
    </Chip>
  );
};

export default StatusChip;
