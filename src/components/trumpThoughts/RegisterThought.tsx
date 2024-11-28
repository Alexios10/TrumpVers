import { ChangeEvent, useContext, useState } from "react";
import { ThoughtsContext } from "../../contexts/ThoughtsContext";
import IThoughtsContext from "../../interfaces/IThoughtsContext";

const RegisterThought = () => {
  const { postThought } = useContext(ThoughtsContext) as IThoughtsContext;

  const [name, setName] = useState<string>("");
  const [thought, setThought] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  //const [DatePublished, setDatePublished] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
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

  const registerThought = () => {
    const newThought = {
      name: name,
      thought: thought,
      category: category,
    };

    postThought(newThought);
  };

  return (
    <section className="flex">
      <header></header>

      <div
        className=" bg-white h-screen flex flex-col"
        style={{ flex: "1 1 40%" }}
      >
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
