import { useEffect, useState } from "react";
import axios from "../../lib/axios.jsx";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
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

  // Filter products based on search input
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(search.toLowerCase())
  );

  // Sort products by price
  const sortedProducts = [...filteredProducts].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="p-2">
      
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      
      
      
      {/* Product List */}
      <ul className="border p-4 rounded">
        {currentProducts.map((product) => (
          <li key={product._id} className="p-2 border-b flex items-center gap-4">
            <img src={product.image} alt={product.productName} className="w-16 h-16 object-cover" />
            <div>
              <strong>{product.productName}</strong> - ${product.price} ({product.category})
              <p className="text-gray-600">{product.description}</p>
            </div>
          </li>
        ))}
      </ul>
      
      {/* Pagination */}
      <div className="mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 px-3 py-1 rounded mr-2"
        >
          Prev
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastProduct >= sortedProducts.length}
          className="bg-gray-300 px-3 py-1 rounded ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
