import { FC } from "react";
import IThoughts from "../../interfaces/IThoughts";

const ThoughtItem: FC<IThoughts> = ({
  id,
  name,
  thought,
  category,
  dateCreated,
}) => {
  return (
    <article>
      <h3>
        {name} (id: {id})
      </h3>
      <p>Category: {category}</p>
      <p>Thought: {thought}</p>
      <p>Date published: {dateCreated?.toLocaleDateString()}</p>
    </article>
  );
};

export default ThoughtItem;
