import React, { useState, useEffect } from "react";
import AddNoteForm from "./components/AddNoteForm";
import NoteGrid from "./components/NoteGrid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import db from "./firebase";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  console.log();

  // Fetch notes from Firestore on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesCollection = collection(db, "notes");
        const snapshot = await getDocs(notesCollection);
        const fetchedNotes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort notes by created date and updated date
        fetchedNotes.sort((a, b) => {
          const aDate = a.updatedAt?.toDate() || a.createdAt?.toDate();
          const bDate = b.updatedAt?.toDate() || b.createdAt?.toDate();
          return bDate - aDate;
        });

        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
        // Handle error
      }
    };

    fetchNotes();
  }, []);

  const addNote = async (newNote) => {
    try {
      const notesCollection = db.collection("notes");
      const docRef = await addDoc(notesCollection, newNote);

      // Unshift the new note to the beginning of the array
      setNotes((prevNotes) => [{ id: docRef.id, ...newNote }, ...prevNotes]);

      setAddFormVisible(false);
    } catch (error) {
      console.error("Error adding note:", error);
      // Handle error
    }
  };

  const editNote = async (editedNote) => {
    try {
      const notesCollection = collection(db, "notes");
      await updateDoc(doc(notesCollection, editedNote.id), editedNote);
      const updatedNotes = notes.map((note) =>
        note.id === editedNote.id ? editedNote : note
      );
      setNotes(updatedNotes);
      setAddFormVisible(false);
    } catch (error) {
      console.error("Error updating note:", error);
      // Handle error
    }
  };

  const deleteNote = async (noteId) => {
    console.log("Deleting note with id:", noteId);
    try {
      const notesCollection = collection(db, "notes");
      const noteRef = doc(notesCollection, noteId);
      console.log("Document path:", noteRef.path);
      await deleteDoc(noteRef);
      console.log("Note deleted successfully!");

      // Update the state to remove the deleted note
      const updatedNotes = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Error deleting note. Please try again.", error);
    }
  };

  const togglePin = async (noteId) => {
    try {
      const notesCollection = collection(db, "notes");
      const noteRef = doc(notesCollection, noteId);

      const noteDoc = await getDoc(noteRef);
      if (noteDoc.exists()) {
        const currentPinnedStatus = noteDoc.data().pinned || false;

        // Update the pinned status in Firestore
        await updateDoc(noteRef, {
          pinned: !currentPinnedStatus,
        });

        // Update the state to reflect the updated pinned status
        const updatedNotes = notes.map((note) =>
          note.id === noteId ? { ...note, pinned: !currentPinnedStatus } : note
        );

        setNotes(updatedNotes);
      }
    } catch (error) {
      console.error("Error toggling pin:", error);
      // Handle error
    }
  };

  const openAddForm = (note = null) => {
    setSelectedNote(note);
    setAddFormVisible(true);
  };

  const closeAddForm = () => {
    setSelectedNote(null);
    setAddFormVisible(false);
  };

  return (
    <div className="p-5 min-h-screen mx-auto bg-gradient-to-r from-gray-800 to-zinc-900">
      <div className="h-full container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-white font-bold mb-4 lg:mb-0 text-center lg:text-left">
            NoteKeeper App
          </h1>
          <button
            onClick={() => openAddForm()}
            className="flex items-center bg-transparent border border-white text-white px-4 lg:px-6 py-2 lg:py-3 rounded-md mb-4 lg:mb-0 hover:bg-blue-600 hover:border-blue-600 focus:outline-none transition-all"
          >
            {/* Placeholder for Icon */}
            <span className="mr-2">📝</span>
            Add New Note
          </button>
        </div>
        {isAddFormVisible && (
          <AddNoteForm
            addNote={addNote}
            selectedNote={selectedNote}
            onCloseForm={closeAddForm}
          />
        )}
        <div className="p-0 lg:p-10">
          <NoteGrid
            notes={notes}
            editNote={editNote}
            deleteNote={deleteNote}
            togglePin={togglePin}
            openAddForm={openAddForm}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
