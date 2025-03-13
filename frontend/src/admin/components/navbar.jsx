import React from "react";
import { IoIosMail, IoIosNotificationsOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="w-full h-16 bg-gray-800 flex items-center px-6 shadow-md">
      {/* Brand Logo */}
      <div className="text-white text-xl font-bold flex-1">
        <a href="/">ZENITH</a>
      </div>

      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 pl-4 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4 text-white text-2xl ml-6">
        <a href="/admin/adminpanel/mail" className="hover:text-blue-400 transition">
          <IoIosMail />
        </a>
        <a href="/admin/adminpanel/notification" className="hover:text-blue-400 transition">
          <IoIosNotificationsOutline />
        </a>
        <a href="/admin/adminpanel/profile" className="hover:text-blue-400 transition">
          <FaUserCircle />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
