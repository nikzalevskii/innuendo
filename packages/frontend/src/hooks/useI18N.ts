import { Language, useLanguage } from '@/providers/I18nProvider'
import { useCallback } from 'react'

type Translations = Record<string, string>
type Locales = Record<Language, Translations>

export function useI18N<T extends Locales>(locales: T) {
  const { language } = useLanguage()
  const translations = locales[language] || locales.en

  const t = useCallback(
    (key: keyof T[Language], params?: Record<string, string | number>): string => {
      let str = translations[key as string] || (key as string)
      if (params) {
        for (const [k, v] of Object.entries(params)) {
          str = str.replaceAll(`{{${k}}}`, String(v))
        }
      }
      return str
    },
    [translations],
  )

  return { t, language }
}
