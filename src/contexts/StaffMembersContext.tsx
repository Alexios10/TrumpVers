import { useState, useEffect, createContext, FC } from "react";
import IProps from "../interfaces/IProps";
import IStaffContext from "../interfaces/staffMembers/IStaffContext";
import IStaff from "../interfaces/staffMembers/Istaff";
import StaffMembersService from "../services/StaffMembersService";

export const StaffMemberContext = createContext<IStaffContext | null>(null);

export const StaffProvider: FC<IProps> = ({ children }) => {
  const [members, setMembers] = useState<IStaff[]>([]);

  useEffect(() => {
    getAndSetMemberFromService();
  }, []);

  const getAndSetMemberFromService = async () => {
    const MembersFromService = await StaffMembersService.getAllStaffMembers();
    setMembers(MembersFromService);
  };

  const getMemberById = async (id: number) => {
    const MembersFromService = await StaffMembersService.getMemberById(id);
    return MembersFromService;
  };

  const getMemberByName = async (name: string) => {
    const MembersFromService = await StaffMembersService.getMemberByName(name); // New method integration
    return MembersFromService;
  };

  const postMember = async (newMember: IStaff, newStaffImage?: File) => {
    const result = await StaffMembersService.postMember(
      newMember,
      newStaffImage
    );
    if (result) {
      setMembers([result, ...members]);
    }
    return result;
  };

  const putMember = async (updateMember: IStaff, updateImage?: File) => {
    const result = await StaffMembersService.putMember(
      updateMember,
      updateImage
    );
    if (result) {
      getAndSetMemberFromService();
    }
    return result;
  };

  const deleteMember = async (id: number) => {
    await StaffMembersService.deleteMember(id);
    getAndSetMemberFromService();
  };

  return (
    <StaffMemberContext.Provider
      value={{
        members,
        postMember,
        getMemberById,
        getMemberByName,
        putMember,
        deleteMember,
      }}
    >
      {children}
    </StaffMemberContext.Provider>
  );
};
