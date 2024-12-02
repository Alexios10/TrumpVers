import { FC } from "react";
import IThoughts from "../../interfaces/thoughts/IThoughts";
import ThoughtItem from "./ThoughtsItems";

interface ThoughtListProps {
  thoughts: IThoughts[];
  onThoughtClick: (thought: IThoughts) => void; // Callback for item clicks
}

const ThoughtList: FC<ThoughtListProps> = ({ thoughts, onThoughtClick }) => {
  return (
    <section>
      {thoughts.map((thought) => (
        <ThoughtItem
          key={thought.id}
          {...thought}
          onClick={() => onThoughtClick(thought)} // Pass the clicked thought
        />
      ))}
    </section>
  );
};

export default ThoughtList;
