import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'

export type Language = 'ru' | 'en'

interface Props {
  language: Language
  setLanguage: (lang: Language) => void
}

const I18nContext = createContext<Props>({
  language: 'ru',
  setLanguage: () => {},
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('innuendo-lang') as Language) || 'ru'
    }
    return 'ru'
  })

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('innuendo-lang', lang)
  }, [])

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useLanguage = () => useContext(I18nContext)
