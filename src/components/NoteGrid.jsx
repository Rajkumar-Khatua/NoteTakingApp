import React, { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import { RingLoader } from "react-spinners";

const NoteGrid = ({ notes, deleteNote, togglePin, editNote, openAddForm }) => {
  const notesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Sort notes array to bring pinned notes to the top
  const sortedNotes = [...notes].sort((a, b) =>
    b.pinned ? 1 : a.pinned ? -1 : 0
  );

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * notesPerPage;
  const endIndex = startIndex + notesPerPage;

  // Filter notes based on the current page
  const paginatedNotes = sortedNotes.slice(startIndex, endIndex);

  // Total number of pages
  const totalPages = Math.ceil(sortedNotes.length / notesPerPage);

  useEffect(() => {
    // Simulate loading by delaying for 2 seconds
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, [notes]); // Trigger loading when notes change

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RingLoader color="#36D7B7" size={80} />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                deleteNote={deleteNote}
                togglePin={togglePin}
                editNote={editNote}
                loading={loading}
              />
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-2 px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteGrid;
