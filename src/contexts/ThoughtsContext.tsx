import { useState, useEffect, createContext, FC } from "react";
import IThoughtsContext from "../interfaces/thoughts/IThoughtsContext";
import IProps from "../interfaces/IProps";
import IThoughts from "../interfaces/thoughts/IThoughts";
import ThoughtsService from "../services/ThoughtService";

// Oppdaterer en context for thought
export const ThoughtsContext = createContext<IThoughtsContext | null>(null);

// Definerer en provider for thought context
export const ThoughtsProvider: FC<IProps> = ({ children }) => {
  // State for å lagre thought
  const [thoughts, setThoughts] = useState<IThoughts[]>([]);

  useEffect(() => {
    getAndSetThoughtsFromService();
  }, []);

  // Funskjon for å hente å sette thought
  const getAndSetThoughtsFromService = async () => {
    const thoughtsFromService = await ThoughtsService.getAllThoughts();
    setThoughts(thoughtsFromService);
  };

  // Funskjon for å hente en thought basert på ID
  const getThoughtById = async (id: number) => {
    const thoughtsFromService = await ThoughtsService.getThoughtById(id);
    return thoughtsFromService;
  };

  // Funskjon for å hente en Thought basert på forfatter
  const getThoughtByName = async (name: string) => {
    const thoughtFromService = await ThoughtsService.getThoughtByName(name);
    return thoughtFromService;
  };

  // Funskjon for å opprette en ny thought
  const postThought = async (
    newThought: IThoughts
  ): Promise<IThoughts | null> => {
    const result = await ThoughtsService.postThought(newThought);
    if (result != null) {
      setThoughts([result, ...thoughts]);
    }
    return result;
  };

  // Funskjon for å oppdatere en eksisterende thought
  const putThought = async (updateThought: IThoughts) => {
    const result = await ThoughtsService.putThought(updateThought);
    if (result != null) {
      getAndSetThoughtsFromService();
      return updateThought;
    }
    return null;
  };

  // Funksjon for å slette en thought basert på ID
  const deleteThought = async (id: number) => {
    await ThoughtsService.deleteThought(id);
    getAndSetThoughtsFromService();
  };

  // Returnerer konteksten med tilgjengelig data
  return (
    <ThoughtsContext.Provider
      value={{
        thoughts,
        postThought,
        getThoughtById,
        getThoughtByName,
        putThought,
        deleteThought,
      }}
    >
      {children}
    </ThoughtsContext.Provider>
  );
};
