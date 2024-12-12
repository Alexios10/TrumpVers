import axios from "axios";
import IStaff from "../interfaces/staffMembers/Istaff";

const StaffMembersService = (() => {
  const staffContollerEndpoint = "http://localhost:5068/api/staffmembers/";
  const imageEndpoint = "http://localhost:5068/images/staff-members/";
  const imageUploadControllerEndpoint =
    "http://localhost:5068/api/StaffImageUpload/";

  const getAllStaffMembers = async (): Promise<IStaff[]> => {
    try {
      const result = await axios.get(staffContollerEndpoint);
      return result.data as IStaff[];
    } catch (error) {
      console.error("Error fetching all staff members:", error);
      return [];
    }
  };

  const getImageEndpoint = () => {
    return imageEndpoint;
  };

  const getMemberById = async (id: number): Promise<IStaff | null> => {
    try {
      const result = await axios.get(`${staffContollerEndpoint}byid/${id}`);
      return result.data as IStaff;
    } catch (error) {
      console.error(`Error fetching member with ID ${id}:`, error);
      return null;
    }
  };

  const getMemberByName = async (name: string): Promise<IStaff | null> => {
    try {
      const result = await axios.get(
        `${staffContollerEndpoint}byname/${encodeURIComponent(name)}`
      );
      return result.data as IStaff;
    } catch (error) {
      console.error(`Error fetching member with name ${name}:`, error);
      return null;
    }
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
