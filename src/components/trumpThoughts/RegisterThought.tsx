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

      <div className="flex-1 bg-blue-100 h-screen flex flex-col">
        <div className="flex-1/2 flex flex-col items-center">
          <h3> Register new thought</h3>

          <div className="flex items-center mb-2">
            <label className="mr-2">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center mb-2">
            <label className="mr-2">Thought</label>
            <input
              type="text"
              name="thought"
              value={thought}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center mb-2">
            <label className="mr-2">Category</label>
            {/* legge til dropdown senere */}
            <input
              type="text"
              name="category"
              value={category}
              onChange={handleChange}
            />
          </div>

          <button
            onClick={registerThought}
            className="mt-2 bg-blue-400 text-white p-2 rounded hover:bg-blue-500"
          >
            Register Thought
          </button>
        </div>

        <div className="flex-1">plassen som skal inneholde thought</div>
      </div>

      <div className="flex-1 bg-green-100 h-screen"></div>
    </section>
  );
};

export default RegisterThought;
