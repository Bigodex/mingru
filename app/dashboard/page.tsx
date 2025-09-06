"use client"

import { useAuth } from "@/hooks/useAuth"

export default function Dashboard() {
  useAuth()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Área restrita</h1>
      <p>Você está logado e pode acessar essa página.</p>
    </div>
  )
}
