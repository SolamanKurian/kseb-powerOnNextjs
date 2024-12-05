'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar component
import { GiHamburgerMenu } from "react-icons/gi"


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

 

  return (
    <nav className="bg-ksebgreen text-white px-4 py-3 shadow-md">
      <div className="flex justify-between items-center">
        {/* Menu Button (Small Screens) */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-ksebgreenonhover mr-2"
        >
        <GiHamburgerMenu size={24}/>
        </button>

        {/* Logo */}
        <div className="text-2xl font-bold flex-grow">Logo</div>
        <div className="hidden md:block text-2xl font-bold flex-grow">KSEB Contractor</div>
        <div className=" items-center my-auto md:w-1/2">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-ksebgreen focus:border-transparent transition-all"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Sidebar Modal */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-start mt-16">
          <div className="w-4/12 bg-ksebgrey h-full shadow-xl">
            <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen}  />
          </div>
          {/* Close Button */}
        
        </div>
      )}
    </nav>
  );
};

export default Navbar;
