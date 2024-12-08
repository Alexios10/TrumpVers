import axios from "axios";
import IThoughts from "../interfaces/thoughts/IThoughts";

const ThoughtsService = (() => {
  const thoughtContollerEndpoint = "http://localhost:5068/api/TrumpThoughts/";

  const getAllThoughts = async (): Promise<IThoughts[]> => {
    const result = await axios.get(thoughtContollerEndpoint);
    return result.data as IThoughts[];
  };

  const getThoughtById = async (id: number): Promise<IThoughts | null> => {
    const result = await axios.get(thoughtContollerEndpoint + "byid/" + id);
    return result.data as IThoughts;
  };

  const getThoughtByName = async (name: string): Promise<IThoughts[]> => {
    const result = await axios.get<IThoughts>(
      thoughtContollerEndpoint + "byname/" + name // eventuelt encodeURIComponent(name)
    );
    return result.data as IThoughts[];
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
    getThoughtById,
    getThoughtByName,
    postThought,
    putThought,
    deleteThought,
  };
})();

export default ThoughtsService;
