import { ChangeEvent, useContext, useState } from "react";
import { ThoughtsContext } from "../../contexts/ThoughtsContext";
import IThoughtsContext from "../../interfaces/IThoughtsContext";
import ThoughtList from "./ThoughtList";

const RegisterThought = () => {
  const { postThought, thoughts } = useContext(
    ThoughtsContext
  ) as IThoughtsContext;

  const [name, setName] = useState<string>("");
  const [thought, setThought] = useState<string>("");
  const [category, setCategory] = useState<string>(""); // For registering a new thought
  const [filterCategory, setFilterCategory] = useState<string>("All"); // For filtering displayed thoughts

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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

      default:
        break;
    }
  };

  const registerThought = () => {
    const newThought = {
      name,
      thought,
      category,
      dateCreated: new Date(),
    };

    postThought(newThought);
    alert("Thought registered successfully!");
    setName("");
    setThought("");
    setCategory("");
  };

  const categories = ["All", "Politic", "Economy", "History"]; // categories

  //  filtrere gjennom thoughts
  const filteredThoughts =
    filterCategory === "All"
      ? thoughts
      : thoughts.filter((thought) => thought.category === filterCategory);

  return (
    <section className="flex">
<<<<<<< HEAD
      <header></header>

      <div
        className=" bg-white h-screen flex flex-col"
        style={{ flex: "1 1 40%" }}
      >
        <div className="flex flex-col items-center">
          <h3 className="m-4 text-3xl"> Register new thought</h3>
=======
      <div className="flex-1 bg-white h-screen flex flex-col">
        <div className="flex-1/2 flex flex-col items-center">
          <header>
            <h3 className="m-4 text-3xl">Register new thought</h3>
          </header>
>>>>>>> 5f1d1cfd0a34ab3bd182ac246ab7c3bf22e92b88
          <div className="w-96 items-start">
            <div className="mb-2 flex flex-col">
              <label className="w-24 mr-2 text-xs">Name</label>
              <input
                className="w-full bg-gray-200"
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2 flex flex-col">
              <label className="w-24 mr-2 text-xs">Category</label>
              <select
                className="w-full bg-gray-200"
                name="category"
                value={category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-2 flex flex-col">
              <label className="w-24 mr-2 text-xs">Thought</label>
              <textarea
                className="w-full bg-gray-200"
                name="thought"
                value={thought}
                onChange={handleChange}
                rows={4}
              />
            </div>
          </div>

          <button
            onClick={registerThought}
            className="m-4 bg-blue-400 text-white p-2 rounded hover:bg-blue-500 shadow-lg"
          >
            Register Thought
          </button>
        </div>
        <hr className="w-3/4 h-0.5 mx-auto rounded m-4 bg-slate-400" />

<<<<<<< HEAD
        <div>
          <div>plassen som skal inneholde thought</div>
=======
        {/* Dropdown to filter thoughts */}
        <div className="w-96 mx-auto">
          <label className="w-24 mr-2 text-xs">Filter by Category</label>
          <select
            className="w-full bg-gray-200"
            name="filterCategory"
            value={filterCategory}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Filtered thoughts list */}
        <div>
          <ThoughtList thoughts={filteredThoughts} />
>>>>>>> 5f1d1cfd0a34ab3bd182ac246ab7c3bf22e92b88
        </div>
      </div>

      <div className=" bg-green-100 h-screen" style={{ flex: "1 1 60%" }}></div>
    </section>
  );
};

export default RegisterThought;
