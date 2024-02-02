import { Button } from "@/components/ui/button";
import { ArrowRightFromLine } from "lucide-react";
import Image from "next/image";
import React from "react";

const Section1 = () => {
  return (
    <section className="pt-12 w-[1024px]">
      <h1 className="text-center text-5xl">Write, Create and Share.</h1>
      <h1 className="text-center text-5xl pt-4">
        Exit with the next big thing.
      </h1>
      <h4 className="text-center text-2xl pt-4 text-zinc-600">
        Quillify is the connected workspace where better, faster work happens.
      </h4>
      <div className="flex flex-col items-center justify-center pt-24">
        <Image
          src="/section-1-main.svg"
          alt="section-1"
          width={600}
          height={600}
        />
        <h5 className="pt-4">
          Keep your work organized in a way you've never before
        </h5>
        <div className="flex gap-x-4">
          <Button className="mt-6">
            Request a demo <ArrowRightFromLine className="ml-2 w-4 h-4" />
          </Button>
          <Button variant="ghost" className="mt-6">
            Talk to us <ArrowRightFromLine className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Section1;
