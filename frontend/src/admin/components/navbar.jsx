import React from "react";
import { IoIosMail, IoIosNotificationsOutline } from "react-icons/io";


const Navbar = () => {
  return (
    <nav className="w-full h-16 bg-gray-800 flex items-center  shadow-md">
       
      <div className="flex flex-1  justify-right items-center gap-2 ">
        <input
          type="text"
          placeholder="Search..."
          className="w-92 p-1 pl-4 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-4 p-1 h-10px bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition">
          Search
        </button>
      </div>

      
      <div className="flex items-center gap-5 text-white text-2xl mr-8">
        <a href="/admin/adminpanel/mail" className="hover:text-gray-400 transition">
          <IoIosMail />
        </a>
        <a href="/admin/adminpanel/notification" className="hover:text-gray-400 transition">
          <IoIosNotificationsOutline />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
