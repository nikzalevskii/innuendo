'use client'

import { useEffect, useState } from 'react'
import { CreateNoteDto, Note, UpdateNoteDto } from '@innuendo/shared'
import { NoteList } from '@/components/notes/NoteList'
import { CreateNoteForm } from '@/components/notes/CreateNoteForm'
import { useNotes } from '@/hooks/useNotes'
import { useApiHealth } from '@/hooks/useApiHealth'
import { ErrorAlert } from '@/components/ui/ErrorAlert'
import { EditNoteModal } from '@/components/notes/EditNoteModal'
import { useI18N } from '@/hooks/useI18N'
import locales from './index.i18n.json'
import { toast } from 'sonner'
import { FileUpload } from '@/components/notes/FileUpload'

export default function NotesPage() {
  const { t } = useI18N(locales)
  const { notes, isLoading, error, fetchNotes, createNote, updateNote, deleteNote } = useNotes()

  const { isHealthy } = useApiHealth()

  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  const handleCreateNote = async (data: CreateNoteDto) => {
    await createNote(data)
  }

  const handleEditNote = (id: string) => {
    const note = notes.find((n) => n.id === id)
    if (note) {
      setEditingNote(note)
      setIsEditModalOpen(true)
    }
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingNote(null)
  }

  const handleUpdateNote = async (id: string, data: UpdateNoteDto) => {
    return await updateNote(id, data)
  }

  const handleDeleteNote = async (id: string) => {
    await deleteNote(id)
  }

  if (isHealthy === false) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{t('apiUnavailable')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
      {error && <ErrorAlert message={error} onRetry={fetchNotes} />}
      <CreateNoteForm onSubmit={handleCreateNote} />

      <FileUpload
        onUploadComplete={() => {
          fetchNotes()
          toast.success(t('fileUploaded'))
        }}
        onError={(error) => toast.error(error)}
      />

      <NoteList
        notes={notes}
        isLoading={isLoading}
        onEditNote={handleEditNote}
        onDeleteNote={handleDeleteNote}
      />
      <EditNoteModal
        note={editingNote}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleUpdateNote}
      />
    </div>
  )
}
