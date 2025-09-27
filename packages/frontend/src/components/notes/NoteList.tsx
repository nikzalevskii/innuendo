import { Note } from "@innuendo/shared";
import { NoteCard } from "./NoteCard";
import { LoadingSpinner } from "../ui/LoadingSpinner";

interface NoteListProps {
  notes: Note[];
  isLoading?: boolean;
  onEditNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
}

export function NoteList({
  notes,
  isLoading,
  onEditNote,
  onDeleteNote,
}: NoteListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Заметок пока нет</p>
        <p className="text-sm">Создайте первую заметку!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEditNote}
          onDelete={onDeleteNote}
        />
      ))}
    </div>
  );
}
