import IMerch from "./IMerch";

interface IMerchContext {
  merchandise: IMerch[];
  getMerchById: (id: number) => Promise<IMerch | null>;
  getMerchByName: (name: string) => Promise<IMerch | null>;
  postMerch: (newMerch: IMerch, newMerchImage?: File) => Promise<IMerch | null>;
  putMerch: (
    updateMerch: IMerch,
    newMerchImage?: File
  ) => Promise<IMerch | null>;
  deleteMerch: (id: number) => Promise<void>;
}

export default IMerchContext;
