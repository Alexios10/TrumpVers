import { FC } from "react";
import IThoughts from "../../interfaces/IThoughts";
import ThoughtItem from "./ThoughtsItems";

interface ThoughtListProps {
  thoughts: IThoughts[]; // Declare the prop type
}

const ThoughtList: FC<ThoughtListProps> = ({ thoughts }) => {
  return (
    <section>
      {thoughts.map((thought, id) => (
        <ThoughtItem
          key={"thought" + id}
          name={thought.name}
          thought={thought.thought}
          category={thought.category}
          dateCreated={thought.dateCreated}
        />
      ))}
    </section>
  );
};

export default ThoughtList;
