import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../lib/axios.jsx";

const UpdateProduct = () => {
  const { productID } = useParams();
  const navigate = useNavigate();

  const defaultProductState = {
    productName: "",
    price: "",
    description: "",
    category: "",
    image: "",
  };

  const [product, setProduct] = useState(defaultProductState);
  const [preview, setPreview] = useState(null);

  // ✅ Fetch existing product details
  useEffect(() => {
    if (!productID) return; // Agar productID undefined hai toh API call mat karo

    axios.get(`http://localhost:5002/api/admin/getProduct/${productID}`)
      .then((res) => {
        if (res.data) {
          setProduct(res.data);
          setPreview(res.data.image || null);
        } else {
          setProduct(defaultProductState);
        }
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [productID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProduct({ ...product, image: file });

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productID", productID);
    formData.append("productName", product.productName);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("image", product.image);

    try {
      const response = await axios.put("http://localhost:5002/api/admin/editProducts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center">
          <img src={preview || "https://via.placeholder.com/180x180"} alt="Preview" className="w-40 h-40 object-cover rounded-lg" />
          <input type="file" accept="image/*" onChange={handleFileChange} className="mt-3 w-full p-2 border rounded-lg cursor-pointer" />
        </div>
        <input type="text" name="productName" value={product.productName} onChange={handleChange} placeholder="Product Name" className="w-full p-3 border rounded-lg" required />
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" className="w-full p-3 border rounded-lg" required />
        <select name="category" value={product.category} onChange={handleChange} className="w-full p-3 border rounded-lg" required>
          <option value="">Select Category</option>
          <option value="tshirt">T-shirt</option>
          <option value="shirt">Shirt</option>
          <option value="hoodies">Hoodies</option>
          <option value="watches">Watches</option>
          <option value="shoes">Shoes</option>
        </select>
        <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" className="w-full p-3 border rounded-lg h-24" required></textarea>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
