import React from "react";
import { FaTachometerAlt, FaBoxOpen, FaUsers, FaClipboardList, FaPlusSquare } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-50 h-screen bg-gray-800 text-white flex flex-col p-6 shadow-lg">
     

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">
        <a href="/admin/adminpanel/dashboard" className="flex items-center gap-3  rounded-lg hover:bg-gray-700">
          <FaTachometerAlt /> Dashboard
        </a>
        <a href="/admin/adminpanel/products" className="flex items-center gap-3 rounded-lg hover:bg-gray-700">
          <FaBoxOpen /> Products
        </a>
        <a href="/admin/adminpanel/customers" className="flex items-center gap-3  rounded-lg hover:bg-gray-700">
          <FaUsers /> Customers
        </a>
        <a href="/admin/adminpanel/orders" className="flex items-center gap-3  rounded-lg hover:bg-gray-700">
          <FaClipboardList /> Orders
        </a>
        <a href="/admin/adminpanel/add-product" className="flex items-center gap-3  rounded-lg hover:bg-gray-700">
          <FaPlusSquare /> Add Product
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
