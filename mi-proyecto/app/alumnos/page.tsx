"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AlumnosRoot() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/alumnos/dashboard")
  }, [router])

  return null // No muestra nada porque redirige automáticamente
}
