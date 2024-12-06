import { useContext } from "react";
import ThoughtItem from "./ThoughtsItems";
import { ThoughtsContext } from "../../contexts/ThoughtsContext";
import IThoughtsContext from "../../interfaces/thoughts/IThoughtsContext";

const ThoughtList = () => {
  const { thoughts } = useContext(ThoughtsContext) as IThoughtsContext;

  const createAndGetStaffAdminJSX = () => {
    const thoughtMemberJSX = thoughts.map((thought) => {
      return (
        <ThoughtItem
          key={thought.id}
          id={thought.id}
          name={thought.name}
          category={thought.category}
          thought={thought.thought}
          dateCreated={thought.dateCreated}
        />
      );
    });

    return thoughtMemberJSX;
  };

  return <section>{createAndGetStaffAdminJSX()}</section>;
};

export default ThoughtList;
