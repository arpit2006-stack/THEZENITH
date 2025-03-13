import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./navigation/admin.navigation";
import UserLayout from "./navigation/user.navigation";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserLayout/>} />
          <Route path="/admin/*" element={<AdminLayout/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
