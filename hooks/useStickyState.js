import { useState, useEffect } from 'react'

const useStickyState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const stickyValue = window.localStorage.getItem(key)
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])
  return [value, setValue]
}

export default useStickyState
