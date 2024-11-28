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
      <header></header>

      <div className=" bg-white h-screen flex flex-col">
        <div className="flex flex-col items-center">
          <h3 className="m-4 text-3xl"> Register new thought</h3>
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

            {/* legge til dropdown senere (Options) */}
            <div className="mb-2 flex flex-col">
              <label className="w-24 mr-2 text-xs">Category</label>

              <input
                className="w-full bg-gray-200"
                type="text"
                name="category"
                value={category}
                onChange={handleChange}
              />
            </div>

            {/* legge til text area */}
            <div className="mb-2 fflex flex-col">
              <label className="w-24 mr-2 text-xs">Thought</label>
              <input
                className="w-full bg-gray-200"
                type="text"
                name="thought"
                value={thought}
                onChange={handleChange}
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

        <div>
          <div>plassen som skal inneholde thought</div>
        </div>
      </div>

      <div className=" bg-green-100 h-screen" style={{ flex: "1 1 60%" }}></div>
    </section>
  );
};

export default RegisterThought;
