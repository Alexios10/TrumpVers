import { ChangeEvent, useContext, useState } from "react";
import { ThoughtsContext } from "../../contexts/ThoughtsContext";
import IThoughtsContext from "../../interfaces/thoughts/IThoughtsContext";
import IThoughts from "../../interfaces/thoughts/IThoughts";

const UpdateDeleteThoughts = () => {
  const { getThoughtByName, putThought, deleteThought, thoughts } = useContext(
    ThoughtsContext
  ) as IThoughtsContext;

  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [thought, setThought] = useState<string>("");
  const [category, setCategory] = useState<string>(""); // For updating thought
  const [filterCategory, setFilterCategory] = useState<string>("All"); // For filtering thoughts

  const categories = [
    "All",
    "Politic",
    "Economy",
    "History",
    "Country",
    "Philosophy",
    "Facts",
  ];
  const choosenCategories = [
    "",
    "Politic",
    "Economy",
    "History",
    "Country",
    "Philosophy",
    "Facts",
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "thought":
        setThought(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "filterCategory":
        setFilterCategory(value);
        break;
    }
  };

  const getByNameFromContext = async () => {
    const thought = await getThoughtByName(name);

    if (thought) {
      setId(thought.id ?? null);
      setThought(thought.thought ?? "");
      setCategory(thought.category ?? "");
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
    setId(null);
    setName("");
    setThought("");
    setCategory("");
  };

  // Filter thoughts by category
  const filteredThoughts =
    filterCategory === "All"
      ? thoughts
      : thoughts.filter((t) => t.category === filterCategory);

  return (
    <section className="flex flex-col items-center">
      <h3 className="text-3xl mb-2 text-blue-950">Thoughts Admin</h3>
      <div className="w-96 flex flex-col items-start">
        <div className="mb-4 flex flex-col">
          <label className="text-[0.625rem] mb-1">Get Thought by Name</label>
          <div className="flex gap-2">
            <input
              className="w-full p-2 text-zinc-700 bg-gray-200 rounded"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
            <button
              className="p-2 bg-blue-900 text-white rounded hover:bg-blue-500 shadow-lg text-xs"
              onClick={getByNameFromContext}
            >
              Get
            </button>
          </div>
        </div>

        <div className="mb-4 flex flex-col">
          <label className="text-[0.625rem] mb-1">Thought</label>
          <input
            className="w-full p-2 text-zinc-700 bg-gray-200 rounded"
            type="text"
            name="thought"
            value={thought}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 flex flex-col">
          <label className="text-[0.625rem] mb-1">Category</label>
          <select
            className="w-full p-2 bg-gray-200 rounded"
            name="category"
            value={category}
            onChange={handleChange}
          >
            {choosenCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <button
            className="p-2 bg-blue-900 text-white rounded hover:bg-blue-500 shadow-lg text-xs"
            onClick={updateThoughtWithContext}
          >
            Update
          </button>
          <button
            className="p-2 bg-red-700 text-white rounded hover:bg-red-500 shadow-lg text-xs"
            onClick={deleteThoughtWithContext}
          >
            Delete
          </button>
        </div>
      </div>

      <hr className="w-4/5 h-0.5 mx-auto rounded m-4 bg-slate-400" />

      <div className="h-96 overflow-x-hidden overflow-y-auto w-96">
        {id && (
          <div
            key={id}
            className="bg-gray-100 p-4 rounded shadow mb-2 flex flex-col"
          >
            <h4 className="font-bold text-lg">{name}</h4>
            <p>
              <span className="font-bold">Category:</span> {category}
            </p>
            <p>
              <span className="font-bold">Thought:</span> {thought}
            </p>
          </div>
        )}
        {!id && (
          <p className="text-gray-500 text-center mt-4">
            No thought selected. Use the "Get" button to fetch a thought by
            name.
          </p>
        )}
      </div>
    </section>
  );
};

export default UpdateDeleteThoughts;
