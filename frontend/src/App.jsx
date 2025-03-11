import { BrowserRouter, Routes, Route } from "react-router-dom";

import  { AuthForm } from "./pages/signup.jsx";

import { AddProduct } from "./pages/addproduct.jsx";
import Home from "./pages/home.jsx";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";


function App() {
  return (
    <>
      <BrowserRouter>

        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<AuthForm />} />
          <Route path="/admin" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  );
}

export default App;
