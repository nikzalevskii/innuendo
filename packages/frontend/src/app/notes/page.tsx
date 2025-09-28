"use client";

import { useState, useEffect } from "react";
import { Note, CreateNoteDto, createMockNote } from "@innuendo/shared";
import { NoteList } from "@/components/notes/NoteList";
import { CreateNoteForm } from "@/components/notes/CreateNoteForm";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mockNotes: Note[] = [
      createMockNote("1", "Первая заметка", "Содержание первой заметки"),
      createMockNote("2", "Вторая заметка", "Содержание второй заметки"),
    ];

    setTimeout(() => {
      setNotes(mockNotes);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleCreateNote = async (data: CreateNoteDto) => {
    const newNote = createMockNote(
      Date.now().toString(),
      data.title,
      data.content
    );
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleEditNote = (id: string) => console.log("Edit:", id);
  const handleDeleteNote = (id: string) =>
    setNotes((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Мои заметки</h1>
      <CreateNoteForm onSubmit={handleCreateNote} />
      <NoteList
        notes={notes}
        isLoading={isLoading}
        onEditNote={handleEditNote}
        onDeleteNote={handleDeleteNote}
      />
    </div>
  );
}
