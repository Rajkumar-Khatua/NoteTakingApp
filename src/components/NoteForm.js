// NoteForm.js
import React, { useState } from "react";

const NoteForm = ({ onSubmit }) => {
  const [newNote, setNewNote] = useState({ title: "", body: "", tagline: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newNote);
    setNewNote({ title: "", body: "", tagline: "" });
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Title:</label>
        <input
          className="border rounded w-full p-2"
          type="text"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Tagline:</label>
        <input
          className="border rounded w-full p-2"
          type="text"
          value={newNote.tagline}
          onChange={(e) => setNewNote({ ...newNote, tagline: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Body:</label>
        <textarea
          className="border rounded w-full p-2"
          value={newNote.body}
          onChange={(e) => setNewNote({ ...newNote, body: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;
