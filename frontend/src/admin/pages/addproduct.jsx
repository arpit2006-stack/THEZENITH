import { useState } from "react";
import axios from "../../lib/axios.jsx";

const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const defaultImage = "https://via.placeholder.com/180x180?text=No+Image";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });

    // Preview Image
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("price", product.price);
    formData.append("Quantity", product.Quantity);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("image", product.image);

    try {
      const response = await axios.post("/api/admin/addProducts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product");
    }
  };

  return (
    <div className="bg-transparent p-2 ">
      <h2 className="text-4xl font-bold text-gray-800 mb-7 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4 flex">
        <div className="w-180 h-48 mr-2 object-cover rounded-lg mt-2">
          {/* Image Preview */}
          <img
            src={preview || defaultImage}
            alt="Preview"
            className="w-full h-60 object-cover mb-10 rounded-lg"
          />

          {/* File Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-3 w-full p-2 border border-gray-300 rounded-lg cursor-pointer"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-3 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Product
          </button>
        </div>

        <div className="mt-0">
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={product.productName}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          <div>
            {/* Price */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            min="0"
            className="mt-2 w-1/2 p-3  border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Quantity */}
          <input
            type="number"
            name="Quantity"
            placeholder="Quantity"
            value={product.Quantity}
            onChange={handleChange}
            min="0"
            className="mt-2 w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />


          </div>
          
          {/* Category Dropdown */}
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            <option value="tshirt">Tshirt</option>
            <option value="shirt">Shirt</option>
            <option value="hoodies">Hoodies</option>
            <option value="watches">Watches</option>
            <option value="shoes">Shoes</option>
          </select>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className="mt-2 w-full p-3 border h-55 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;