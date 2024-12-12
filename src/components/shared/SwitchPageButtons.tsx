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
    <div className="flex gap-2 mb-4 justify-center w-[32.2rem]">
      {pages.map((page) => (
        <button
          key={page.id}
          onClick={() => setActivePage(page.id)}
          className="p-2 bg-blue-900 text-white rounded-sm hover:bg-blue-500 shadow-lg text-sm"
        >
          {page.label}
        </button>
      ))}
    </div>
  );
};

export default SwitchPageButtons;
