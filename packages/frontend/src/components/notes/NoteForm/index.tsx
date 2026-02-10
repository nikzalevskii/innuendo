import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Note, CreateNoteDto, UpdateNoteDto } from '@innuendo/shared'
import { useI18N } from '@/hooks/useI18N'
import locales from './index.i18n.json'

type FormValues = {
  title: string
  content?: string
}

interface NoteFormProps {
  note?: Note
  onSubmit: (data: CreateNoteDto | UpdateNoteDto) => Promise<void>
  onCancel: () => void
  isSubmitting?: boolean
}

export function NoteForm({ note, onSubmit, onCancel, isSubmitting = false }: NoteFormProps) {
  const { t } = useI18N(locales)

  const noteSchema = useMemo(
    () =>
      z.object({
        title: z.string().min(1, t('titleRequired')).max(100, t('titleMaxLength')),
        content: z.string().optional(),
      }),
    [t],
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: note?.title || '',
      content: note?.content || '',
    },
  })

  const onFormSubmit = handleSubmit(async (data) => {
    await onSubmit(data)
  })

  return (
    <form onSubmit={onFormSubmit} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{note ? t('editTitle') : t('createTitle')}</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
          aria-label={t('closeAriaLabel')}
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          {t('titleLabel')}
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className={cn(
            'w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500',
            errors.title && 'border-red-500 focus:ring-red-500',
          )}
          placeholder={t('titlePlaceholder')}
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          {t('contentLabel')}
        </label>
        <textarea
          id="content"
          {...register('content')}
          rows={6}
          className={cn(
            'w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500',
            errors.content && 'border-red-500 focus:ring-red-500',
          )}
          placeholder={t('contentPlaceholder')}
        />
        {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          disabled={isSubmitting}
        >
          {t('cancel')}
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 border border-gray-300  text-gray-700 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('saving') : note ? t('save') : t('create')}
        </button>
      </div>
    </form>
  )
}
