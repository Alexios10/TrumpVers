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
    newStaffImage?: File
  ): Promise<IStaff | null> => {
    try {
      const result = await axios.post(staffContollerEndpoint, newMember);

      if (newStaffImage) {
        const formData = new FormData();
        formData.append("file", newStaffImage);

        await axios.post(imageUploadControllerEndpoint, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      return result.data;
    } catch (error) {
      console.error("Error posting member:", error);
      return null;
    }
  };

  const putMember = async (
    updateMember: IStaff,
    updateImage?: File
  ): Promise<IStaff | null> => {
    try {
      const result = await axios.put(staffContollerEndpoint, updateMember);

      if (updateImage) {
        const formData = new FormData();
        formData.append("file", updateImage);

        await axios.post(imageUploadControllerEndpoint, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      return result.data;
    } catch (error) {
      console.error("Error updating member:", error);
      return null;
    }
  };

  const getImageEndpoint = () => {
    return imageEndpoint;
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
