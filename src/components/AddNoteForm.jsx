import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import db from "../firebase.js";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

const colorOptions = [
  "#FFD700",
  "#87CEEB",
  "#98FB98",
  "#FFA07A",
  "#DDA0DD",
  "#F0E68C",
];
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const AddNoteForm = ({ addNote, selectedNote, onCloseForm }) => {
  const [newNote, setNewNote] = useState({
    title: "",
    tagline: "",
    body: "",
    color: colorOptions[0], // Default color
    pinned: false,
    createdAt: null,
    updatedAt: null,
  });
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const [validationError, setValidationError] = useState({
    title: "",
    body: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedNote) {
      setNewNote(selectedNote);
    }
  }, [selectedNote]);

  const handleChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  const handleColorChange = (color) => {
    setNewNote({ ...newNote, color });
    // Set background color of the from
    const formElement = document.getElementById("newNoteForm");
    if (formElement) {
      formElement.style.backgroundColor = color;
    }
  };

  const handleSubmit = async () => {
    // Validate input
    if (!newNote.title.trim()) {
      setValidationError({
        title: "Title is required",
        body: validationError.body,
      });
      return;
    }

    if (!newNote.body.trim()) {
      setValidationError({
        title: validationError.title,
        body: "Body is required",
      });
      return;
    }

    // Reset validation errors
    setValidationError({ title: "", body: "" });

    try {
      // Set loading state to true
      setLoading(true);

      // Add or update note using Firestore
      const notesCollection = collection(db, "notes");
      if (selectedNote) {
        const noteRef = doc(notesCollection, selectedNote.id);
        await updateDoc(noteRef, {
          ...newNote,
          updatedAt: serverTimestamp(),
        });
        toast.success("Note updated successfully!");
      } else {
        // Omitting the document ID here to let Firestore generate it
        const docRef = await addDoc(notesCollection, {
          ...newNote,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        toast.success("Note added successfully!");

        // If you need the document ID for any reason, you can get it from docRef.id
        console.log("Added document with ID: ", docRef.id);
      }

      // Reset form
      setNewNote({
        title: "",
        tagline: "",
        body: "",
        color: colorOptions[0],
        pinned: false,
        createdAt: null,
        updatedAt: null,
      });

      onCloseForm();
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      // Set loading state back to false
      setLoading(false);
    }
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
    >
      <div className="rounded-md shadow-md z-50 w-full md:w-[400px] lg:w-[500px]">
        <div
          className={`backdrop-blur-sm p-6 rounded-md shadow-md z-50 w-full ${
            isSmallScreen ? "h-screen" : ""
          }`}
          style={{ backgroundColor: newNote.color }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-black">
            {selectedNote ? "Edit Note" : "Add a New Note"}
          </h2>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              value={newNote.title}
              placeholder="Title"
              onChange={handleChange}
              className={`w-full px-3 py-2   focus:outline-none bg-transparent placeholder-gray-700 text-black font-bold text-xl ${
                isSmallScreen ? "text-lg" : ""
              }`}
            />
            {validationError.title && (
              <p className="text-red-500 text-sm mt-1">
                {validationError.title}
              </p>
            )}
          </div>
          <div className="mb-4">
            <textarea
              name="tagline"
              value={newNote.tagline}
              placeholder="Tagline"
              onChange={handleChange}
              className="w-full px-3 py-2  placeholder-gray-700 focus:outline-none bg-transparent"
            ></textarea>
          </div>
          <div className="mb-4">
            <textarea
              name="body"
              value={newNote.body}
              onChange={handleChange}
              placeholder="Body..."
              className={`w-full px-3 py-2  placeholder-gray-700 focus:outline-none bg-transparent ${
                isSmallScreen ? "h-64" : "h-32"
              } scrollbar-hide`}
            ></textarea>
            {validationError.body && (
              <p className="text-red-500 text-sm mt-1">
                {validationError.body}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-black">
              Choose Color:
            </label>
            <div className="flex space-x-2">
              {colorOptions.map((color, index) => (
                <button
                  key={index}
                  onClick={() => handleColorChange(color)}
                  className="w-8 h-8 rounded-full cursor-pointer focus:outline-none shadow-lg"
                  style={{ backgroundColor: color }}
                ></button>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2 focus:outline-none ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <RingLoader
                  color="#ffffff"
                  loading={loading}
                  css={override}
                  size={18}
                />
              ) : selectedNote ? (
                "Update Note"
              ) : (
                "Add Note"
              )}
            </button>

            <button
              onClick={onCloseForm}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNoteForm;
