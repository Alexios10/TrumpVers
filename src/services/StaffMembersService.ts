import axios from "axios";
import IStaff from "../interfaces/staffMembers/Istaff";

const StaffMembersService = (() => {
  const staffContollerEndpoint = "http://localhost:5068/api/staffmembers/";
  const imageUploadControllerEndpoint =
    "http://localhost:5068/api/imageUpload/";
  const imageEndpoint = "http://localhost:5068/images/staff-members/";

  const getAllStaffMembers = async (): Promise<IStaff[]> => {
    const result = await axios.get(staffContollerEndpoint);
    return result.data as IStaff[];
  };

  const getMemberById = async (id: number): Promise<IStaff | null> => {
    const result = await axios.get(staffContollerEndpoint + id);
    return result.data as IStaff;
  };

  const getMemberByName = async (name: string): Promise<IStaff | null> => {
    const result = await axios.get(
      staffContollerEndpoint + "byname/" + encodeURIComponent(name)
    );
    return result.data as IStaff;
  };

  const postMember = async (
    newMember: IStaff,
    newStaffImage: IStaff
  ): Promise<IStaff | null> => {
    const result = await axios.post(staffContollerEndpoint, newMember);

    const formData = new FormData();
    formData.append("file", newStaffImage);

    const resultUpload = await axios({
      url: imageUploadControllerEndpoint,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    formData.delete("file");

    return result.data;
  };

  const getImageEndpoint = () => {
    return imageEndpoint;
  };

  const putMember = async (
    updateMember: IStaff,
    updateImage: IStaff
  ): Promise<IStaff | null> => {
    const result = await axios.put(staffContollerEndpoint, updateMember);

    const formData = new FormData();
    formData.append("file", updateImage);

    const resultUpload = await axios({
      url: imageUploadControllerEndpoint,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    formData.delete("file");
    return result.data;
  };

  const deleteMember = async (id: number): Promise<IStaff | null> => {
    const result = await axios.delete(staffContollerEndpoint + id);
    return result.data;
  };

  return {
    getAllStaffMembers,
    getMemberById,
    getMemberByName,
    getImageEndpoint,
    postMember,
    putMember,
    deleteMember,
  };
})();

export default StaffMembersService;
