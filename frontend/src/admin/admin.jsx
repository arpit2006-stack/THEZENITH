import React from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

import Dashboard from "../admin/pages/dashboard";
import Customer from "../admin/pages/costomer"; 
import Orders from "../admin/pages/orders";
import Product from "../admin/pages/products";
import AddProducts from "../admin/pages/addproduct";

const AdminPanel = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-5 w-full h-full bg-gray-200">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Product />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/addproduct" element={<AddProducts />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
