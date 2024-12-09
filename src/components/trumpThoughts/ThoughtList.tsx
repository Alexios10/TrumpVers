import { FC } from "react";
import ThoughtItem from "./ThoughtsItems";
import IThoughts from "../../interfaces/thoughts/IThoughts";

interface ThoughtListProps {
  thoughts: IThoughts[];
}

const ThoughtList: FC<ThoughtListProps> = ({ thoughts }) => {
  return (
    <section>
      {thoughts.map((thought, id) => (
        <ThoughtItem
          key={"thought" + id}
          id={thought.id}
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
