import axios from "axios";
import IMerch from "../interfaces/merchandise/IMerch";

const MerchService = (() => {
  const merchContollerEndpoint = "http://localhost:5068/api/TrumpMerch/";
  const imageEndpoint = "http://localhost:5068/images/merchandises/";

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

  const putMerch = async (updateMerch: IMerch): Promise<IMerch | null> => {
    const result = await axios.put(merchContollerEndpoint, updateMerch);
    return result.data;
  };

  const deleteMerch = async (id: number): Promise<IMerch | null> => {
    const result = await axios.delete(merchContollerEndpoint + id);
    return result.data;
  };

  return {
    getAllMerchandises,
    getImageEndpoint,
    getMerchById,
    putMerch,
    deleteMerch,
  };
})();

export default MerchService;
