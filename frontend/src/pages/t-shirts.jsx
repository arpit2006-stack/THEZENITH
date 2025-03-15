import React, { useEffect, useState } from "react";
import axios from "../lib/axios.jsx";

const Tshirts = () => {
  const [tshirt, setTShirt] = useState([]);

  useEffect(() => {
    axios
      .get("/api/user/findtshirt")
      .then((response) => {
        console.log("API Response:", response.data);
        setTShirt(response.data.tshirts || []); // Ensure it’s an array
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []);

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
              <p className="text-gray-600">{item.price}</p>
              <div className="mt-4 flex justify-between">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  Add to Cart
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                  View Product
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No t-shirts found.</p>
        )}
      </div>
    </div>
  );
};

export default Tshirts;
