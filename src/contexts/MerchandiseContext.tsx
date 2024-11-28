import { useState, useEffect, createContext, FC } from "react";
import IProps from "../interfaces/IProps";
import IMerchContext from "../interfaces/merchandise/IMerchContexts";
import IMerch from "../interfaces/merchandise/IMerch";
import MerchService from "../services/MerchService";

export const MerchandiseContext = createContext<IMerchContext | null>(null);

export const MerchandiseProvider: FC<IProps> = ({ children }) => {
  const [merchandise, setMerchandise] = useState<IMerch[]>([]);

  useEffect(() => {
    getAndSetMerchsFromService();
  }, []);

  const getAndSetMerchsFromService = async () => {
    const merchFromService = await MerchService.getAllMerchandises();
    setMerchandise(merchFromService);
  };

  const getMerchById = async (id: number) => {
    const merchFromService = await MerchService.getMerchById(id);
    return merchFromService;
  };

  const putMerch = async (updateMerch: IMerch) => {
    const result = await MerchService.putMerch(updateMerch);
    if (result != null) {
      getAndSetMerchsFromService();
      return updateMerch;
    }
    return null;
  };

  const deleteMerch = async (id: number) => {
    await MerchService.deleteMerch(id);
    getAndSetMerchsFromService();
  };

  return (
    <MerchandiseContext.Provider
      value={{
        merchandise,
        getMerchById,
        putMerch,
        deleteMerch,
      }}
    >
      {children}
    </MerchandiseContext.Provider>
  );
};