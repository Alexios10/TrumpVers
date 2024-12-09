import { ChangeEvent, useContext, useState } from "react";
import { ThoughtsContext } from "../../contexts/ThoughtsContext";
import IThoughtsContext from "../../interfaces/thoughts/IThoughtsContext";
import IThoughts from "../../interfaces/thoughts/IThoughts";
import Container from "../shared/Container";
import SwitchPageButtons from "../shared/SwitchPageButtons";

const UpdateDeleteThoughts = () => {
  const { getThoughtById, getThoughtByName, putThought, deleteThought } =
    useContext(ThoughtsContext) as IThoughtsContext;

  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [thought, setThought] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [matchingThoughts, setMatchingThoughts] = useState<IThoughts[]>([]);
  const [activePage, setActivePage] = useState<"register" | "admin">(
    "register"
  );

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
    switch (e.target.name) {
      case "id":
        setId(Number(e.target.value));
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
  };

  const getByIdFromContext = async () => {
    if (!id) {
      alert("Please enter thought id");
      return;
    }
    try {
      const thought = await getThoughtById(id);
      if (thought) {
        setId(thought.id ?? null);
        setName(thought.name ?? "");
        setThought(thought.thought ?? "");
        setCategory(thought.category ?? "");
      } else {
        alert(`Thought with id "${id}" not found.`);
      }
    } catch (error) {
      console.error("Error fetching thought:", error);
    }
  };

  const getByNameFromContext = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }

    try {
      const thought = await getThoughtByName(name);
      if (thought && thought.length > 0) {
        setMatchingThoughts(thought);
      }
    } catch (error) {
      console.error("Error fetching thought:", error);
      alert(`Thought with name "${name}" not found.`);
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
    <section className="flex">
      {/* Input and Buttons */}
      <div className="flex flex-col items-center ">
        <SwitchPageButtons
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <h3 className="text-3xl mb-4 text-blue-950 ">Thoughts Admin</h3>
        <div className="w-96 items-start">
          {/* Get Thought by Name */}
          <div className="mb-4 flex flex-col">
            <label className="w-40 mr-2 text-sm mb-2">
              Get Thought by Name
            </label>
            <div className="flex gap-3">
              <input
                className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
              />
              <button
                className="px-4 bg-blue-900 text-white rounded-sm hover:bg-blue-500 shadow-lg text-xs"
                onClick={getByNameFromContext}
              >
                GET BY NAME
              </button>
            </div>
          </div>

          {/* Get Thought by ID */}
          <div className="mb-4 flex flex-col">
            <label className="w-40 mr-2 text-sm mb-2">Get Thought by ID</label>
            <div className="flex gap-3">
              <input
                className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
                type="number"
                name="id"
                onChange={handleChange}
              />
              <button
                className="px-4 bg-blue-900 text-white rounded-sm hover:bg-blue-500 shadow-lg text-xs"
                onClick={getByIdFromContext}
              >
                GET BY ID
              </button>
            </div>
          </div>

          {/* Category Input */}
          <div className="mb-4 flex flex-col">
            <label className="w-24 mr-2 text-sm">Category</label>
            <select
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
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
          <div className="mb-4 flex flex-col">
            <label className="w-24 mr-2 text-sm">Thought</label>
            <textarea
              className="w-full h-24 text-zinc-700 bg-gray-200 p-2 rounded-sm"
              name="thought"
              value={thought}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-2 p-2">
          <button
            className="p-2 w-20 bg-blue-900 text-white rounded-sm hover:bg-blue-500 shadow-lg text-xs"
            onClick={updateThoughtWithContext}
          >
            UPDATE
          </button>
          <button
            className="p-2 w-20 bg-red-700 text-white rounded-sm hover:bg-red-500 shadow-lg text-xs"
            onClick={deleteThoughtWithContext}
          >
            DELETE
          </button>
        </div>
      </div>

      {/* Display Matching Thoughts */}
      <Container>
        <div className=" ">
          {matchingThoughts.length > 0 &&
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
            ))}
        </div>
      </Container>
    </section>
  );
};

export default UpdateDeleteThoughts;
