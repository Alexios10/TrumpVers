import IStaff from "./Istaff";

interface IStaffContext {
  members: IStaff[];
  getMemberById: (id: number) => Promise<IStaff | null>;
  getMemberByName: (name: string) => Promise<IStaff | null>;
  postMember: (
    newMember: IStaff,
    newStaffImage?: File
  ) => Promise<IStaff | null>;
  putMember: (
    updateMember: IStaff,
    newStaffImage?: File
  ) => Promise<IStaff | null>;
  deleteMember: (id: number) => Promise<void>;
}

export default IStaffContext;
