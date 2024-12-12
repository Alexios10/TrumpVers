import { useState, useEffect, createContext, FC } from "react";
import IProps from "../interfaces/IProps";
import IMerchContext from "../interfaces/merchandise/IMerchContexts";
import IMerch from "../interfaces/merchandise/IMerch";
import MerchService from "../services/MerchService";

// Opprette en context for merchandise
export const MerchandiseContext = createContext<IMerchContext | null>(null);

// Defineree en provider for merchandise context
export const MerchandiseProvider: FC<IProps> = ({ children }) => {
  // State for å lage merchandise-objekter
  const [merchandise, setMerchandise] = useState<IMerch[]>([]);

  useEffect(() => {
    getAndSetMerchsFromService();
  }, []);

  // Funskjon for å hente og sette merchandise fra tjenesten
  const getAndSetMerchsFromService = async () => {
    const merchFromService = await MerchService.getAllMerchandises();
    setMerchandise(merchFromService);
  };

  // Funskjon for å hente merchandise basert på ID
  const getMerchById = async (id: number) => {
    const merchFromService = await MerchService.getMerchById(id);
    return merchFromService;
  };

  // Funskjon for å hente merchandise basert på navn
  const getMerchByName = async (name: string) => {
    const MerchFromService = await MerchService.getMerchByName(name); // New method integration
    return MerchFromService;
  };

  // Funskjon for å opprette merchandise
  const postMerch = async (newMerch: IMerch, newMerchImage?: File) => {
    const result = await MerchService.postMerch(newMerch, newMerchImage);
    if (result) {
      setMerchandise([result, ...merchandise]); // Legger tiil ny merchandise i listen
    }
    return result;
  };

  // Funskjon for å oppdatere eksisterende merchandise
  const putMerch = async (updateMerch: IMerch, updateImage?: File) => {
    const result = await MerchService.putMerch(updateMerch, updateImage);
    if (result) {
      getAndSetMerchsFromService(); // Henter oppdatert liste over merchandise
    }
    return result;
  };

  // Funskjon for å slette merchandise basert på ID
  const deleteMerch = async (id: number) => {
    await MerchService.deleteMerch(id);
    getAndSetMerchsFromService(); // Henter oppdatert liste etter sletting
  };

  // Returnerer context med tilgjengelige funskjoner og data
  return (
    <MerchandiseContext.Provider
      value={{
        merchandise,
        getMerchById,
        getMerchByName,
        postMerch,
        putMerch,
        deleteMerch,
      }}
    >
      {children}
    </MerchandiseContext.Provider>
  );
};
