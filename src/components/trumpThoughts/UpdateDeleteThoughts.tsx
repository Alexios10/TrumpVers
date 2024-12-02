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
  const [matchingThoughts, setMatchingThoughts] = useState<IThoughts[]>([]);

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
    if (name === "name") setName(value);
    if (name === "thought") setThought(value);
    if (name === "category") setCategory(value);
  };

  const getByNameFromContext = async () => {
    const thoughtResults = await getThoughtByName(name);

    if (thoughtResults && thoughtResults.length > 0) {
      setMatchingThoughts(thoughtResults);
    } else {
      alert(`No thoughts found with the name "${name}".`);
      setMatchingThoughts([]);
    }
    setThought("");
    setCategory("");
  };

  const handleThoughtClick = (selectedThought: IThoughts) => {
    setId(selectedThought.id || null);
    setName(selectedThought.name || "");
    setThought(selectedThought.thought || "");
    setCategory(selectedThought.category || "");
  };

  const updateThoughtWithContext = async () => {
    if (id === null) {
      alert("Cannot update. Thought not found.");
      return;
    }

    const thoughtToUpdate: IThoughts = { id, name, thought, category };
    const result = await putThought(thoughtToUpdate);
    if (result) alert("Thought updated successfully.");
  };

  const deleteThoughtWithContext = async () => {
    if (id === null) {
      alert("Cannot delete. Thought not found.");
      return;
    }

    await deleteThought(id);
    alert(`Thought with ID ${id} deleted.`);
    setId(null);
    setName("");
    setThought("");
    setCategory("");
    setMatchingThoughts([]);
  };

  return (
    <section className="flex flex-col items-center">
      <h3 className="text-3xl mb-2 text-blue-950">Thoughts Admin</h3>

      {/* Input and Buttons */}
      <div className="w-96 flex flex-col items-start">
        {/* Get Thought by Name */}
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

        {/* Thought Input */}
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

        {/* Category Input */}
        <div className="mb-4 flex flex-col">
          <label className="text-[0.625rem] mb-1">Category</label>
          <select
            className="w-full p-2 bg-gray-200 rounded"
            name="category"
            value={category}
            onChange={handleChange}
          >
            {choosenCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
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

      {/* Display Matching Thoughts */}
      <div className="h-96 overflow-x-hidden overflow-y-auto w-96">
        {matchingThoughts.length > 0 ? (
          matchingThoughts.map((thought) => (
            <div
              key={thought.id}
              className="bg-gray-100 p-4 rounded shadow mb-2 flex flex-col cursor-pointer"
              onClick={() => handleThoughtClick(thought)}
            >
              <h4 className="font-bold text-lg">{thought.name}</h4>
              <p>
                <strong>Category:</strong> {thought.category}
              </p>
              <p>
                <strong>Thought:</strong> {thought.thought}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">
            Use the "Get" button to search for a thought by name.
          </p>
        )}
      </div>
    </section>
  );
};

export default UpdateDeleteThoughts;
