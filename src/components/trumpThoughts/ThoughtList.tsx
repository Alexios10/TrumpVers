import { FC } from "react";
import IThoughts from "../../interfaces/thoughts/IThoughts";
import ThoughtItem from "./ThoughtsItems";

interface ThoughtListProps {
  thoughts: IThoughts[];
}

const ThoughtList: FC<ThoughtListProps> = ({ thoughts }) => {
  const createAndGetThoughtJSX = () => {
    const thoughtJSX = thoughts.map((thought) => {
      return (
        <ThoughtItem
          key={thought.id}
          name={thought.name}
          thought={thought.thought}
          category={thought.category}
          dateCreated={thought.dateCreated}
        />
      );
    });

    return thoughtJSX;
  };

  return <section>{createAndGetThoughtJSX()}</section>;
};

export default ThoughtList;
