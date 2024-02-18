import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({
  height,
  width,
  href = "/",
}: {
  height?: number;
  width?: number;
  href?: string;
}) => {
  return (
    <Link href={href}>
      <Image
        src="/quillify-logo.png"
        alt="quillify"
        height={height ?? 50}
        width={width ?? 100}
      />
    </Link>
  );
};

export default Logo;
