"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CadastroSuccessPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (countdown <= 0) {
      router.push("/login")
    }
  }, [countdown, router])

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onCategoryClick={(category) => console.log(`Category clicked: ${category}`)}
        onAvatarClick={() => console.log("Avatar clicked")}
      />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-muted/20">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Cadastro realizado com sucesso!</h1>
        <p className="text-center mb-6">
          Você será redirecionado para a página de login em {countdown} segundos.
        </p>
        <Button className="border"variant="default" onClick={() => router.push("/login")}>
          Ir para login agora
        </Button>
      </main>
      <Footer />
    </div>
  )
}
