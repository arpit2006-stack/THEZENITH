import React from 'react'
import { FaCheck } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
const succespopup = ({ onClose })=> {
  return (
<div className="fixed inset-0 flex items-center justify-center  bg-opacity-30 backdrop-blur-[3px]">
  <div className="bg-white rounded shadow-lg p-6 w-80 text-center flex flex-col items-center">
    <div className="w-12 h-12 bg-green-500 flex items-center justify-center rounded-full text-white text-2xl mb-4">
      <FaCheck />
    </div>
    <h2 className="text-4xl font-bold text-gray-800">Welcome!</h2>
    <p className="text-gray-600 text-sm text-bold mt-4">ZENITH STORE</p>
    <p className="text-gray-600 text-sm mt-4">You have logged in successfully!</p>
    <button className="mt-6 bg-green-500 text-white text-sm py-2 px-6 rounded-lg hover:bg-green-600 flex items-center gap-2" onClick={onClose}>
      <FaArrowRight /> Admin Dashboard
    </button>
  </div>
</div>

  )
}

export default succespopup;
