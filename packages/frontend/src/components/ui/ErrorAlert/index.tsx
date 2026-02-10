import { useI18N } from '@/hooks/useI18N'
import locales from './index.i18n.json'

interface Props {
  message: string
  onRetry?: () => void
}

export function ErrorAlert({ message, onRetry }: Props) {
  const { t } = useI18N(locales)

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      <p>{message}</p>

      {onRetry && (
        <button onClick={onRetry} className="underline text-red-800 ml-2">
          {t('retry')}
        </button>
      )}
    </div>
  )
}
