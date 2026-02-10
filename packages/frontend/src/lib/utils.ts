import clsx from 'clsx'
import { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const dateLocaleMap: Record<string, string> = {
  ru: 'ru-RU',
  en: 'en-US',
}

export function formatDate(date: string | Date, language: string = 'ru'): string {
  return new Intl.DateTimeFormat(dateLocaleMap[language] || 'ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
