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

      <div className="flex-1 bg-white h-screen flex flex-col">
        <div className="flex-1/2 flex flex-col items-center">
          <h3 className="m-4"> Register new thought</h3>
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

            <div className="mb-2 flex flex-col">
              <label className="w-24 mr-2 text-xs">Category</label>
              {/* legge til dropdown senere */}
              <input
                className="w-full bg-gray-200"
                type="text"
                name="category"
                value={category}
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
        <div>plassen som skal inneholde thought</div>
      </div>

      <div className="flex-1 bg-green-100 h-screen"></div>
    </section>
  );
};

export default RegisterThought;
