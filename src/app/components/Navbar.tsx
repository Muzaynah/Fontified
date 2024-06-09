"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define the props for NavItem, including children
interface NavItemProps {
  path: string;
  currentPath: string;
  isLoginSignup?: boolean;
  children: React.ReactNode; // Add children to the interface
}

const NavItem: React.FC<NavItemProps> = ({
  path,
  currentPath,
  children,
  isLoginSignup = false,
}) => {
  const isActive = isLoginSignup
    ? currentPath === "/login" || currentPath === "/signup"
    : path === currentPath;
  const activeClassName = isActive
    ? "bg-white text-black"
    : "hover:bg-white hover:text-black";

  return (
    <li
      className={`text-sm flex-row flex px-4 py-2 rounded-full border-2 ${activeClassName}`}
    >
      <Link href={path}>{children}</Link>
      {isLoginSignup && (
        <>
          {" "}
          /{" "}
          <Link href="/signup" className="hover:underline">
            Signup
          </Link>
        </>
      )}
    </li>
  );
};

// Define the props for Nav (even if empty, to keep the structure consistent)
interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(false); // Close menu on resize
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="relative">
      <div className="container mx-auto px-10 pt-8 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <Image
            src="/assets/fontified.png"
            alt="Logo"
            width={200}
            height={50}
          />
        </Link>
        <button
          className="block lg:hidden z-20"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
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
        <ul className="hidden lg:flex space-x-2">
          <NavItem path="/fonts-library" currentPath={pathname}>
            Fonts Library
          </NavItem>
          <NavItem path="/handwriting-board" currentPath={pathname}>
            Writing Board
          </NavItem>
          <NavItem path="/document-editor" currentPath={pathname}>
            Text Editor
          </NavItem>
          {session?.user ? (
            <NavItem path="/UserDashboard" currentPath={pathname}>
              {session.user.name}
            </NavItem>
          ) : (
            <NavItem path="/login" currentPath={pathname} isLoginSignup={true}>
              <div className="hover:underline">Login</div>
            </NavItem>
          )}
        </ul>
        {isMenuOpen && (
          <div className="lg:hidden w-64 fixed top-0 right-0 h-full bg-black text-white transition-transform transform -translate-x-0 ease-in-out z-10">
            <div className="relative px-10 mt-24 text-right justify-right items-right">
              <ul className="pl-0">
                <li className="text-md pt-4 px-2 hover:text-purpur">
                  <Link href="/fonts-library">
                    <span
                      className={`border-b border-white block pb-4 ${
                        pathname === "/fonts-library" ? "text-purpur" : ""
                      }`}
                    >
                      Fonts Library
                    </span>
                  </Link>
                </li>
                <li className="text-md pt-4 px-2 hover:text-purpur">
                  <Link href="/handwriting-board">
                    <span
                      className={`border-b border-white block pb-4 ${
                        pathname === "/handwriting-board" ? "text-purpur" : ""
                      }`}
                    >
                      Writing Board
                    </span>
                  </Link>
                </li>
                <li className="text-md pt-4 px-2 hover:text-purpur">
                  <Link href="/document-editor">
                    <span
                      className={`border-b border-white block pb-4 ${
                        pathname === "/document-editor" ? "text-purpur" : ""
                      }`}
                    >
                      Text Editor
                    </span>
                  </Link>
                </li>
                {session?.user ? (
                  <li className="text-md pt-4 px-2 hover:text-purpur">
                    <Link href="/UserDashboard">
                      <span
                        className={`border-b border-white block pb-4 ${
                          pathname === "/UserDashboard" ? "text-purpur" : ""
                        }`}
                      >
                        {session.user.name}
                      </span>
                    </Link>
                  </li>
                ) : (
                  <li className="text-md pt-4 px-2 hover:text-purpur">
                    <Link href="/login">
                      <span
                        className={`border-b border-white block pb-4 ${
                          pathname === "/login" || pathname === "/signup"
                            ? "text-purpur"
                            : ""
                        }`}
                      >
                        Login / Signup
                      </span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
