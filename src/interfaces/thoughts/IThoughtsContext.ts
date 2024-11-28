import IThoughts from "./IThoughts";

interface IThoughtsContext {
  thoughts: IThoughts[];
  getThoughtById: (id: number) => Promise<IThoughts | null>;
  getThoughtByName: (name: string) => Promise<IThoughts | null>;
  postThought: (newThought: IThoughts) => Promise<IThoughts | null>;
  putThought: (updateThought: IThoughts) => Promise<IThoughts | null>;
  deleteThought: (id: number) => void;
}

export default IThoughtsContext;
