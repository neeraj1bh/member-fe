"use client";
import React, { FC, useState, useEffect } from "react";
import { Member } from "./types";
import Pagination from "./Pagination";
import Button from "../../components/Button";
import TableHeader from "./TableHeader";
import Checkbox from "../../components/Checkbox";
import MemberRow from "./MemberRow";
import Chip from "../../components/Chip";
import DeleteMemberModal from "./MemberRow/DeleteMemberModal";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import useDebouncedCallback from "@/app/hooks/useDebouncedCallback";
import { useApi } from "@/app/hooks/useApi";
import memberService from "@/api/memberService";
import Loader from "@/components/Loader";

type SortKey = "name" | "isActive" | "role" | "email" | "teams";

interface SortState {
  sortKey: SortKey;
  sortDirection: "asc" | "desc";
}

const TeamMembersTable: FC = () => {
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [sortedBy, serSortedBy] = useState<SortState>({} as SortState);
  const [isDeleteSelectedModalOpen, setIsDeleteSelectedModalOpen] =
    useState(false);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // fetch member on first load
  useEffect(() => {
    fetchMembers(1, search, sortedBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSort = (sortKey: SortKey) => {
    const sortState: SortState = {
      sortKey,
      sortDirection: "asc",
    };
    if (sortedBy?.sortKey === sortKey) {
      sortState.sortDirection =
        sortedBy.sortDirection === "asc" ? "desc" : "asc";
    }
    serSortedBy(sortState);
    fetchMembers(currentPage, search, sortState);
  };

  const [
    listMembers,
    {
      loading: listMembersLoading,
      error: listMembersError,
      data: listMembersData,
    },
  ] = useApi(memberService.listMembers);

  // Could be moved to a useEffect, but I want to control the fetchMembers call and only call it on user actions.
  const fetchMembers = async (
    page: number,
    searchStr: string,
    sortState: SortState
  ) => {
    try {
      await listMembers({
        page,
        limit: itemsPerPage,
        search: searchStr,
        sortBy: sortState?.sortKey,
        order: sortState?.sortDirection,
      });
    } catch (error) {
      toast.error("Failed to fetch members");
    }
  };

  const handleSelectMember = (id: number) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((memberId) => memberId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedMembers(
      selectedMembers.length === listMembersData.items.length
        ? []
        : listMembersData.items.map((member: Member) => member.id)
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchMembers(page, search, sortedBy);
  };

  const debouncedSearch = useDebouncedCallback((value: string) => {
    fetchMembers(1, value, sortedBy);
  }, 300);

  const refetchMembers = () => fetchMembers(currentPage, search, sortedBy);

  if (listMembersError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="border rounded-lg ">
        <div className="p-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-medium ">Team Members</h1>
            <Chip className="text-sm text-purple-500 bg-purple-100">
              {listMembersData?.count || 0}{" "}
              {listMembersData?.count > 1 ? "users" : "user"}
            </Chip>
          </div>
          <div>
            <Input
              value={search}
              placeholder="Search members"
              onChange={(e) => {
                setSearch(e.target.value);
                debouncedSearch(e.target.value);
              }}
            />

            <Button
              variant="filled"
              className="ml-2"
              onClick={() => setIsDeleteSelectedModalOpen(true)}
            >
              Delete Selected
            </Button>
          </div>
        </div>

        <Loader className="min-h-[560px]" isLoading={listMembersLoading} />

        {listMembersData?.items.length > 0 && (
          <>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">
                    <Checkbox
                      type="checkbox"
                      checked={listMembersData.items.every((member: Member) =>
                        selectedMembers.some((id) => id === member.id)
                      )}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <TableHeader
                    title="Name"
                    sortable={sortedBy?.sortKey === "name"}
                    sortDirection={sortedBy?.sortDirection}
                    onClick={() => handleSort("name")}
                  />
                  <TableHeader
                    sortable={sortedBy?.sortKey === "isActive"}
                    sortDirection={sortedBy?.sortDirection}
                    onClick={() => handleSort("isActive")}
                    title="Status"
                  />
                  <TableHeader
                    title="Role"
                    sortable={sortedBy?.sortKey === "role"}
                    sortDirection={sortedBy?.sortDirection}
                    onClick={() => handleSort("role")}
                  />
                  <TableHeader
                    title="Email address"
                    sortable={sortedBy?.sortKey === "email"}
                    sortDirection={sortedBy?.sortDirection}
                    onClick={() => handleSort("email")}
                  />
                  <TableHeader title="Teams" />
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {listMembersData.items.map((member: Member) => (
                  <MemberRow
                    refetch={refetchMembers}
                    key={member.id}
                    member={member}
                    isSelected={selectedMembers.includes(member.id)}
                    onSelect={() => handleSelectMember(member.id)}
                  />
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3">
              <Pagination
                currentPage={currentPage}
                totalItems={listMembersData.count}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}

        {listMembersData?.items.length === 0 && !listMembersLoading && (
          <div className="text-center mb-5 text-gray-500">No members found</div>
        )}
      </div>
      {isDeleteSelectedModalOpen && selectedMembers.length > 0 && (
        <DeleteMemberModal
          onConfirm={() => {
            setIsDeleteSelectedModalOpen(false);
            refetchMembers();
          }}
          onClose={() => setIsDeleteSelectedModalOpen(false)}
          users={selectedMembers}
        />
      )}
    </div>
  );
};

export default TeamMembersTable;
