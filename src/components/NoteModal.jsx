import React, { useState } from 'react';

const NoteModal = ({ note, closeModal, handleEdit }) => {
  console.log('NoteModal rendered'); // Add this line

  const [editedNote, setEditedNote] = useState({ ...note });

  const handleChange = (e) => {
    setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    handleEdit(editedNote);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <label className="block mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={editedNote.title}
          onChange={handleChange}
          className="border w-full mb-2 p-1"
        />
        <label className="block mb-2">Tagline:</label>
        <textarea
          name="tagline"
          value={editedNote.tagline}
          onChange={handleChange}
          className="border w-full mb-2 p-1"
        ></textarea>
        <label className="block mb-2">Body:</label>
        <textarea
          name="body"
          value={editedNote.body}
          onChange={handleChange}
          className="border w-full mb-2 p-1"
        ></textarea>
        <button
          onClick={saveChanges}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
        <button
          onClick={closeModal}
          className="ml-2 px-2 py-1 rounded bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NoteModal;
