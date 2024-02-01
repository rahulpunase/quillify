import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/app/Logo";
import { LogIn } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full h-[80px] bg-zinc-50 flex justify-center">
      <div className="flex w-[1024px]  items-center">
        <Logo />
        <nav className="flex ml-4 justify-start items-center gap-x-4 flex-1">
          <Link className="hover:bg-zinc-200 p-2 rounded" href="/about">
            What is Quillify
          </Link>
          <Link className="hover:bg-zinc-200 p-2 rounded" href="/pricing">
            Pricing
          </Link>
          <Link className="hover:bg-zinc-200 p-2 rounded" href="/features">
            Features
          </Link>
        </nav>
        <div>
          <Button className="">
            Login <LogIn className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
