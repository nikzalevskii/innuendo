"use client";

import { useEffect } from "react";
import { CreateNoteDto } from "@innuendo/shared";
import { NoteList } from "@/components/notes/NoteList";
import { CreateNoteForm } from "@/components/notes/CreateNoteForm";
import { useNotes } from "@/hooks/useNotes";
import { useApiHealth } from "@/hooks/useApiHealth";
import { da } from "zod/locales";
import { ErrorAlert } from "@/components/ui/ErrorAlert";

export default function NotesPage() {
  const {
    notes,
    isLoading,
    error,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
  } = useNotes();

  const { isHealthy } = useApiHealth();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleCreateNote = async (data: CreateNoteDto) => {
    await createNote(data);
  };

  const handleEditNote = (id: string) => {
    // Логика открытия модального окна редактирования
    console.log("Edit:", id);
  };

  const handleDeleteNote = async (id: string) => {
    await deleteNote(id);
  };

  if (isHealthy === false) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>API сервер недоступен. Пожалуйста, проверьте подключение.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Мои заметки</h1>

      {error && <ErrorAlert message={error} onRetry={fetchNotes} />}

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
