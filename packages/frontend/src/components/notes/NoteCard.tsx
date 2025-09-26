import { Note } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface Props {
  note: Note;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NoteCard = ({ note, onEdit, onDelete }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200 hover:border-primary-300 transition-all">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium text-gray-900">{note.title}</h3>

        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(note.id)}
            className="text-gray-500 hover:text-primary-500"
            aria-label="Редактировать заметку"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="text-gray-500 hover:text-red-500"
            aria-label="Удалить заметку"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-3">
        {formatDate(note.createdAt)}
      </div>

      {note.content && (
        <div className="mb-3">
          <div
            className={cn(
              "text-gray-700 prose-sm",
              !expanded && "line-clamp-3"
            )}
          >
            {note.content}
          </div>

          {note.content.length > 150 && (
            <button
              onClick={toggleExpand}
              className="text-primary-600 text-sm flex items-center mt-1 hover:underline"
            >
              {expanded ? (
                <>
                  Свернуть <ChevronUp size={16} className="ml-1" />
                </>
              ) : (
                <>
                  Развернуть <ChevronDown size={16} className="ml-1" />
                </>
              )}
            </button>
          )}
        </div>
      )}

      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {note.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-2 py-1 text-xs rounded-full"
              style={{ backgroundColor: tag.color, color: "#fff" }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
