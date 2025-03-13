import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLogin from "../pages/adminlogin";
import AdminPanel from "../admin/admin";

function AdminLayout() {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="/adminpanel" element={<AdminPanel />} />
    </Routes>
  );
}

export default AdminLayout;
