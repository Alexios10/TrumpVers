import { ChangeEvent, useContext, useState } from "react";
import { ThoughtsContext } from "../../contexts/ThoughtsContext";
import IThoughtsContext from "../../interfaces/thoughts/IThoughtsContext";
import IThoughts from "../../interfaces/thoughts/IThoughts";
import Container from "../shared/Container";
import UpdateDeleteBtns from "../shared/UpdateDeleteBtns";

const UpdateDeleteThoughts = () => {
  const { getThoughtById, getThoughtByName, putThought, deleteThought } =
    useContext(ThoughtsContext) as IThoughtsContext;

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
    <section className="flex flex-col md:flex-row">
      {/* form container */}
      <div className="flex flex-col items-center basis-[40%]">
        <h3 className="text-3xl mb-5 text-blue-950">Thoughts Admin</h3>
        <div className="space-y-3">
          {/* Get by Name */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm">Get Thought by Name:</label>
            <div className="flex gap-3">
              <input
                className="input"
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
              />
              <button
                className="w-36 h-10 bg-blue-900 text-white p-2 rounded-sm hover:bg-blue-500 shadow text-xs"
                onClick={getByNameFromContext}
              >
                GET BY NAME
              </button>
            </div>
          </div>

          {/* Get Thought by ID */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm">Get Thought by ID:</label>
            <div className="flex gap-3">
              <input
                className="input"
                type="number"
                name="id"
                onChange={handleChange}
              />
              <button
                className="w-36 h-10 bg-blue-900 text-white rounded-sm hover:bg-blue-500 shadow-lg text-xs"
                onClick={getByIdFromContext}
              >
                GET BY ID
              </button>
            </div>
          </div>

          {/* Category Input */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm">Category:</label>
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
          <div className="flex flex-col space-y-1">
            <label className="text-sm">Thought:</label>
            <textarea
              className="input"
              name="thought"
              value={thought}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* update & delete buttons */}
        <UpdateDeleteBtns
          update={updateThoughtWithContext}
          onDelete={deleteThoughtWithContext}
        />
      </div>

      {/* right container */}
      <Container>
        <div className="flex flex-col flex-grow overflow-hidden overflow-y-auto basis-[60%]">
          {matchingThoughts.length > 0 &&
            matchingThoughts.map((thought) => (
              <div
                key={thought.id}
                className="mx-5 my-4 rounded-sm p-1 shadow-lg h-auto w-auto border-solid border-2 border-blue-950 border-opacity-20"
                onClick={() => handleThoughtClick(thought)}
              >
                <div className="m-2">
                  <p className="text-xs">ID: {thought.id}</p>
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm align-text-top">{thought.name}</h3>
                    <p className="text-end text-xs">
                      {thought.dateCreated
                        ? new Date(thought.dateCreated).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <p className="text-xs">{thought.category}</p>
                  <p className="mt-2 text-base">{thought.thought}</p>
                </div>
              </div>
            ))}
        </div>
      </Container>
    </section>
  );
};

export default UpdateDeleteThoughts;
