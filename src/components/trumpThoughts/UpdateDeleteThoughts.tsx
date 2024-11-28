import { ChangeEvent, useContext, useState } from "react";
import { ThoughtsContext } from "../../contexts/ThoughtsContext";
import IThoughtsContext from "../../interfaces/thoughts/IThoughtsContext";
import IThoughts from "../../interfaces/thoughts/IThoughts";

const UpdateDeleteThoughts = () => {
  const { getThoughtByName, putThought, deleteThought } = useContext(
    ThoughtsContext
  ) as IThoughtsContext;

  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [thought, setThought] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    switch (e.target.name) {
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

  const getByNameFromContext = async () => {
    const thought = await getThoughtByName(name);

    if (thought) {
      setId(thought.id ?? null); // Use null if id is undefined
      setThought(thought.thought ?? ""); // Use empty string if undefined
      setCategory(thought.category ?? ""); // Use empty string if undefined
    } else {
      alert(`Thought with name "${name}" not found.`);
    }
  };

  const updateThoughtWithContext = async () => {
    if (id === null) {
      alert("Cannot update. Thought not found.");
      return;
    }

    const thoughtToUpdate: IThoughts = {
      id: id,
      name: name,
      thought: thought,
      category: category,
    };

    const result = await putThought(thoughtToUpdate);
    if (result) {
      alert("Thought updated successfully.");
    }
  };

  const deleteThoughtWithContext = async () => {
    if (id === null) {
      alert("Cannot delete. Thought not found.");
      return;
    }

    deleteThought(id);
    alert(`Thought with ID ${id} deleted.`);
  };

  return (
    <section className="ml-5">
      <header>Thoughts</header>
      <section className="my-5 ">
        <div className="flex">
          <label>Get thought by name:</label>
          <input
            className="input"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <button
            className="border border-red-700 mx-2 rounded-lg p-1 bg-cyan-200"
            onClick={getByNameFromContext}
          >
            Get thought
          </button>
        </div>

        <div className="flex my-2">
          <label>Thought:</label>
          <input
            className="input"
            type="text"
            name="thought"
            value={thought}
            onChange={handleChange}
          />
        </div>

        <div className="flex my-2">
          <label>Category:</label>
          <input
            className="input"
            type="text"
            name="category"
            value={category}
            onChange={handleChange}
          />
        </div>
        <button
          className="border border-red-700 mr-10 rounded-lg p-1 bg-cyan-200"
          onClick={updateThoughtWithContext}
        >
          Update
        </button>
        <button
          className="border rounded-lg p-1 border-red-700 bg-cyan-200"
          onClick={deleteThoughtWithContext}
        >
          delete
        </button>
      </section>

      {thought !== null && (
        <div className="space-y-2">
          <div>
            <span className="font-bold mr-2">Id:</span>
            <span>{id}</span>
          </div>
          <div>
            <span className="font-bold mr-2">Category:</span>
            <span>{category}</span>
          </div>
          <div>
            <span className="font-bold mr-2">Thought:</span>
            <span>{thought}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default UpdateDeleteThoughts;
