import { useEffect, useState } from "react";
import axios from "../../lib/axios.jsx";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:5002/allUsers") 
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  return (
    <div>
      {/* Customer List */}
      <ul className="rounded">
        {currentCustomers.map((customer) => (
          <li key={customer._id} className="hover:scale-101 p-4 shadow-md flex items-center gap-4">
            <img src={customer.image} className="w-16 h-16 object-cover" />
            <div>
              <strong>{customer.fullName}</strong> - {customer.email}
              <p className="text-gray-600">{customer.address}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 p-2 rounded shadow-lg bg-white">
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
          disabled={indexOfLastCustomer >= customers.length}
          className="bg-gray-300 px-3 py-1 rounded ml-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Customers;
