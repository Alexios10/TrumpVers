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
      alert("Cannot update. Please select one.");
      return;
    }

    const thoughtToUpdate: IThoughts = { id, name, thought, category };
    const result = await putThought(thoughtToUpdate);
    if (result) alert("Thought updated successfully.");
  };

  const deleteThoughtWithContext = async () => {
    if (id === null) {
      alert("Cannot delete. Please select one.");
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
      <div className="flex-1/2 flex flex-col items-center">
        <div className="w-96 items-start">
          {/* Get Thought by Name */}
          <div className="mb-2 flex flex-col">
            <label className="w-36 mr-2 text-[0.625rem]">
              Get Thought by Name
            </label>
            <div className="flex gap-2">
              <input
                className="w-full text-zinc-700 bg-gray-200"
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
              />
              <button
                className="px-4 bg-blue-900 text-white rounded-sm hover:bg-blue-500 shadow-lg text-xs"
                onClick={getByNameFromContext}
              >
                GET
              </button>
            </div>
          </div>

          {/* Category Input */}
          <div className="mb-2 flex flex-col">
            <label className="w-24 mr-2 text-[0.625rem]">Category</label>
            <select
              className="w-full text-zinc-700 bg-gray-200"
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

          {/* Thought Input */}
          <div className="mb-2 flex flex-col">
            <label className="text-[0.625rem] mb-1">Thought</label>
            <textarea
              className="w-full h-24 text-zinc-700 bg-gray-200"
              name="thought"
              value={thought}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            className="p-2 bg-blue-900 text-white rounded-sm hover:bg-blue-500 shadow-lg text-xs"
            onClick={updateThoughtWithContext}
          >
            UPDATE
          </button>
          <button
            className="p-2 bg-red-700 text-white rounded-sm hover:bg-red-500 shadow-lg text-xs"
            onClick={deleteThoughtWithContext}
          >
            DELETE
          </button>
        </div>
      </div>

      <hr className="w-4/5 h-0.5 mx-auto rounded mt-4 bg-slate-400" />

      {/* Display Matching Thoughts */}
      <div className=" h-60 overflow-x-hidden overflow-y-auto w-auto">
        {matchingThoughts.length > 0 ? (
          matchingThoughts.map((thought) => (
            <div
              key={thought.id}
              className="mx-5 my-4 rounded-sm p-1 shadow-lg h-40 w-96 border-solid border-2 border-blue-950 border-opacity-20 flex flex-col overflow-x-hidden overflow-y-auto  "
              onClick={() => handleThoughtClick(thought)}
            >
              <div className="flex justify-between">
                <h3 className="text-sm align-text-top">{thought.name}</h3>
                <p className="text-xs text-gray-500 mr-2 cursor-pointer">
                  Edit
                </p>
              </div>

              <p className="mb-2 text-[0.625rem]">{thought.category}</p>

              <p className=""> {thought.thought}</p>
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
