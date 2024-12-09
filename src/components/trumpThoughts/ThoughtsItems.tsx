import { FC, useState } from "react";
import IThoughts from "../../interfaces/thoughts/IThoughts";

const ThoughtItem: FC<IThoughts> = ({
  id,
  name,
  thought,
  category,
  dateCreated,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncatedThought =
    thought.length > 50 ? `${thought.slice(0, 400)}...` : thought;

  return (
    <article className="mx-5 my-4 rounded-sm p-1 shadow-lg h-auto w-auto border-solid border-2 border-blue-950 border-opacity-20 overflow-hidden">
      <div className="m-2">
        <p className="text-xs">ID: {id}</p>
        <div className="flex justify-between items-center">
          <h3 className="text-sm align-text-top">{name}</h3>
          <p className="text-end text-xs">
            {dateCreated ? new Date(dateCreated).toLocaleDateString() : "N/A"}
          </p>
        </div>
        <p className="text-xs">{category}</p>
        <p className="mt-2 text-base">
          {isExpanded ? thought : truncatedThought}
        </p>
        {thought.length > 400 && (
          <button
            className="text-blue-800 font-bold text-xs cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling to the parent
              setIsExpanded(!isExpanded); // Toggle the expanded state
            }}
          >
            {isExpanded ? "Read less" : "...Read more"}
          </button>
        )}
      </div>
    </article>
  );
};

export default ThoughtItem;
