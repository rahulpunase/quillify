import Image from "next/image";
import React from "react";

const WelcomeSection = () => {
  return (
    <section className="mr-10 flex shrink-0 flex-1 justify-center items-center flex-col">
      <h1 className="mb-2 text-4xl">Welcome to Quillify</h1>
      <h4 className="mb-4">Open the possibilities to infinity</h4>
      <Image src="/welcome.svg" alt="Welcome" width="600" height="400" />
    </section>
  );
};

export default WelcomeSection;
