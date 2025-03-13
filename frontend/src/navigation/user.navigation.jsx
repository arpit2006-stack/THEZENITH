import React from 'react'
import { Routes, Route } from "react-router-dom";


import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

import Home from "../pages/home.jsx";

import  { AuthForm } from "../pages/signup.jsx";

const UserLayout = () => {
  return (
    <div>
      <Navbar/>
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/signup" element={<AuthForm />} />
        </Routes>
      <Footer/>
    </div>
  )
}

export default UserLayout; 








// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import  { AuthForm } from "../pages/signup.jsx";

// // import { AddProduct } from "./pages/addproduct.jsx";
// // import { AdminLogin } from "./pages/adminlogin.jsx";
// import Home from "../pages/home.jsx";
// import Navbar from "../components/navbar.jsx";
// import Footer from "../components/footer.jsx";


// function UserLayout() {
//   return (
//     <>
//       <BrowserRouter>
//         <Navbar/>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/signup" element={<AuthForm />} />
//           {/* <Route path="/admin" element={<AdminLogin />} />
//           <Route path="/admin/addProducts" element={<AddProduct/>} /> */}
//         </Routes>
//         <Footer/>
//       </BrowserRouter>
      
//     </>
//   );
// }

// export default UserLayout;




