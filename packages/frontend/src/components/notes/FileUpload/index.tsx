'use client'

import { useRef, useState } from 'react'
import { useI18N } from '@/hooks/useI18N'
import locales from './index.i18n.json'
import { notesApi } from '@/lib/api'
import { FileAudio, FileImage, Loader2, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface Props {
  onUploadComplete: () => void
  onError: (error: string) => void
}

const ACCEPTED_TYPES = {
  audio: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/m4a', 'audio/ogg', 'audio/webm'],
  image: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
}

const MAX_FILE_SIZE = 50 * 1024 * 1024

export const FileUpload = ({ onUploadComplete, onError }: Props) => {
  const { t } = useI18N(locales)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const allAcceptedTypes = [...ACCEPTED_TYPES.audio, ...ACCEPTED_TYPES.image]

  const validateFile = (file: File): string | null => {
    if (!allAcceptedTypes.includes(file.type)) {
      return t('unsupportedFileType', { fileType: file.type })
    }
    if (file.size > MAX_FILE_SIZE) {
      return t('fileTooLarge', { maxSize: MAX_FILE_SIZE / (1024 * 1024) })
    }
    return null
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer?.files[0]

    if (file) {
      const error = validateFile(file)
      if (error) {
        onError(error)
        return
      }
      setSelectedFile(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const error = validateFile(file)
      if (error) {
        onError(error)
        return
      }
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      await notesApi.upload(selectedFile, title || undefined)

      setSelectedFile(null)
      setTitle('')

      onUploadComplete()
    } catch (error) {
      onError(t('uploadError'))
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const clearSelection = () => {
    setSelectedFile(null)
    setTitle('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('audio/')) {
      return <FileAudio className="w-8 h-8 text-purple-500" />
    }
    return <FileImage className="w-8 h-8 text-green-500" />
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('loadFile')}</h2>

      {!selectedFile ? (
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400',
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            {t('dragOrSelect')} <span className="text-blue-600">{t('select')}</span>
          </p>
          <p className="text-sm text-gray-400">
            {t('supportedFormats')}
          </p>
          <p className="text-sm text-gray-400">{t('maxFileSize')}</p>

          <input
            ref={fileInputRef}
            type="file"
            accept={allAcceptedTypes.join(',')}
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            {getFileIcon(selectedFile.type)}
            <div className="flex-1 min-w-0">
              {/* min-w-0 нужен для корректной работы truncate в flex-контейнере */}
              <p className="font-medium text-gray-900 truncate">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">
                {formatFileSize(selectedFile.size)} •{' '}
                {selectedFile.type.split('/')[1].toUpperCase()}
              </p>
            </div>
            <button
              onClick={clearSelection}
              className="text-gray-400 hover:text-gray-600"
              disabled={isUploading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('titleLabel')}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('titlePlaceholder')}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isUploading}
            />
          </div>

          {isUploading && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}

          <div className="flex gap-3">
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t('uploading')}
                </>
              ) : (
                t('upload')
              )}
            </Button>
            <Button variant="secondary" onClick={clearSelection} disabled={isUploading}>
              {t('cancel')}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
