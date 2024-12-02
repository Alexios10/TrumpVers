import IStaff from "./Istaff";

interface IStaffContext {
  members: IStaff[];
  getMemberById: (id: number) => Promise<IStaff | null>;
  getMemberByName: (name: string) => Promise<IStaff | null>;
  postMember: (
    newMember: IStaff,
    newStaffImage: IStaff
  ) => Promise<IStaff | null>;
  putMember: (
    updateMember: IStaff,
    newStaffImage: IStaff
  ) => Promise<IStaff | null>;
  deleteMember: (id: number) => void;
}

export default IStaffContext;
