import { FC } from "react";
import IThoughts from "../../interfaces/IThoughts";

const ThoughtItem: FC<IThoughts> = ({
  name,
  thought,
  category,
  dateCreated,
}) => {
  return (
    <article className="bg-cyan-100 mx-5 my-4 rounded-lg p-1 shadow-lg">
      <h3>name: {name}</h3>
      <p>Category: {category}</p>
      <p>Thought: {thought}</p>
      <p>
        <span className="mr-1">Date published:</span>
        {dateCreated ? new Date(dateCreated).toLocaleDateString() : "N/A"}
      </p>
    </article>
  );
};

export default ThoughtItem;
