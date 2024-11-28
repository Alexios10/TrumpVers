import IMerch from "./IMerch";

interface IMerchContext {
  merchandise: IMerch[];
  getMerchById: (id: number) => Promise<IMerch | null>;
  putMerch: (updateMerch: IMerch) => Promise<IMerch | null>;
  deleteMerch: (id: number) => Promise<void>; // Updated to Promise<void>
}

export default IMerchContext;
