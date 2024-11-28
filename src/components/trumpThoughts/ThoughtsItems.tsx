import { FC } from "react";
import IThoughts from "../../interfaces/IThoughts";

const ThoughtItem: FC<IThoughts> = ({
  name,
  thought,
  category,
  dateCreated,
}) => {
  return (
    <article className="mx-5 my-4 rounded-sm p-1 shadow-lg h-40 w-96 border-solid border-2 border-blue-950 border-opacity-20 overflow-x-hidden overflow-y-auto">
      <div className="m-2">
        <div className="flex justify-between items-center ">
        <h3 className="text-sm align-text-top">{name}</h3>
        <p className="text-end text-[0.625rem] ">
          <span className="mr-1"></span>
          {dateCreated ? new Date(dateCreated).toLocaleDateString() : "N/A"}
        </p>
      </div>

      <p className="text-xs">{category}</p>
      <p className="mt-2 text-base">{thought}</p>
      <button className="text-black font-bold text-xs">... Read more</button>
      </div>
      
    </article>
  );
};

export default ThoughtItem;
