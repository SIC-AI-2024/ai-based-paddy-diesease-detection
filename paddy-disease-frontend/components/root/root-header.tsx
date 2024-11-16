"use client";

import { useState, useEffect } from "react";
import RootNavbar from "./root-navbar";
import Image from "next/image";

export default function RootHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`flex flex-row items-center px-8 justify-between fixed z-50 w-screen ${
        isScrolled ? "bg-opacity-100 bg-background shadow-md" : "bg-opacity-90"
      } transition-all duration-300`}
    >
      <Image
        src="/images/logo/logo-light.png"
        alt="Logo"
        width={80}
        height={80}
      />
      <RootNavbar isScrolled={isScrolled} />
    </header>
  );
}
