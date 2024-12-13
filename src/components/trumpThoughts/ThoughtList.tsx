import { FC } from "react";
import ThoughtItem from "./ThoughtsItems";
import IThoughts from "../../interfaces/thoughts/IThoughts";

interface ThoughtListProps {
  thoughts: IThoughts[];
}

const ThoughtList: FC<ThoughtListProps> = ({ thoughts }) => {
  // Funskjon for lage og hente JSX
  const createAndGetThoughtJSX = () => {
    const thoughtJSX = thoughts.map((thought) => {
      return (
        <ThoughtItem
          key={"thought" + thought.id}
          id={thought.id}
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
