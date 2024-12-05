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
    "Select a category",
    "Politic",
    "Economy",
    "History",
    "Country",
    "Philosophy",
    "Facts",
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
      <h3 className="text-3xl mb-4 text-blue-950 font-bold">Thoughts Admin</h3>

      {/* Input and Buttons */}
      <div className="flex-1/2 flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md w-11/12 max-w-xl">
        <div className="w-full">
          {/* Get Thought by Name */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Get Thought by Name
            </label>
            <div className="flex gap-3">
              <input
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
              />
              <button
                className="px-4 bg-blue-900 text-white rounded-md hover:bg-blue-500 shadow-lg text-xs"
                onClick={getByNameFromContext}
              >
                GET
              </button>
            </div>
          </div>

          {/* Category Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Category</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Thought</label>
            <textarea
              className="w-full h-24 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              name="thought"
              value={thought}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-4">
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

      <hr className="w-4/5 h-0.5 mx-auto rounded mt-6 bg-slate-400" />

      {/* Display Matching Thoughts */}
      <div className="h-60 overflow-x-hidden overflow-y-auto w-auto mt-4">
        {matchingThoughts.length > 0 ? (
          matchingThoughts.map((thought) => (
            <div
              key={thought.id}
              className="mx-5 my-4 rounded-md p-4 shadow-lg h-40 w-96 border border-gray-300 bg-white flex flex-col overflow-y-auto"
              onClick={() => handleThoughtClick(thought)}
            >
              <div className="flex justify-between mb-2">
                <h3 className="text-sm font-bold">{thought.name}</h3>
                <p className="text-xs text-blue-500 cursor-pointer hover:underline">
                  Edit
                </p>
              </div>

              <p className="text-xs mb-2 text-gray-500">{thought.category}</p>
              <p className="text-sm text-gray-700">{thought.thought}</p>
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
