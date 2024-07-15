import TeamMembersTable from "@/views/TeamMembers";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <TeamMembersTable />
      <Toaster />
    </>
  );
}
