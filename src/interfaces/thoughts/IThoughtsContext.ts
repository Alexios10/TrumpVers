import IThoughts from "./IThoughts";

interface IThoughtsContext {
  thoughts: IThoughts[];

  // Funksjon for å hente en tanke basert på ID
  getThoughtById: (id: number) => Promise<IThoughts | null>; 

  // Funksjon for å hente tanker basert på navn
  getThoughtByName: (name: string) => Promise<IThoughts[] | null>; 
  // Funksjon for å legge til en ny tanke
  postThought: (newThought: IThoughts) => Promise<IThoughts | null>; 
  // Funksjon for å oppdatere en eksisterende tanke
  putThought: (updateThought: IThoughts) => Promise<IThoughts | null>; 
  
  // Funksjon for å slette en tanke basert på ID
  // Returnerer ingenting (void) etter fullført sletting
  deleteThought: (id: number) => void;
}

export default IThoughtsContext;
