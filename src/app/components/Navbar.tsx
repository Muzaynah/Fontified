// Nav.tsx
'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ProfileImg from '../components/profileimage';
import { useSession } from "next-auth/react";

interface NavProps {}

const Nav: React.FC<NavProps> = ({}) => {
  
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const shouldStackButtons = windowWidth < 700;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative">
      <div className="container mx-auto px-10 pt-8 flex justify-between items-center">
        <Link
        href="/"
        target="_blank"
        >
          <div className="text-xl font-bold">
              <Image src="/assets/fontified.png" alt="Logo" width={200} height={50} />
          </div>
        </Link>
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
            <li className="text-sm hover:bg-white hover:text-black px-4 py-2 rounded-full border-2">
              <a href="#" className="nav-link">
              {session?.user?.name}
              </a>
            </li>
            <li className="text-sm hover:bg-white hover:text-black px-4 py-2 rounded-full border-2">
              <a href="#" className="nav-link">
                Browse Fonts
              </a>
            </li>
            <li className="text-sm hover:bg-white hover:text-black px-4 py-2 rounded-full border-2">
              <a href="#" className="nav-link">
                Handwriting
              </a>
            </li>
            <li className="text-sm hover:bg-white hover:text-black px-4 py-2 rounded-full border-2">
              <a href="#" className="nav-link">
                Editor
              </a>
            </li>
            {!shouldStackButtons && <ProfileImg />}
          </ul>
        )}
      </div>
      {isMenuOpen && (
        <div className="lg:hidden w-64 fixed top-0 right-0 h-full bg-black text-white transition-transform transform -translate-x-0 ease-in-out z-10">
          <div className="relative px-10 mt-24 text-right justify-right items-right">
            <ul className="pl-0">
              <li className="text-md pt-4 px-2 hover:text-purpur">
                <span className="border-b border-white block pb-4">Browse Fonts</span>
              </li>
              <li className="text-md pt-4 px-2 hover:text-purpur">
                <span className="border-b border-white block pb-4">Handwriting</span>
              </li>
              <li className="text-md pt-4 px-2 hover:text-purpur">
                <span className="border-b border-white block pb-4">Editor</span>
              </li>
              <li className="text-md pt-4 px-2 hover:text-purpur">
                <span className="border-b border-white block pb-4">Profile</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
