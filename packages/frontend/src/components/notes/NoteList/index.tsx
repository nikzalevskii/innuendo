import { Note } from '@innuendo/shared'
import { NoteCard } from '@/components/notes/NoteCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useI18N } from '@/hooks/useI18N'
import locales from './index.i18n.json'

interface NoteListProps {
  notes: Note[]
  isLoading?: boolean
  onEditNote: (id: string) => void
  onDeleteNote: (id: string) => void
}

export function NoteList({ notes, isLoading, onEditNote, onDeleteNote }: NoteListProps) {
  const { t } = useI18N(locales)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>{t('emptyTitle')}</p>
        <p className="text-sm">{t('emptyHint')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onEdit={onEditNote} onDelete={onDeleteNote} />
      ))}
    </div>
  )
}
