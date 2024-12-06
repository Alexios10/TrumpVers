import { FC } from "react";
import IThoughts from "../../interfaces/thoughts/IThoughts";

const ThoughtItem: FC<IThoughts> = ({
  id,
  name,
  thought,
  category,
  dateCreated,
}) => {
  const truncatedThought =
    thought.length > 50 ? `${thought.slice(0, 100)}...` : thought;

  return (
    <article className="mx-5 my-4 rounded-sm p-1 shadow-lg h-40 w-96 border-solid border-2 border-blue-950 border-opacity-20 overflow-hidden">
      <div className="m-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm align-text-top">{name}</h3>
          <p className="text-end text-[0.625rem]">
            <span className="mr-1"></span>
            {dateCreated ? new Date(dateCreated).toLocaleDateString() : "N/A"}
          </p>
        </div>
        <p className="text-xs">ID: {id}</p>
        <p className="text-xs">{category}</p>
        <p className="mt-2 text-base">{truncatedThought}</p>
        {thought.length > 100 && (
          <button
            className="text-blue-800 font-bold text-xs cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling to the parent
            }}
          >
            ... Read more
          </button>
        )}
      </div>
    </article>
  );
};

export default ThoughtItem;
