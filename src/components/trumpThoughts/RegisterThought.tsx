import { ChangeEvent, useContext, useEffect, useState } from "react";
import { ThoughtsContext } from "../../contexts/ThoughtsContext";
import IThoughtsContext from "../../interfaces/thoughts/IThoughtsContext";
import ThoughtList from "./ThoughtList";
import UpdateDeleteThoughts from "./UpdateDeleteThoughts";
import IThoughts from "../../interfaces/thoughts/IThoughts";

const RegisterThought = () => {
  const { postThought, thoughts } = useContext(
    ThoughtsContext
  ) as IThoughtsContext;

  const [name, setName] = useState<string>("");
  const [thought, setThought] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [activePage, setActivePage] = useState<"register" | "admin">(
    () =>
      (localStorage.getItem("activePage") as "register" | "admin") || "register"
  );
  // State to manage selected thought
  const [selectedThought, setSelectedThought] = useState<IThoughts | null>(
    null
  );

  useEffect(() => {
    // Save activePage to localStorage whenever it changes
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

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

  const handleThoughtClick = (thought: IThoughts) => {
    setSelectedThought(thought);
  };

  const categories = [
    "All",
    "Politic",
    "Economy",
    "History",
    "Country",
    "Philosophy",
    "Facts",
  ];
  const choosenCategoriy = [
    "",
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

  const switchPage = (page: "register" | "admin") => {
    setActivePage(page);
  };

  return (
    <section className="flex">
      <div
        className="bg-white min-h-fit flex flex-col border-r-2 border-slate-400"
        style={{ flex: "1 1 40%" }}
      >
        <div className="flex justify-center gap-4 mx-3 mb-5">
          <button
            onClick={() => switchPage("register")}
            className={`p-2 bg-blue-900 text-white rounded-sm hover:bg-blue-500 shadow-lg text-sm ${
              activePage === "register" ? "bg-blue-500" : ""
            }`}
          >
            Register New Thought
          </button>

          <button
            onClick={() => switchPage("admin")}
            className={`p-2 bg-blue-900 text-white rounded-sm hover:bg-blue-500 shadow-lg text-sm ${
              activePage === "admin" ? "bg-blue-500" : ""
            }`}
          >
            Thought Admin
          </button>
        </div>

        {activePage === "admin" && <UpdateDeleteThoughts />}

        {activePage === "register" && (
          <div
            className="bg-white h-screen flex flex-col border-slate-400"
            style={{ flex: "1 1 40%" }}
          >
            <div className="flex flex-col items-center">
              <h3 className="text-3xl mb-2 text-blue-950">
                Register New Thought
              </h3>
              <div className="flex-1 bg-white h-screen flex flex-col">
                <div className="flex-1/2 flex flex-col items-center">
                  <div className="w-96 items-start">
                    <div className="mb-2 flex flex-col">
                      <label className="w-24 mr-2 text-[0.625rem]">Name</label>
                      <input
                        className="w-full text-zinc-700 bg-gray-200"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2 flex flex-col">
                      <label className="w-24 mr-2 text-[0.625rem]">
                        Select Category
                      </label>

                      <select
                        className="w-full text-zinc-700 bg-gray-200"
                        name="category"
                        value={category}
                        onChange={handleChange}
                      >
                        {choosenCategoriy.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2 flex flex-col">
                      <label className="w-24 mr-2 text-[0.625rem]">
                        Thought
                      </label>
                      <textarea
                        className="w-full h-24 text-zinc-700 bg-gray-200"
                        name="thought"
                        value={thought}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <button
                    onClick={registerThought}
                    className="mb-2 bg-blue-900 text-white p-2 rounded-sm hover:bg-blue-500 shadow-lg text-xs"
                  >
                    PUBLISH
                  </button>
                </div>
              </div>

              <hr className="w-4/5 h-0.5 mx-auto rounded m-2 bg-slate-400" />
              <div className="w-96 mx-auto">
                <label className="flex flex-col w-32 mr-2 text-xs">
                  Filter by Category
                </label>
                <select
                  className="w-1/4 bg-gray-200 text-xs"
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

              <hr className="w-2/3 h-0.5 mx-auto rounded m-2 bg-slate-100" />

              <div className="h-96 overflow-x-hidden overflow-y-auto">
                <div className="h-60 overflow-x-hidden overflow-y-auto">
                  <div>
                    <ThoughtList
                      thoughts={filteredThoughts}
                      onThoughtClick={handleThoughtClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Container for Selected Thought */}
      <div
        className="mx-8 flex-1 p-14 border-solid border-2 border-opacity-20 border-blue-950 rounded-sm shadow h-[42rem] overflow-x-hidden overflow-y-auto"
        style={{ flex: "1 1 60%" }}
      >
        {selectedThought ? (
          <div>
            <div className="flex justify-between">
              <h3 className="text-lg font-bold mb-2 text-gray-700">
                {selectedThought.name}
              </h3>
              <p className="text-xs text-gray-500">
                <span className="font-semibold">Date Published: </span>{" "}
                {selectedThought.dateCreated
                  ? new Date(selectedThought.dateCreated).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <p className="text-xs text-gray-500 mb-1">
              <span className="font-semibold"></span> {selectedThought.category}
              {selectedThought.category}
            </p>

            <p className="text-lg text-gray-700 mt-4">
              {selectedThought.thought}
            </p>
          </div>
        ) : (
          <p className="flex justify-center  text-gray-500">
            Select a thought to view its details.
          </p>
        )}
      </div>
    </section>
  );
};

export default RegisterThought;
