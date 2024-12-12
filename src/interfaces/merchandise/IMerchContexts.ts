import IMerch from "./IMerch";

// Definerer et grensesnitt for konteksten til merchandise
interface IMerchContext {
  merchandise: IMerch[];

  // Funksjon for å hente en merchandise-objekt ved hjelp av ID
  getMerchById: (id: number) => Promise<IMerch | null>;

  // Funksjon for å hente en merchandise-objekt ved hjelp av navn
  getMerchByName: (name: string) => Promise<IMerch | null>;

  // Funksjon for å opprette en ny merchandise-objekt
  // Tar inn et IMerch-objekt og et valgfritt bilde (File)
  postMerch: (newMerch: IMerch, newMerchImage?: File) => Promise<IMerch | null>;

  // Funksjon for å oppdatere et eksisterende merchandise-objekt
  // Tar inn et IMerch-objekt og et valgfritt bilde (File)
  putMerch: (
    updateMerch: IMerch,
    newMerchImage?: File
  ) => Promise<IMerch | null>;

  // Funksjon for å slette et merchandise-objekt ved hjelp av ID
  // Returnerer et Promise som fullføres når slettingen er gjort
  deleteMerch: (id: number) => Promise<void>;
}

export default IMerchContext;
