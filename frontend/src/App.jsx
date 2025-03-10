import { BrowserRouter, Routes, Route } from "react-router-dom";

import  { AuthForm } from "./pages/signup.jsx";
import { Home } from "./pages/home.jsx";
import { ProductForm } from "./pages/addproduct.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<AuthForm />} />
          <Route path="/admin" element={<ProductForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
