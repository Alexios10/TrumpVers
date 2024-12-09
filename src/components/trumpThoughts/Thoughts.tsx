import { useContext, useState } from "react";
import ThoughtList from "./ThoughtList";
import { ThoughtsContext } from "../../contexts/ThoughtsContext";
import IThoughtsContext from "../../interfaces/thoughts/IThoughtsContext";

const Thoughts = () => {
  const { thoughts } = useContext(ThoughtsContext) as IThoughtsContext;

  const [filterCategory, setFilterCategory] = useState<string>("All");

  const filteredThoughts =
    filterCategory === "All"
      ? thoughts
      : thoughts.filter((thought) => thought.category === filterCategory);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value);
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

  return (
    <div className="sm:mx-32 md:mx-40 lg:mx-52">
      <h2 className="text-center font-bold sm:text-3xl lg:text-5xl text-blue-950 mb-2">
        From the President's Desk:
      </h2>
      <h3 className="text-center font-bold sm:text-xl lg:text-4xl text-blue-950 mb-8">
        Thoughtful Dialogues on Our Country's Future
      </h3>

      {/* Filter Dropdown */}
      <div className="flex justify-center mb-6">
        <label
          htmlFor="filterCategory"
          className="mr-2 text-lg font-semibold text-blue-950"
        >
          Filter by Category:
        </label>
        <select
          id="filterCategory"
          value={filterCategory}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md bg-white text-zinc-700"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <ThoughtList thoughts={filteredThoughts} />
    </div>
  );
};

export default Thoughts;
