import axios from "axios";
import IThoughts from "../interfaces/thoughts/IThoughts";

const ThoughtsService = (() => {
  const thoughtContollerEndpoint = "http://localhost:5068/api/TrumpThoughts/";

  const getAllThoughts = async (): Promise<IThoughts[]> => {
    try {
      const result = await axios.get(thoughtContollerEndpoint);
      return result.data as IThoughts[];
    } catch (error) {
      console.error("Error fetching all thoughts:", error);
      return [];
    }
  };

  const getThoughtById = async (id: number): Promise<IThoughts | null> => {
    try {
      const result = await axios.get(`${thoughtContollerEndpoint}byid/${id}`);
      return result.data as IThoughts;
    } catch (error) {
      console.error(`Error fetching thought with ID ${id}:`, error);
      return null;
    }
  };

  const getThoughtByName = async (name: string): Promise<IThoughts[]> => {
    try {
      const result = await axios.get<IThoughts[]>(
        `${thoughtContollerEndpoint}byname/${encodeURIComponent(name)}`
      );
      return result.data as IThoughts[];
    } catch (error) {
      console.error(`Error fetching thoughts with name ${name}:`, error);
      return [];
    }
  };

  const postThought = async (
    newThought: IThoughts
  ): Promise<IThoughts | null> => {
    try {
      const result = await axios.post(thoughtContollerEndpoint, newThought);
      return result.data;
    } catch (error) {
      console.error("Error posting thought:", error);
      return null;
    }
  };

  const putThought = async (
    updateThought: IThoughts
  ): Promise<IThoughts | null> => {
    try {
      const result = await axios.put(thoughtContollerEndpoint, updateThought);
      return result.data;
    } catch (error) {
      console.error("Error updating thought:", error);
      return null;
    }
  };

  const deleteThought = async (id: number): Promise<IThoughts | null> => {
    try {
      const result = await axios.delete(`${thoughtContollerEndpoint}${id}`);
      return result.data;
    } catch (error) {
      console.error(`Error deleting thought with ID ${id}:`, error);
      return null;
    }
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
