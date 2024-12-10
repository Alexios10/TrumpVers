import React from "react";

interface SwitchPageButtonsProps {
  pages: { id: string; label: string }[];
  activePage: string;
  setActivePage: (page: string) => void;
}

const SwitchPageButtons: React.FC<SwitchPageButtonsProps> = ({
  pages,
  activePage,
  setActivePage,
}) => {
  return (
    <div className="flex justify-center gap-4 mx-3 mb-5">
      {pages.map((page) => (
        <button
          key={page.id}
          onClick={() => setActivePage(page.id)}
          className={`p-2 bg-blue-900 text-white rounded-sm hover:bg-blue-500 shadow-lg text-sm ${
            activePage === page.id ? "bg-blue-500" : ""
          }`}
          aria-label={`Switch to ${page.label}`}
        >
          {page.label}
        </button>
      ))}
    </div>
  );
};

export default SwitchPageButtons;
