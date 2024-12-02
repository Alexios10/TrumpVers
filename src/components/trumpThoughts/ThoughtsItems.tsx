import { FC } from "react";
import IThoughts from "../../interfaces/thoughts/IThoughts";

interface ThoughtItemProps extends IThoughts {
  onClick: () => void; // Callback for handling click events
}

const ThoughtItem: FC<ThoughtItemProps> = ({
  name,
  thought,
  category,
  dateCreated,
  onClick,
}) => {
  const truncatedThought =
    thought.length > 50 ? `${thought.slice(0, 50)}...` : thought;

  return (
    <article
      className="mx-5 my-4 rounded-sm p-1 shadow-lg h-40 w-96 border-solid border-2 border-blue-950 border-opacity-20 cursor-pointer overflow-hidden"
      onClick={onClick} // Trigger the callback when the item is clicked
    >
      <div className="m-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm align-text-top">{name}</h3>
          <p className="text-end text-[0.625rem]">
            <span className="mr-1"></span>
            {dateCreated ? new Date(dateCreated).toLocaleDateString() : "N/A"}
          </p>
        </div>

        <p className="text-xs">{category}</p>
        <p className="mt-2 text-base">{truncatedThought}</p>
        {thought.length > 50 && (
          <button
            className="text-blue-600 font-bold text-xs mt-1"
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling to the parent
              onClick();
            }}
          >
            Read more
          </button>
        )}
      </div>
    </article>
  );
};

export default ThoughtItem;
