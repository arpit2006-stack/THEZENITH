import { useState, useEffect } from "react";
import axios from "../lib/axios.jsx";
import { useNavigate } from "react-router-dom";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("auth") === "true";
    setIsAuthenticated(loggedIn);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const url = isLogin ? "/api/user/login" : "/api/user/signup";
      const { data } = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage(data.message);
      if (isLogin) {
        localStorage.setItem("auth", "true");
        navigate("/")
        setIsAuthenticated(true);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {!isAuthenticated ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">
              {isLogin ? "Login" : "Sign Up"}
            </h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-2 mb-2 border rounded"
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded mt-2"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>
            {message && <p className="text-center text-red-500 mt-2">{message}</p>}
            <p className="text-center mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"} 
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-500 underline"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </>
        ) : (
          <div className="text-center">
            <p className="text-green-500 font-bold">You are logged in!</p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white p-2 rounded mt-4"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
