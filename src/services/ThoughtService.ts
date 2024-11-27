import axios from "axios";
import IThoughts from "../interfaces/IThoughts";

const ThoughtsService = (() => {
  const thoughtContollerEndpoint = "http://localhost:5275/api/TrumpThoughts/";

  const getAllThoughts = async (): Promise<IThoughts[]> => {
    const result = await axios.get(thoughtContollerEndpoint);
    return result.data as IThoughts[];
  };

  const getByName = async (name: string): Promise<IThoughts | null> => {
    const result = await axios.get(thoughtContollerEndpoint + name);
    return result.data as IThoughts;
  };

  const postThought = async (
    newThought: IThoughts
  ): Promise<IThoughts | null> => {
    const result = await axios.post(thoughtContollerEndpoint, newThought);
    return result.data;
  };

  const putThought = async (
    updateThought: IThoughts
  ): Promise<IThoughts | null> => {
    const result = await axios.put(thoughtContollerEndpoint, updateThought);
    return result.data;
  };

  const deleteThought = async (id: number): Promise<IThoughts | null> => {
    const result = await axios.delete(thoughtContollerEndpoint + id);
    return result.data;
  };

  return {
    getAllThoughts,
    getByName,
    postThought,
    putThought,
    deleteThought,
  };
})();

export default ThoughtsService;
