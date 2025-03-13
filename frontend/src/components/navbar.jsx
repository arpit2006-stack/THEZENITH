import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { TiShoppingCart } from "react-icons/ti";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem("auth") === "true";
    setIsAuthenticated(loggedIn);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    window.location.reload(); // Ensure UI updates
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <>
      <nav className="bg-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="w-30 h-10">
              <a href="/">
                <img src={logo} alt="logo" />
              </a>
            </div>

            <form onSubmit={handleSearch} className="hidden sm:flex items-center space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products"
                className="p-1 border border-gray-300 w-xl text-center focus:outline-none rounded hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"
              />
              <button type="submit" className="bg-black text-white p-1 rounded w-20 h-9 hover:bg-gray-500">
                Search
              </button>
            </form>

            <div className="hidden sm:flex space-x-4">
              <div className="hidden sm:flex items-center space-x-6">
                {!isAuthenticated ? (
                  <a href="/signup" className="text-gray-400 hover:text-gray-900">
                    LOGIN/SIGNUP
                  </a>
                ) : (
                  <button onClick={handleLogout} className="text-gray-400 hover:text-gray-900">
                    LOGOUT
                  </button>
                )}
                <a href="/cart" className="text-gray-400 hover:text-gray-900 text-2xl">
                  <TiShoppingCart />
                </a>

                <a href="/profile" className="flex items-center gap-2 text-gray-600 hover:text-black">
                  <span className="flex items-center justify-center w-10 h-10 bg-black text-white font-semibold rounded-full">
                    AD
                  </span>
                </a>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="sm:hidden text-gray-900"
              >
                {isMenuOpen ? "Close" : "Menu"}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="sm:hidden bg-white p-4">
              <a href="/" className="block text-gray-700 hover:text-gray-900 py-2">
                Home
              </a>
              <a href="/cart" className="block text-gray-700 hover:text-gray-900 py-2">
                Cart
              </a>
              <a href="/admin" className="block text-gray-700 hover:text-gray-900 py-2">
                Admin
              </a>
              <a href="/contact" className="block text-gray-700 hover:text-gray-900 py-2">
                Contact
              </a>
            </div>
          )}
        </div>
      </nav>

      <div className="bg-gray-50 py-2 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-center space-x-4">
          <a href="/shirts" className="bg-gray-50 px-17 py-1 rounded hover:bg-gray-200">
            Shirt
          </a>
          <a href="/t-shirt" className="bg-gray-50 px-17 py-1 rounded hover:bg-gray-200">
            T-Shirt
          </a>
          <a href="/hoodies" className="bg-gray-50 px-17 py-1 rounded hover:bg-gray-200">
            Hoodies
          </a>
          <a href="/watches" className="bg-gray-50 px-17 py-1 rounded hover:bg-gray-200">
            Watches
          </a>
          <a href="/shoes" className="bg-gray-50 px-17 py-1 rounded hover:bg-gray-200">
            Shoes
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
