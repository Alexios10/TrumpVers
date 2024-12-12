import IStaff from "./Istaff";

interface IStaffContext {
  members: IStaff[];

  // Funksjon for å hente en ansatt ved hjelp av ID
  getMemberById: (id: number) => Promise<IStaff | null>; 

  // Funksjon for å hente en ansatt ved hjelp av navn
  getMemberByName: (name: string) => Promise<IStaff | null>; 

  // Funksjon for å legge til en ny ansatt
  // Tar inn et IStaff-objekt og et valgfritt bilde (File)
  postMember: (
    newMember: IStaff,
    newStaffImage?: File
  ) => Promise<IStaff | null>; 

  // Funksjon for å oppdatere informasjonen til en eksisterende ansatt
  // Tar inn et IStaff-objekt og et valgfritt bilde (File)
  putMember: (
    updateMember: IStaff,
    newStaffImage?: File
  ) => Promise<IStaff | null>;

  // Funksjon for å slette en ansatt ved hjelp av ID
  // Returnerer et Promise som fullføres når slettingen er gjort
  deleteMember: (id: number) => Promise<void>;
}

export default IStaffContext;
