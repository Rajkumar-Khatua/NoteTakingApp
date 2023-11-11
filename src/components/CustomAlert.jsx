import React from "react";

const CustomAlert = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-40">
      <div className="bg-white p-4 md:p-8 rounded-md shadow-md w-full md:w-96">
        <p className="text-lg md:text-xl font-semibold mb-4">{message}</p>
        <div className="flex flex-col md:flex-row justify-end items-center">
          <button
            onClick={onCancel}
            className="mt-2 md:mt-0 mr-0 md:mr-4 text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="text-red-500 hover:text-red-700 font-semibold"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
