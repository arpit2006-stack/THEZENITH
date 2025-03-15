import { useEffect, useState } from "react";
import axios from "../../lib/axios.jsx";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:5002/getproducts")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div >
      
      {/* Product List */}
      <ul className="  rounded">
        {currentProducts.map((product) => (
          <li key={product._id} className=" hover:scale-101 p-2 shadow-md flex items-center gap-4">
            <img src={product.image} alt={product.productName} className="w-16 h-16 object-cover" />
            <div>
              <strong>{product.productName}</strong> - ${product.price} ({product.category})
              <p className="text-gray-600">{product.description}</p>
            </div>
          </li>
        ))}
      </ul>
      
      <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2   p-2 rounded shadow-lg">
      <button
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 1}
      className="bg-gray-300 px-3 py-1 rounded mr-2 disabled:opacity-50"
      >
      Prev
      </button>
      <span>Page {currentPage}</span>
      <button
      onClick={() => setCurrentPage(currentPage + 1)}
      className="bg-gray-300 px-3 py-1 rounded ml-2 disabled:opacity-50"
      >
      Next
      </button>
      </div>

    </div>
  );
};

export default Products;
