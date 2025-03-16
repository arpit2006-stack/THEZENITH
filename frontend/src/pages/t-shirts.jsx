import React, { useEffect, useState } from "react";
import axios from "../lib/axios.jsx";

const Tshirts = () => {
  const [tshirt, setTShirt] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/user/findtshirt")
      .then((response) => {
        console.log("API Response:", response.data);
        setTShirt(response.data.tshirts || []); // Ensure it’s an array
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []);

  const handleViewProduct = async (productId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/user/viewproduct", { productId });
      setSelectedProduct(response.data.product);
    } catch (err) {
      setError("Failed to fetch product details.");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        T-Shirts Collection
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(tshirt) && tshirt.length > 0 ? (
          tshirt.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden p-4 text-center hover:shadow-xl transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-lg font-semibold">{item.productName}</h3>
              <p className="text-gray-600">${item.price}</p>
              <div className="mt-4 flex justify-between">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  Add to Cart
                </button>
                <button
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                  onClick={() => handleViewProduct(item._id)}
                >
                  View Product
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No t-shirts found.</p>
        )}
      </div>

      {/* Modal for Viewing Product Details */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 flex">
            <div className="w-1/2">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.productName}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="w-1/2 pl-6">
              <h2 className="text-2xl font-bold">{selectedProduct.productName}</h2>
              <p className="text-lg text-gray-700">Price: ${selectedProduct.price}</p>
              <p className="text-gray-600">{selectedProduct.description}</p>
              <p className="text-gray-500">Category: {selectedProduct.category}</p>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading/Error Messages */}
      {loading && <p className="text-center text-gray-500 mt-4">Loading product details...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Tshirts;
