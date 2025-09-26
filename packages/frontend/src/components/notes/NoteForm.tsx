import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Note, CreateNoteDto, UpdateNoteDto } from "@/lib/types";

// Схема валидации
const noteSchema = z.object({
  title: z
    .string()
    .min(1, "Заголовок обязателен")
    .max(100, "Максимум 100 символов"),
  content: z.string().optional(),
});

type FormValues = z.infer<typeof noteSchema>;

interface NoteFormProps {
  note?: Note; // Если редактирование - передаём существующую заметку
  onSubmit: (data: CreateNoteDto | UpdateNoteDto) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function NoteForm({
  note,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: NoteFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: note?.title || "",
      content: note?.content || "",
    },
  });

  const onFormSubmit = handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <form onSubmit={onFormSubmit} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {note ? "Редактировать заметку" : "Создать заметку"}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Закрыть"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Заголовок
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className={cn(
            "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500",
            errors.title && "border-red-500 focus:ring-red-500"
          )}
          placeholder="Введите заголовок заметки"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Содержание
        </label>
        <textarea
          id="content"
          {...register("content")}
          rows={6}
          className={cn(
            "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500",
            errors.content && "border-red-500 focus:ring-red-500"
          )}
          placeholder="Введите содержание заметки"
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Отмена
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Сохранение..." : note ? "Сохранить" : "Создать"}
        </button>
      </div>
    </form>
  );
}
