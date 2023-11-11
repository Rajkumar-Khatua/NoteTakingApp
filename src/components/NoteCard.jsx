import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import EditNoteForm from "./EditNoteForm";
import CustomAlert from "./CustomAlert";
import { toast } from "react-toastify";
import { format } from "date-fns";
import "react-toastify/dist/ReactToastify.css";

const NoteCard = ({ note, deleteNote, togglePin, editNote }) => {
  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isDeleting, setDeleting] = useState(false); // Add loading state

  // Function to format the date using date-fns
  const formatDate = (date) => {
    if (date instanceof Date) {
      return format(date, "MMM dd, yyyy h:mm a"); // Shortened format
    } else if (date && date.toDate) {
      return format(date.toDate(), "MMM dd, yyyy h:mm a"); // Convert Firestore Timestamp to Date
    }
    return "Unknown Date";
  };

  const handleEditClick = () => {
    setEditFormVisible(true);
  };

  const closeEditForm = () => {
    setEditFormVisible(false);
  };

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  const isPinned = note.pinned || false;

  const handleDeleteNote = async (noteId) => {
    setAlertVisible(true); // Show the delete confirmation alert
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true); // Set loading state to true

      await deleteNote(note.id);
      toast.success("Note deleted successfully!");
      setAlertVisible(false); // Hide the alert after successful deletion
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setDeleting(false); // Reset loading state whether the deletion was successful or not
    }
  };

  console.log("isPinned:", isPinned);
  console.log("Class String:", `text-${isPinned ? "yellow-500" : "gray-500"}`);

  return (
    <div
      style={{ backgroundColor: note.color }}
      className="p-4 rounded-md shadow-md mb-4 min-h-[300px] flex flex-col justify-between relative"
    >
      {/* Pin Icon */}
      <PushPinIcon
        onClick={() => togglePin(note.id)}
        className={
          `absolute top-2 right-2 hover:cursor-pointer hover:underline focus:outline-none transition-colors duration-300 ` +
          (isPinned ? "text-yellow-500 animate-bounce" : "text-gray-500")
        }
      />

      <div>
        <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
        <p className="text-gray-600">{note.tagline}</p>
      </div>
      <div className="mt-2 overflow-hidden flex-grow break-words">
        <span
          className={`${showFullText ? "" : "max-h-24"} overflow-hidden block`}
        >
          {note.body}
        </span>
        {!showFullText && note.body.length > 100 && (
          <button
            onClick={toggleShowFullText}
            className="text-blue-500 hover:cursor-pointer hover:underline focus:outline-none"
          >
            Show More
          </button>
        )}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="text-gray-600 mt-2">
          {/* Conditionally render date and time based on screen size */}
          {window.innerWidth > 768 && (
            <>
              {note.updatedAt &&
              note.updatedAt.toDate &&
              note.createdAt &&
              note.updatedAt.toDate().getTime() !==
                note.createdAt.toDate().getTime() ? (
                <span>{`Last updated at: ${formatDate(note.updatedAt)}`}</span>
              ) : (
                <span>{`Created at: ${formatDate(note.createdAt)}`}</span>
              )}
            </>
          )}
        </div>
        <div>
          <EditIcon
            onClick={handleEditClick}
            className="text-blue-500 hover:cursor-pointer hover:underline focus:outline-none mr-2"
          />
          <DeleteIcon
            onClick={() => handleDeleteNote(note.id)}
            className="text-red-500 hover:cursor-pointer hover:underline focus:outline-none mr-2"
          />
        </div>
      </div>
      {isEditFormVisible && (
        <EditNoteForm
          note={note}
          editNote={editNote}
          onCloseForm={closeEditForm}
        />
      )}
      {isAlertVisible && (
        <CustomAlert
          message="Are you sure you want to delete this note?"
          onCancel={() => setAlertVisible(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default NoteCard;
