import { useState } from "react";
import axios from "../lib/axios.jsx";

const ProductDetails = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/user/viewproduct",
        { productId },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setProduct(data.product);
      } else {
        setError(data.message || "Failed to fetch product");
      }
    } catch (err) {
      setError("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 flex">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : product ? (
          <>
            {/* Left Side - Product Image */}
            <div className="w-1/2">
              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Right Side - Product Details */}
            <div className="w-1/2 pl-6">
              <h2 className="text-2xl font-bold">{product.productName}</h2>
              <p className="text-lg text-gray-700">Price: ${product.price}</p>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-500">Category: {product.category}</p>

              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={fetchProduct}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Load Product
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
