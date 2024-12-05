"use client"
import React from 'react'
import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../../firebase'
import { signOut as nextAuthSignOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdDashboard } from "react-icons/md";
import { MdCoPresent } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoPeopleSharp } from "react-icons/io5";
import { SiFramework } from "react-icons/si";
import { GrUserManager } from "react-icons/gr";
import { RiHomeOfficeFill } from "react-icons/ri";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaFileSignature } from "react-icons/fa";

import axios from 'axios';

const Sidebar = ({ setMenuOpen }) => {
const pathname=usePathname()

  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      await firebaseSignOut(auth);
  
      // Sign out from NextAuth
      await nextAuthSignOut({ callbackUrl: '/login' });
        // Clear any additional local storage or session state if necessary
    localStorage.clear();
    sessionStorage.clear();
    await axios.post('/api/clearDataProvider/cleardata')
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: <MdDashboard /> },
    { href: "/attendance", label: "Attendance", icon:<MdCoPresent /> },
    { href: "/transactions", label: "Transactions", icon:<GrTransaction /> },
    { href: "/employees", label: "Employees", icon:<IoPeopleSharp /> },
    { href: "/works", label: "Works", icon:<SiFramework /> },
    { href: "/reportpage", label: "Reports",icon:<FaFileSignature /> },
    { href: "/designations", label: "Designations", icon:<GrUserManager /> },
    { href: "/sectionoffices", label: "Section Offices", icon:<RiHomeOfficeFill /> },
  ];
  const closeMenu = () => 
    { if (setMenuOpen) {
      setMenuOpen(false);
    }};
  return (
    <div className="bg-ksebgrey shadow-xl ml-2 mt-1">
    <ul className="flex flex-col justify-center items-start gap-4 ">
      {links.map((link) => (
        <Link 
          key={link.href}
          href={link.href}
          className={` text-black p-2 w-full text-left rounded-md ${
            pathname === link.href
              ? "bg-ksebgreen text-white"
              : "hover:bg-kseblightgreen hover:text-ksebgreen"
          }`}
          onClick={closeMenu} 
        >
          <div className='flex items-center gap-3'>
          <div>{link.icon}</div>
          <div>{link.label}</div>
          </div>
          
          
        </Link>
      ))}
      <button
        onClick={handleLogout}
        className="p-2 w-full text-left text-black rounded-md hover:bg-red-100 hover:text-red-600"
      >
        <div className='flex items-center gap-3'>
        <RiLogoutBoxFill/> Logout 
          </div>
       
      </button>
    </ul>
  </div>
);
}

export default Sidebar