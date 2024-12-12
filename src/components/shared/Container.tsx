import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col flex-grow basis-[60%] pt-5 m-4 w-full border-solid border-2 border-opacity-20 border-blue-950 rounded-sm shadow h-screen overflow-y-auto">
      {children}
    </div>
  );
};

export default Container;
