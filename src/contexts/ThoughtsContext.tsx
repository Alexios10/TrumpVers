import { useState, useEffect, createContext, FC } from "react";
import IThoughtsContext from "../interfaces/IThoughtsContext";
import IProps from "../interfaces/IProps";
import IThoughts from "../interfaces/IThoughts";
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
    const thoughtsFromService = await ThoughtsService.getById(id);
    return thoughtsFromService;
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
    if (result != result) {
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
        putThought,
        deleteThought,
      }}
    >
      {children}
    </ThoughtsContext.Provider>
  );
};
