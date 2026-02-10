import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { CreateNoteDto } from '@innuendo/shared'
import { useI18N } from '@/hooks/useI18N'
import locales from './index.i18n.json'

interface CreateNoteFormProps {
  onSubmit: (data: CreateNoteDto) => Promise<void>
  onCancel?: () => void
}

export function CreateNoteForm({ onSubmit, onCancel }: CreateNoteFormProps) {
  const { t } = useI18N(locales)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ title?: string }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    if (!title.trim()) {
      setErrors({ title: t('titleRequired') })
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit({
        title: title.trim(),
        content: content.trim() || undefined,
      })

      setTitle('')
      setContent('')
    } catch (error) {
      console.error('Error creating note:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">{t('heading')}</h2>

        <Input
          label={t('titleLabel')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t('titlePlaceholder')}
          error={errors.title}
          required
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">{t('contentLabel')}</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full rounded-md border border-gray-300 px-3 py-2
   text-sm focus:outline-none focus:ring-2 focus:ring-blue-500
  focus:border-transparent"
            placeholder={t('contentPlaceholder')}
          />
        </div>

        <div className="flex gap-3">
          <Button type="submit" isLoading={isSubmitting}>
            {t('submitButton')}
          </Button>
          {onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              {t('cancelButton')}
            </Button>
          )}
        </div>
      </form>
    </Card>
  )
}
