import { useState, useEffect, createContext, FC } from "react";
import IThoughtsContext from "../interfaces/thoughts/IThoughtsContext";
import IProps from "../interfaces/IProps";
import IThoughts from "../interfaces/thoughts/IThoughts";
import ThoughtsService from "../services/ThoughtService";

export const ThoughtsContext = createContext<IThoughtsContext | null>(null);

export const ThoughtsProvider: FC<IProps> = ({ children }) => {
  const [thoughts, setThoughts] = useState<IThoughts[]>([]);

  useEffect(() => {
    getAndSetThoughtsFromService();
  }, []);

  const getAndSetThoughtsFromService = async () => {
    const thoughtsFromService = await ThoughtsService.getAllThoughts();
    setThoughts(thoughtsFromService);
  };

  const getThoughtById = async (id: number) => {
    const thoughtsFromService = await ThoughtsService.getThoughtById(id);
    return thoughtsFromService;
  };

  const getThoughtByName = async (name: string) => {
    const thoughtFromService = await ThoughtsService.getThoughtByName(name); // New method integration
    return thoughtFromService;
  };

  const postThought = async (
    newThought: IThoughts
  ): Promise<IThoughts | null> => {
    const result = await ThoughtsService.postThought(newThought);
    if (result != null) {
      setThoughts([result, ...thoughts]);
    }
    return result;
  };

  const putThought = async (updateThought: IThoughts) => {
    const result = await ThoughtsService.putThought(updateThought);
    if (result != null) {
      getAndSetThoughtsFromService();
      return updateThought;
    }
    return null;
  };

  const deleteThought = async (id: number) => {
    await ThoughtsService.deleteThought(id);
    getAndSetThoughtsFromService();
  };

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
