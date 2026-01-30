'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'portfolio-theme'

type Theme = 'light' | 'dark'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const nextTheme: Theme = stored ?? (prefersDark ? 'dark' : 'light')
    setTheme(nextTheme)
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme, mounted])

  if (!mounted) return null

  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="theme-toggle"
      aria-label="Toggle light and dark theme"
      data-theme={isDark ? 'dark' : 'light'}
    >
      <span
        className={`theme-toggle__icon ${isDark ? 'theme-toggle__moon' : 'theme-toggle__sun'}`}
        aria-hidden
      />
    </button>
  )
}
