import React, { useState } from "react";
import { Member } from "../types";
import StatusChip from "./StatusChip";
import Teams from "./Teams";
import Button from "@/components/Button";
import Trash from "@/app/assets/Trash";
import Edit from "@/app/assets/Edit";
import Checkbox from "@/components/Checkbox";
import EditMemberInfoModal from "./EditMemberInfoModal";
import DeleteMemberModal from "./DeleteMemberModal";
import Image from "next/image";

interface MemberRowProps {
  member: Member;
  isSelected: boolean;
  onSelect: () => void;
  refetch: () => void;
}

const MemberRow: React.FC<MemberRowProps> = ({
  member,
  isSelected,
  onSelect,
  refetch,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <tr className="border-b">
        <td className="p-2 pl-6">
          <Checkbox checked={isSelected} onChange={onSelect} />
        </td>
        <td className="p-2 flex items-center">
          {/*      eslint-disable-next-line @next/next/no-img-element */}{" "}
          <Image
            src={member.avatar}
            alt={member.name}
            width={40}
            height={40}
            className="rounded-full mr-2"
          />
          <div>
            <p className="text-sm font-medium">{member.name}</p>
            <p className="text-gray-500 text-sm font-normal">
              @{member.userName}
            </p>
          </div>
        </td>
        <td className="p-2 ">
          <StatusChip isActive={member.isActive} />
        </td>
        <td className="p-2 text-sm  text-gray-500">{member.role}</td>
        <td className="p-2 text-sm  text-gray-500">{member.email}</td>
        <td className="p-2 ">
          <Teams teams={member.teams} />
        </td>
        <td className="p-2 ">
          <Button onClick={() => setIsDeleteModalOpen(true)}>
            <Trash className="text-gray-500 hover:text-purple-500" />
          </Button>
          <Button onClick={() => setIsEditModalOpen(true)}>
            <Edit className="text-gray-500 hover:text-purple-500" />
          </Button>
        </td>
      </tr>
      {isEditModalOpen && (
        <EditMemberInfoModal
          user={member}
          onClose={() => setIsEditModalOpen(false)}
          onConfirm={() => {
            setIsDeleteModalOpen(false);
            refetch();
          }}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteMemberModal
          onConfirm={() => {
            setIsDeleteModalOpen(false);
            refetch();
          }}
          onClose={() => setIsDeleteModalOpen(false)}
          users={[member.id]}
        />
      )}
    </>
  );
};

export default MemberRow;
