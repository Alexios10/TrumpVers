import { useState, useEffect, createContext, FC } from "react";
import IProps from "../interfaces/IProps";
import IStaffContext from "../interfaces/staffMembers/IStaffContext";
import IStaff from "../interfaces/staffMembers/Istaff";
import StaffMembersService from "../services/StaffMembersService";

// Oppretter context for ansatte
export const StaffMemberContext = createContext<IStaffContext | null>(null);

// Definerer en provider for ansatte i context
export const StaffProvider: FC<IProps> = ({ children }) => {
  // State for å lagre ansatte
  const [members, setMembers] = useState<IStaff[]>([]);

  useEffect(() => {
    getAndSetMemberFromService();
  }, []);

  // Funskjon for å hente og sette ansatte fra tjenesten
  const getAndSetMemberFromService = async () => {
    const MembersFromService = await StaffMembersService.getAllStaffMembers();
    setMembers(MembersFromService);
  };

  // Funskjon for å hente medlem basert på ID
  const getMemberById = async (id: number) => {
    const MembersFromService = await StaffMembersService.getMemberById(id);
    return MembersFromService;
  };

  // Funksjon for å hente medlem basert på navn
  const getMemberByName = async (name: string) => {
    const MembersFromService = await StaffMembersService.getMemberByName(name); // New method integration
    return MembersFromService;
  };

  // Funskjon for  opprette en ny medlem
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

  // Funskjon for å oppdatere en eksisterende medlem
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

  // Funskjon for å slette en medlem basert oå ID
  const deleteMember = async (id: number) => {
    await StaffMembersService.deleteMember(id);
    getAndSetMemberFromService();
  };

  // Returnerer konteksten med tilgjengelig data
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
