'use client'

import Link from 'next/link'
import locales from './index.i18n.json'
import { useI18N } from '@/hooks/useI18N'

export default function HomeContent() {
  const { t } = useI18N(locales)
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Innuendo</h1>
        <p className="text-xl text-gray-600 mb-8">{t('subtitle')}</p>
        <Link
          href="/notes"
          className="inline-flex items-center px-6 py-3 bg-blue-600
  text-white rounded-lg hover:bg-blue-700"
        >
          {t('goToNotes')}
        </Link>
      </div>
    </div>
  )
}
