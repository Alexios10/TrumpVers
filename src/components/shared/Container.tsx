import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col flex-grow basis-[60%] pt-5 m-4 w-full border-solid border-2 border-opacity-20 rounded-sm shadow h-screen overflow-y-hidden">
      {children}
    </div>
  );
};

export default Container;
