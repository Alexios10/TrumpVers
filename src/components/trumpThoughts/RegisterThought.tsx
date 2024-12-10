import { ChangeEvent, useContext, useState } from "react";
import { ThoughtsContext } from "../../contexts/ThoughtsContext";
import IThoughtsContext from "../../interfaces/thoughts/IThoughtsContext";
import ThoughtList from "./ThoughtList";
import UpdateDeleteThoughts from "./UpdateDeleteThoughts";
import Container from "../shared/Container";
import SwitchPageButtons from "../shared/SwitchPageButtons";

const RegisterThought = () => {
  const { postThought, thoughts } = useContext(
    ThoughtsContext
  ) as IThoughtsContext;

  const [name, setName] = useState<string>("");
  const [thought, setThought] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [activePage, setActivePage] = useState<"register" | "admin">(
    "register"
  );

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
    if (!name || !thought || !category || category === "Select a category") {
      alert("All fields are required.");
      return;
    }

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

  const choosenCategories = [
    "Select a category",
    "Politic",
    "Economy",
    "History",
    "Country",
    "Philosophy",
    "Facts",
  ];

  const filteredThoughts =
    filterCategory === "All"
      ? thoughts
      : thoughts.filter((thought) => thought.category === filterCategory);

  return (
    <>
      <div className="flex w-fit ml-[6rem]">
        <SwitchPageButtons
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </div>
      <section className="flex">
        <div className="bg-white flex flex-col flex-grow basis-[40%]">
          {activePage === "admin" && <UpdateDeleteThoughts />}

          {activePage === "register" && (
            <div className="flex flex-col items-center">
              <h3 className="text-3xl mb-2 text-blue-950">
                Register New Thought
              </h3>
              <div className="bg-white h-screen flex flex-col">
                <div className="w-96 items-start">
                  <div className="mb-4 flex flex-col">
                    <label className="w-24 mr-2 text-sm">Name</label>
                    <input
                      className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleChange}
                    />
                  </div>
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
                <button
                  onClick={registerThought}
                  className="mb-4 bg-blue-900 text-white p-2 rounded-sm hover:bg-blue-500 shadow-lg text-xs"
                >
                  PUBLISH
                </button>
              </div>
            </div>
          )}
        </div>

        {/* right container */}
        {activePage === "register" ? (
          <Container>
            {/* Filter Dropdown*/}
            <div className="sticky top-0 z-10 bg-white p-2 mb-4 border-b border-gray-300">
              <select
                className="w-64 p-2 rounded-sm bg-gray-200 text-zinc-700"
                name="filterCategory"
                value={filterCategory}
                onChange={handleChange}
              >
                <option value="All">All Categories</option>
                {choosenCategories
                  .filter((cat) => cat !== "Select a category")
                  .map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
            </div>

            {/* Scrollable Thoughts List */}
            <div className="overflow-y-auto flex-grow">
              <ThoughtList thoughts={filteredThoughts} />
            </div>
          </Container>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default RegisterThought;
