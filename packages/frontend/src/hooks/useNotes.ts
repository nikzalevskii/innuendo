import { notesApi } from "@/lib/api";
import { CreateNoteDto, Note, UpdateNoteDto } from "@innuendo/shared";
import { useCallback, useState } from "react";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await notesApi.getAll();
      setNotes(data);
      return data;
    } catch (err) {
      setError("Не удалось загрузить заметки");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createNote = useCallback(async (data: CreateNoteDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const newNote = await notesApi.create(data);
      setNotes((prev) => [newNote, ...prev]);
      return newNote;
    } catch (err) {
      setError("Не удалось создать заметку");
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateNote = useCallback(async (id: string, data: UpdateNoteDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedNote = await notesApi.update(id, data);
      setNotes((prev) =>
        prev.map((note) => (note.id === id ? updatedNote : note))
      );
      return updatedNote;
    } catch (err) {
      setError("Не удалось обновить заметку");
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteNote = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await notesApi.delete(id);
      setNotes((prev) => prev.filter((note) => note.id !== id));
      return true;
    } catch (err) {
      setError("Не удалось удалить заметку");
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    notes,
    isLoading,
    error,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
  };
};
