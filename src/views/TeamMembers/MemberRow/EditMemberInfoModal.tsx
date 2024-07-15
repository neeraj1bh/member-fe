import { FC, useMemo, useState } from "react";
import { Member } from "../types";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { useApi } from "@/app/hooks/useApi";
import memberService from "@/api/memberService";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import capitalize from "@/app/utils/capitalize";
import getErrorMessage from "@/app/utils/getErrorMessage";

interface Props {
  user: Member;
  onClose: () => void;
  onConfirm: () => void;
}

const EditMemberInfoModal: FC<Props> = ({ user, onClose, onConfirm }) => {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [email, setEmail] = useState(user.email);

  const [updateMember, { loading }] = useApi(memberService.updateMember);

  const handleSave = async () => {
    try {
      await updateMember({
        id: user.id,
        name,
        role,
        email,
      });
      onConfirm();
      toast.success("User Details changed!");
    } catch (e: any) {
      toast.error(capitalize(getErrorMessage(e)));
    }
  };

  const isValid = useMemo(() => {
    return name && role && email;
  }, [name, role, email]);

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Edit User Details"
      submitOptions={{
        label: "Save",
        onClick: handleSave,
        disabled: loading || !isValid,
      }}
      cancelOptions={{
        label: "Cancel",
        onClick: onClose,
        disabled: loading,
      }}
    >
      <div className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            type="text"
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">User Role</label>
          <Select
            value={role}
            onChange={(value) => setRole(value)}
            options={[
              { value: "Product Designer", label: "Product Designer" },
              { value: "UX Researcher", label: "UX Researcher" },
              { value: "Product Manager", label: "Product Manager" },
              { value: "Frontend Developer", label: "Frontend Developer" },
              { value: "Data Scientist", label: "Data Scientist" },
              { value: "Marketing Manager", label: "Marketing Manager" },
            ]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <Input
            type="email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditMemberInfoModal;
