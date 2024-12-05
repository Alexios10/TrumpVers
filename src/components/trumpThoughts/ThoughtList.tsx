import { FC } from "react";
import IThoughts from "../../interfaces/thoughts/IThoughts";
import ThoughtItem from "./ThoughtsItems";

interface ThoughtListProps {
  thoughts: IThoughts[];
}

const ThoughtList: FC<ThoughtListProps> = ({ thoughts }) => {
  return (
    <section>
      {thoughts.map((thought) => (
        <ThoughtItem key={thought.id} {...thought} />
      ))}
    </section>
  );
};

export default ThoughtList;
