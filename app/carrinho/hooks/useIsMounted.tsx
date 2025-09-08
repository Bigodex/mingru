"use client"

import { useState, useEffect } from "react"

// Hook para verificar se o componente foi montado
export function useIsMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}