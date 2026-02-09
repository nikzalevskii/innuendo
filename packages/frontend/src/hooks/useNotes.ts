import { notesApi } from '@/lib/api'
import { CreateNoteDto, Note, UpdateNoteDto } from '@innuendo/shared'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNotes = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await notesApi.getAll()
      setNotes(data)
      return data
    } catch (err) {
      const errorMsg = 'Не удалось загрузить заметки'
      setError(errorMsg)
      toast.error(errorMsg)
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createNote = useCallback(async (data: CreateNoteDto) => {
    setIsLoading(true)
    setError(null)
    try {
      const newNote = await notesApi.create(data)
      setNotes((prev) => [newNote, ...prev])
      toast.success('Заметка создана')
      return newNote
    } catch (err) {
      const errorMsg = 'Не удалось создать заметку'
      setError(errorMsg)
      toast.error(errorMsg)
      console.error(err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateNote = useCallback(async (id: string, data: UpdateNoteDto) => {
    setIsLoading(true)
    setError(null)
    try {
      const updatedNote = await notesApi.update(id, data)
      setNotes((prev) => prev.map((note) => (note.id === id ? updatedNote : note)))
      toast.success('Заметка обновлена')
      return updatedNote
    } catch (err) {
      const errorMsg = 'Не удалось обновить заметку'
      setError(errorMsg)
      toast.error(errorMsg)
      console.error(err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const deleteNote = useCallback(
    async (id: string) => {
      const previousNotes = notes
      setIsLoading(true)
      setError(null)
      try {
        await notesApi.delete(id)
        setNotes((prev) => prev.filter((note) => note.id !== id))
        toast.success('Заметка удалена')
        return true
      } catch (err) {
        setNotes(previousNotes)
        const errorMsg = 'Не удалось удалить заметку'
        setError(errorMsg)
        toast.error(errorMsg)
        console.error(err)
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [notes],
  )

  return {
    notes,
    isLoading,
    error,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
  }
}
