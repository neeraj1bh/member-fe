import memberService from "@/api/memberService";
import { useApi } from "@/app/hooks/useApi";
import { pluralize } from "@/app/utils/pluralize";
import Modal from "@/components/Modal";
import { FC, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  onConfirm: () => void;
  onClose: () => void;
  users: number[];
}

const DeleteMemberModal: FC<Props> = ({ onConfirm, onClose, users }) => {
  const [deleteUsers, { loading }] = useApi(memberService.deleteMembers);

  const handleDelete = async () => {
    try {
      await deleteUsers(users);
      onConfirm();
      toast.success(`${pluralize(users.length, "User")} deleted successfully`);
    } catch (e) {
      toast.error(`Failed to delete ${pluralize(users.length, "user")}`);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`Are you sure you want to delete
        ${users.length > 1 ? "selected users" : "this user"}?`}
      submitOptions={{
        label: "Confirm",
        onClick: handleDelete,
        disabled: loading,
      }}
      cancelOptions={{
        label: "Cancel",
        onClick: onClose,
        disabled: loading,
      }}
    />
  );
};

export default DeleteMemberModal;
