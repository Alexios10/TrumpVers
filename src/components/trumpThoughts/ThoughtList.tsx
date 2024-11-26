import { useContext } from "react";
import { ThoughtsContext } from "../../contexts/ThoughtsContext";
import IThoughtsContext from "../../interfaces/IThoughtsContext";
import ThoughtItem from "./ThoughtsItems";

const ThoughtList = () => {
  const { thoughts } = useContext(ThoughtsContext) as IThoughtsContext;

  const createAndGetThoughtJSX = () => {
    const thoughtJSX = thoughts.map((thought, index) => {
      return (
        <ThoughtItem
          key={"thought" + index}
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
