import axios from "axios";
import IMerch from "../interfaces/merchandise/IMerch";

const MerchService = (() => {
  const merchContollerEndpoint = "http://localhost:5068/api/TrumpMerch/";
  const imageEndpoint = "http://localhost:5068/images/merchandises/";
  const imageUploadControllerEndpoint =
    "http://localhost:5068/api/imageUpload/";

  const getAllMerchandises = async (): Promise<IMerch[]> => {
    const result = await axios.get(merchContollerEndpoint);
    return result.data as IMerch[];
  };

  const getImageEndpoint = () => {
    return imageEndpoint;
  };

  const getMerchById = async (id: number): Promise<IMerch | null> => {
    const result = await axios.get(merchContollerEndpoint + id);
    return result.data as IMerch;
  };

  const getMerchByName = async (name: string): Promise<IMerch | null> => {
    const result = await axios.get(
      merchContollerEndpoint + "byname/" + encodeURIComponent(name)
    );
    return result.data as IMerch;
  };

  const postMerch = async (
    newMerch: IMerch,
    newMerchImage?: File
  ): Promise<IMerch | null> => {
    try {
      const result = await axios.post(merchContollerEndpoint, newMerch);

      if (newMerchImage) {
        const formData = new FormData();
        formData.append("file", newMerchImage);

        await axios.post(imageUploadControllerEndpoint, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      return result.data;
    } catch (error) {
      console.error("Error posting merch:", error);
      return null;
    }
  };

  const putMerch = async (
    updateMerch: IMerch,
    updateImage?: File
  ): Promise<IMerch | null> => {
    try {
      const result = await axios.put(merchContollerEndpoint, updateMerch);

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

  const deleteMerch = async (id: number): Promise<IMerch | null> => {
    const result = await axios.delete(merchContollerEndpoint + id);
    return result.data;
  };

  return {
    getAllMerchandises,
    getImageEndpoint,
    getMerchById,
    getMerchByName,
    postMerch,
    putMerch,
    deleteMerch,
  };
})();

export default MerchService;
