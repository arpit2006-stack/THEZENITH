import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/user/login", { email, password });

      alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "An error occurred.");
    }
    // setMessage("Login successful!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Login Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition font-semibold"
      >
        Log In
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-sm w-full border border-gray-200 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>

            <h2 className="text-3xl font-bold text-center text-gray-800">Log In</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-sm"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-sm"
                required
              />
              <p>
                Don't have an account?{" "}
                <a href="/" className="text-blue-300">
                  SIGNUP
                </a>
              </p>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-6 mt-4 rounded-lg hover:opacity-90 transition font-semibold text-lg shadow-md"
              >
                Log In
              </button>
            </form>
            {message && (
              <p className="mt-4 text-center text-green-600 font-semibold">
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
