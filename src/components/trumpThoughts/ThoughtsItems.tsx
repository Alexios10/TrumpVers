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

  // Forkorter teksten hvis den er lengre enn 50 tegn. Bruker "??" for å håndtere undefined verdier.
  const truncatedThought =
    (thought ?? "").length > 50
      ? `${(thought ?? "").slice(0, 400)}...`
      : thought;

  return (
    // Artikkelelement som rammer inn hver tanke
    <article className="mx-5 my-4 rounded-sm p-1 shadow-lg h-auto w-auto border-solid border-2 border-blue-950 border-opacity-20 overflow-hidden">
      <div className="m-2">
        <p className="text-xs">ID: {id}</p>
        <div className="flex justify-between items-center">
          <h3 className="text-sm align-text-top">{name}</h3>
          {/* Viser datoen tanken ble opprettet, eller "N/A" hvis datoen ikke finnes */}
          <p className="text-end text-xs">
            {dateCreated ? new Date(dateCreated).toLocaleDateString() : "N/A"}
          </p>
        </div>
        <p className="text-xs">{category}</p>
        {/* Viser enten hele tanken eller den forkortede versjonen basert på isExpanded */}
        <p className="mt-2 text-base">
          {isExpanded ? thought : truncatedThought}
        </p>
        {/* Viser "Read more"/"Read less"-knappen hvis teksten er lengre enn 400 tegn */}
        {(thought ?? "").length > 400 && (
          <button
            className="text-blue-800 font-bold text-xs cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Hindrer at klikket sprer seg til overordnede elementer
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? "Read less" : "...Read more"}{" "}
            {/* Endrer teksten på knappen dynamisk */}
          </button>
        )}
      </div>
    </article>
  );
};

export default ThoughtItem; // Eksporterer komponenten for bruk i andre deler av applikasjonen
