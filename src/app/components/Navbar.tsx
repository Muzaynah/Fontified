// Nav.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavProps {}

const Nav: React.FC<NavProps> = ({}) => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const shouldStackButtons = windowWidth < 700;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative">
      <div className="container mx-auto px-10 pt-8 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Image
            src="/assets/fontified.png"
            alt="Logo"
            width={200}
            height={50}
          />
        </div>
        {shouldStackButtons ? (
          <button className="block lg:hidden z-20" onClick={toggleMenu}>
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M4 6h16a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zm0 5h16a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : (
          <ul className="flex space-x-2">
            <li
              className={`text-sm px-4 py-2 rounded-full border-2 ${
                pathname === "/"
                  ? "bg-black text-white"
                  : "hover:bg-white hover:text-black"
              }`}
            >
              <Link href="/">Home</Link>
            </li>

            <li
              className={`text-sm px-4 py-2 rounded-full border-2 ${
                pathname === "/fonts-gallery-eng" ? "bg-white text-black" : " "
              }`}
            >
              <Link href="/fonts-gallery-eng">Browse Fonts</Link>
            </li>
            <li
              className={`text-sm px-4 py-2 rounded-full border-2 ${
                pathname === "/handwriting"
                  ? "bg-black text-white"
                  : "hover:bg-white hover:text-black"
              }`}
            >
              <Link href="/handwriting">Handwriting</Link>
            </li>
            <li
              className={`text-sm px-4 py-2 rounded-full border-2 ${
                pathname === "/editor"
                  ? "bg-black text-white"
                  : "hover:bg-white hover:text-black"
              }`}
            >
              <Link href="/editor">Editor</Link>
            </li>
            <li
              className={`text-sm px-4 py-2 rounded-full border-2 ${
                pathname === "/"
                  ? "bg-black text-white"
                  : "hover:bg-white hover:text-black"
              }`}
            >
              <Link href="/">{session?.user?.name}</Link>
            </li>
          </ul>
        )}
      </div>
      {isMenuOpen && (
        <div className="lg:hidden w-64 fixed top-0 right-0 h-full bg-black text-white transition-transform transform -translate-x-0 ease-in-out z-10">
          <div className="relative px-10 mt-24 text-right justify-right items-right">
            <ul className="pl-0">
              <li className="text-md pt-4 px-2 hover:text-purpur">
                <Link href="/fonts-gallery-eng">
                  <span
                    className={`border-b border-white block pb-4 ${
                      pathname === "/fonts-gallery-eng" ? "text-purpur" : ""
                    }`}
                  >
                    Browse Fonts
                  </span>
                </Link>
              </li>
              <li className="text-md pt-4 px-2 hover:text-purpur">
                <Link href="/handwriting">
                  <span
                    className={`border-b border-white block pb-4 ${
                      pathname === "/handwriting" ? "text-purpur" : ""
                    }`}
                  >
                    Handwriting
                  </span>
                </Link>
              </li>
              <li className="text-md pt-4 px-2 hover:text-purpur">
                <Link href="/editor">
                  <span
                    className={`border-b border-white block pb-4 ${
                      pathname === "/editor" ? "text-purpur" : ""
                    }`}
                  >
                    Editor
                  </span>
                </Link>
              </li>
              <li className="text-md pt-4 px-2 hover:text-purpur">
                <Link href="/profile">
                  <span
                    className={`border-b border-white block pb-4 ${
                      pathname === "/profile" ? "text-purpur" : ""
                    }`}
                  >
                    Profile
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
