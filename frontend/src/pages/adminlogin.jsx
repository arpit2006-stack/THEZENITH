import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import Succespopup from "../components/popups/succespopup";
import background from "../assets/adminbg.jpg";
import logo from "../assets/logo2.png";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/user/adminlogin", { email, password });

      // Agar login successful ho gaya, tabhi modal show karo
      setShowModal(true);
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  // Modal ke OK button pe call hone wala function
  const handleModalClose = () => {
    setShowModal(false);
    navigate("/admin/adminpanel"); // Redirect after modal close
  };

  return (
    <>
      <div
        className="flex items-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="ml-20 mt-10 p-6 rounded-lg shadow-2xl w-130">
          <h2 className="text-4xl font-bold mb-4"><img src={logo} className="h-15 w-50 ml-65" alt="" /></h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4 text-xl">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-2 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-2 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-sky-400 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && <Succespopup onClose={handleModalClose} />}
    </>
  );
};

export default AdminLogin;
