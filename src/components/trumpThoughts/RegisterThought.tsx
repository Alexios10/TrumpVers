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
    <section>
      <header>
        <h3> Register new thought</h3>
      </header>

      <section>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>
        <div>
          <label>Thought</label>
          <input
            type="text"
            name="thought"
            value={thought}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Category</label>
          {/* legge til dropdown senere */}
          <input
            type="text"
            name="category"
            value={category}
            onChange={handleChange}
          />
        </div>

        <button onClick={registerThought}>Register Thought</button>
      </section>
    </section>
  );
};

export default RegisterThought;
