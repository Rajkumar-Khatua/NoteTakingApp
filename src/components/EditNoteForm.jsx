import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { serverTimestamp } from "firebase/firestore";

// Define color options
const colorOptions = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F4D03F",
  "#D0D3D4",
  "#5B2C6F",
  "#17202A",
  "#F1948A",
  "#48C9B0",
  "#F39C12",
];

const EditNoteForm = ({ note, editNote, onCloseForm }) => {
  // State for the edited note
  const [editedNote, setEditedNote] = useState({ ...note });
  // Manually manage isSmallScreen based on window.innerWidth
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  // Handle changes in the form inputs
  const handleChange = (e) => {
    setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
  };

  // Handle color selection
  const handleColorChange = (color) => {
    setEditedNote({ ...editedNote, color });
    // Set background color of the form
    const formElement = document.getElementById("editNoteForm");
    if (formElement) {
      formElement.style.backgroundColor = color;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const updatedNote = {
        ...editedNote,
        updatedAt: serverTimestamp(), // Import this from Firebase
      };

      await editNote(updatedNote);
      onCloseForm();
      toast.success("Note updated successfully!");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Error updating note. Please try again.");
    }
  };

  // Close the form
  const handleCloseForm = () => {
    onCloseForm();
  };

  // Update isSmallScreen on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full rounded-lg ${
        isSmallScreen ? "100vh" : "md:w-[500px] lg:w-[600px]"
      }`}
      style={{ backgroundColor: editedNote.color }}
    >
      {/* Form */}
      <div
        className={`backdrop-blur-sm p-6 rounded-md shadow-md z-50 w-full ${
          isSmallScreen ? "h-screen" : ""
        }`}
      >
        {/* Title input */}
        <div className="mb-4">
          <input
            type="text"
            id="title"
            name="title"
            value={editedNote.title}
            onChange={handleChange}
            className={`w-full px-3 py-2   focus:outline-none bg-transparent placeholder-gray-700 text-black font-bold text-xl ${
              isSmallScreen ? "text-lg" : ""
            }`}
            placeholder="Title"
            aria-label="Edit Title"
          />
        </div>
        {/* Tagline input */}
        <div className="mb-4">
          <textarea
            id="tagline"
            name="tagline"
            value={editedNote.tagline}
            onChange={handleChange}
            className="w-full px-3 py-2  placeholder-gray-700 focus:outline-none bg-transparent"
            placeholder="Tagline"
            aria-label="Edit Tagline"
          ></textarea>
        </div>
        {/* Body input */}
        <div className="mb-4">
          <textarea
            id="body"
            name="body"
            value={editedNote.body}
            onChange={handleChange}
            className={`w-full px-3 py-2 placeholder-gray-700 focus:outline-none bg-transparent ${
              isSmallScreen ? "h-64" : "h-32"
            } overflow-y-scroll overflow-x-hidden`}
            style={{ scrollbarWidth: "thin" }}
            placeholder="Body"
            aria-label="Edit Body"
          ></textarea>
        </div>
        {/* Color selection */}
        <div className="mb-4">
          <div className="flex space-x-2">
            {colorOptions.map((color, index) => (
              <button
                key={index}
                onClick={() => handleColorChange(color)}
                className={`w-8 h-8 rounded-full cursor-pointer focus:outline-none shadow-lg ${
                  editedNote.color === color ? "border-2 border-blue-500" : ""
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select ${color} color`}
              ></button>
            ))}
          </div>
        </div>
        {/* Action buttons */}
        <div className="flex justify-end">
          {/* Submit button */}
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2 focus:outline-none"
          >
            Update Note
          </button>
          {/* Close button */}
          <button
            onClick={handleCloseForm}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNoteForm;
