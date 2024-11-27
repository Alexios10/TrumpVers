import { ChangeEvent, useContext, useState } from "react";
import { ThoughtsContext } from "../../contexts/ThoughtsContext";
import IThoughtsContext from "../../interfaces/IThoughtsContext";
import IThoughts from "../../interfaces/IThoughts";

const UpdateDeleteThoughts = () => {
  const { getThoughtById, putThought } = useContext(
    ThoughtsContext
  ) as IThoughtsContext;

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [thought, setThought] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    switch (e.target.name) {
      case "id":
        setId(e.target.value);
        break;
      case "name":
        setName(e.target.value);
        break;
      case "thought":
        setThought(e.target.value);
        break;
      case "category":
        setCategory(e.target.value);
        break;
    }
  }

  const getByIdFromContext = async () => {
    const thought = await getThoughtById(parseInt(id));

    if (thought != null) {
      setName(thought?.name);
    }
    if (thought?.thought != null) {
      setThought(thought?.category);
    }
    if (thought?.category != null) {
      setCategory(thought?.category);
    }
  };

  const updateThoughtWithContext = () => {
    const thoughtToUpdate: IThoughts = {
      id: parseInt(id),
      name: name,
      thought: thought,
      category: category,
    };

    putThought(thoughtToUpdate);
  };

  return <section></section>;
};
