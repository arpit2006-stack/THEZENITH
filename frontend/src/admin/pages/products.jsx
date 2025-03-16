import { useEffect, useState } from "react";
import axios from "../../lib/axios.jsx";
import { FcPrevious, FcNext } from "react-icons/fc";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5002/getproducts");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle Delete Product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
        await axios.delete("http://localhost:5002/deleteproduct", {
            data: { id } 
        });

        setProducts(products.filter((product) => product._id !== id)); // Update UI
    } catch (error) {
        console.error("Error deleting product:", error);
    }
};


  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div>
      <div className="p-1 shadow-md flex items-center text-gray-700 font-semibold gap-6">
        <div className="w-20 text-center">Image</div>
        <div className="w-32 text-center">Name</div>
        <div className="w-64 text-center">Description</div>
        <div className="w-28 text-center">Category</div>
        <div className="w-20 text-center">Quantity</div>
        <div className="w-20 text-center">Price</div>
        <div className="w-20 text-center">Edit</div>
        <div className="w-20 text-center">Delete</div>
      </div>

      {/* Product List */}
      <ul className="rounded mt-2">
        {currentProducts.map((product) => (
          <li key={product._id} className="hover:scale-101 p-1 mb-1 shadow-md flex items-center gap-7 bg-gray-200">
            <img src={product.image} alt={product.productName} className="w-16 h-16 object-cover" />
            <strong className="w-32 text-center">{product.productName}</strong>
            <p className="w-64 text-center text-gray-600 truncate">{product.description}</p>
            <p className="w-28 text-center">{product.category}</p>
            <p className="w-20 text-center">{product.Quantity}</p>
            <p className="w-20 text-center font-bold">${product.price}</p>
            <button className="w-20 flex items-center justify-center gap-1 text-gray-500 hover:text-gray-900">
              <FaRegEdit /> Edit
            </button>

            {/* Delete Button */}
            <button
              className="w-20 flex items-center justify-center gap-1 text-red-700 hover:text-red-900"
              onClick={() => handleDelete(product._id)}
            >
              <RiDeleteBin5Fill /> Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="fixed bottom-0 left-1/2 ml-20 transform -translate-x-1/2 rounded">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded mr-2 disabled:opacity-50"
        >
          <FcPrevious />
        </button>
        <span>... {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="rounded ml-2 disabled:opacity-50"
          disabled={currentPage * productsPerPage >= products.length}
        >
          <FcNext />
        </button>
      </div>
    </div>
  );
};

export default Products;
