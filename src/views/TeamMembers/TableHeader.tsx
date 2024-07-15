import ArrowDown from "@/app/assets/ArrowDown";
import React, { FC } from "react";

interface Props {
  title: string;
  sortable?: boolean;
  sortDirection?: "asc" | "desc";
  onClick?: () => void;
}

const TableHeader: FC<Props> = ({
  title,
  sortable,
  sortDirection,
  onClick,
}) => {
  const sortArrow =
    sortDirection === "asc" ? (
      <ArrowDown className="ml-1" />
    ) : (
      <ArrowDown className="ml-1 transform rotate-180" />
    );
  return (
    <th className={`p-2 text-left cursor-pointer`} onClick={onClick}>
      <div className="flex gap-1 items-center">
        <span className="text-gray-500 text-xs">{title}</span>
        {sortable && sortArrow}
      </div>
    </th>
  );
};

export default TableHeader;
