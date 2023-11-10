// NoteCard.js
import React, { useEffect, useState } from "react";

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const NoteCard = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);
  const [backgroundColor, setBackgroundColor] = useState(getRandomColor());

  useEffect(() => {
    // Generate and set a consistent background color when the component mounts
    setBackgroundColor(getRandomColor());
  }, []);

  const handleUpdate = () => {
    onUpdate(editedNote);
    setEditing(false);
  };

  return (
    <div className={`p-6 rounded shadow-md mb-4 h-full`} style={{ backgroundColor }}>
      {isEditing ? (
        <div>
          <input
            className="border rounded w-full mb-4 p-2"
            type="text"
            value={editedNote.title}
            onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
          />
          <textarea
            className="border rounded w-full mb-4 p-2 h-32"
            value={editedNote.body}
            onChange={(e) => setEditedNote({ ...editedNote, body: e.target.value })}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-4">{note.title}</h3>
          <p className="text-gray-700 h-32 overflow-y-auto">{note.body}</p>
          <div className="mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => onDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
