import React from "react";

// Define types for the props
interface SwitchPageButtonsProps {
  activePage: "register" | "admin";
  setActivePage: (page: "register" | "admin") => void;
}

const SwitchPageButtons: React.FC<SwitchPageButtonsProps> = ({
  activePage,
  setActivePage,
}) => {
  const handleClick = (page: "register" | "admin") => {
    console.log(`Switching to: ${page}`); // Debug log
    setActivePage(page);
  };

  const renderPageSwitchButtons = () => (
    <div className="flex justify-center gap-4 mx-3 mb-5">
      {["register", "admin"].map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page as "register" | "admin")}
          className={`p-2 bg-blue-900 text-white rounded-sm hover:bg-blue-500 shadow-lg text-sm ${
            activePage === page ? "bg-blue-500" : ""
          }`}
          aria-label={`Switch to ${page} page`}
        >
          {page === "register" ? "Register New Thought" : "Thought Admin"}
        </button>
      ))}
    </div>
  );

  return <div>{renderPageSwitchButtons()}</div>;
};

export default SwitchPageButtons;
