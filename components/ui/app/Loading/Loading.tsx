import React from "react";
import Logo from "../Logo";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="mb-20 animate-pulse duration-500">
        <Logo />
      </div>
    </div>
  );
};

export default Loading;
