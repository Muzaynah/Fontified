// Navbar.tsx
'use client'
import React from 'react';
import ProfileImg from './profileimage';

interface NavbarProps {
  toggleMenu: () => void;
  shouldStackButtons: boolean;
  isMenuOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleMenu, shouldStackButtons, isMenuOpen }) => {
  return (
    <nav className="relative">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold text-white">Fontified</div>
        {shouldStackButtons ? (
          <button className="block lg:hidden z-20" onClick={toggleMenu}>
            <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M4 6h16a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zm0 5h16a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2z" clipRule="evenodd" />
            </svg>
          </button>
        ) : (
          <ul className="flex space-x-2">
            <li className="text-sm hover:bg-white hover:text-black px-4 py-2 rounded-full border-2">
              <a href="#" className="nav-link">Browse Fonts</a>
            </li>
            <li className="text-sm hover:bg-white hover:text-black px-4 py-2 rounded-full border-2">
              <a href="#" className="nav-link">Handwriting</a>
            </li>
            <li className="text-sm hover:bg-white hover:text-black px-4 py-2 rounded-full border-2">
              <a href="#" className="nav-link">Editor</a>
            </li>
            {!shouldStackButtons && (
              <ProfileImg/>
            )}
          </ul>
        )}
      </div>
      {isMenuOpen && (
        <div className="lg:hidden w-64 fixed top-0 right-0 h-full bg-black text-white transition-transform transform -translate-x-0 ease-in-out z-10">
          <div className="relative px-10 pt-24 text-right justify-right items-right">
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

export default Navbar;
