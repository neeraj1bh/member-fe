import { Member } from "@/views/TeamMembers/types";
import axiosInstance from "./axiosConfig";

export const memberService = {
  listMembers: async (params: {
    page: number;
    limit: number;
    search?: string;
    sortBy?: string;
    order?: "asc" | "desc";
  }) => {
    const response = await axiosInstance.get("/members", {
      params,
    });
    return response.data;
  },

  updateMember: async (userData: Partial<Member>) => {
    const { id, ...rest } = userData;

    const response = await axiosInstance.patch(`/members/${userData.id}`, rest);
    return response.data;
  },

  deleteMember: async (userId: number) => {
    const response = await axiosInstance.delete(`/members/${userId}`);
    return response.data;
  },

  deleteMembers: async (userIds: number[]) => {
    const response = await axiosInstance.post(`/members/delete-all`, {
      ids: userIds,
    });
    return response.data;
  },
};

export default memberService;
