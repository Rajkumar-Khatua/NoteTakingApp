// App.js
import React, { useState, useEffect } from "react";
import db from "./firebase"; // Import the firestore instance from your firebase file
import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import NoteCard from "./components/NoteCard";
import NoteForm from "./components/NoteForm";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6;

  useEffect(() => {
    // Fetch notes from Firebase or your backend
    // ...

    // For demo purposes, using dummy data
    // Dummy data with corrected unique IDs
    // Corrected dummy data with unique IDs
    setNotes([
      {
        id: "1",
        title: "Note 1",
        body: "This is the body of Note 1",
        tagline: "Tagline 1",
      },
      {
        id: "2",
        title: "Note 2",
        body: "This is the body of Note 2",
        tagline: "Tagline 2",
      },
      {
        id: "3",
        title: "Note 3",
        body: "This is the body of Note 3",
        tagline: "Tagline 3",
      },
      {
        id: "4",
        title: "Note 4",
        body: "This is the body of Note 4",
        tagline: "Tagline 4",
      },
      {
        id: "5",
        title: "Note 5",
        body: "This is the body of Note 5",
        tagline: "Tagline 5",
      },
      {
        id: "6",
        title: "Note 6",
        body: "This is the body of Note 6",
        tagline: "Tagline 6",
      },
      {
        id: "7",
        title: "Note 7",
        body: "This is the body of Note 7",
        tagline: "Tagline 7",
      },
      {
        id: "8",
        title: "Note 8",
        body: "This is the body of Note 8",
        tagline: "Tagline 8",
      },
    ]);
  }, []);

  const addNote = (newNote) => {
    // Add note logic (to Firebase or your backend)
    // ...

    setNotes([...notes, newNote]);
  };

  const updateNote = (updatedNote) => {
    // Update note logic (to Firebase or your backend)
    // ...

    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
  };

  const deleteNote = (noteId) => {
    // Delete note logic (to Firebase or your backend)
    // ...

    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Pagination logic
  // Pagination logic
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = (currentPage - 1) * notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);
  const totalPages = Math.ceil(notes.length / notesPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto mt-8 h-screen">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={toggleForm}
      >
        {showForm ? "Close Form" : "Add Note"}
      </button>

      {showForm && <NoteForm onSubmit={addNote} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {currentNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onUpdate={updateNote}
            onDelete={deleteNote}
          />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`mx-2 py-2 px-4 border ${
                currentPage === page ? "bg-blue-500 text-white" : ""
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default App;
