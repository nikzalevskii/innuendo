import { Modal } from '@/components/ui/Modal'
import { Note, UpdateNoteDto } from '@innuendo/shared'
import { useState } from 'react'
import { NoteForm } from '@/components/notes/NoteForm'

interface Props {
  note: Note | null
  isOpen: boolean
  onClose: () => void
  onSubmit: (id: string, data: UpdateNoteDto) => Promise<Note | null>
}

export const EditNoteModal = ({ note, isOpen, onClose, onSubmit }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: UpdateNoteDto) => {
    setIsSubmitting(true)

    try {
      await onSubmit(note!.id, data)
      onClose()
    } catch (error) {
      console.error('Failed to update note')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!note) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <NoteForm
        note={note}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  )
}
