import { ChangeEvent, useContext, useState } from "react";
import { ThoughtsContext } from "../../contexts/ThoughtsContext";
import IThoughtsContext from "../../interfaces/IThoughtsContext";
import IThoughts from "../../interfaces/IThoughts";

const UpdateDeleteThoughts = () => {
  const { getThoughtById, putThought, deleteThought } = useContext(
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

    if (thought?.name != null) {
      setName(thought?.name);
    }
    if (thought?.thought != null) {
      setThought(thought?.thought);
    }
    if (thought?.category != null) {
      setCategory(thought?.category);
    }
  };

  const updateThoughtWithContext = async () => {
    const thoughtToUpdate: IThoughts = {
      id: parseInt(id),
      name: name,
      thought: thought,
      category: category,
    };

    const result = await putThought(thoughtToUpdate);
    return result;
  };

  const deleteThoughtWithContext = () => {
    deleteThought(parseInt(id));
  };

  return (
    <section>
      <header>Thoughts</header>
      <section>
        <div>
          <label>Get thought by id</label>
          <input type="number" name="id" value={id} onChange={handleChange} />
          <button onClick={getByIdFromContext}>Get thought</button>
        </div>
        <div>
          <label>name</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>
        <div>
          <label>thought</label>
          <input
            type="text"
            name="thought"
            value={thought}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={handleChange}
          />
        </div>
        <button onClick={updateThoughtWithContext}>Update thought</button>
        <button onClick={deleteThoughtWithContext}>delete</button>
      </section>
    </section>
  );
};

export default UpdateDeleteThoughts;
