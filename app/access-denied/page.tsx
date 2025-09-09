"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AccessDeniedPage() {
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/")
    }, 12500)
    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <Card className="w-full max-w-md shadow-lg border border-border animate-fade-in bg-card">
        <CardHeader className="flex flex-col items-center space-y-3">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md animate-bounce">
            <AlertCircle className="w-8 h-8" />
          </div>
          <CardTitle className="text-xl font-semibold text-center text-foreground">
            Você já está logado!
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Aguarde um instante, você será redirecionado automaticamente.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center">
          <div className="w-8 h-8 border-4 border-primary/60 border-t-transparent rounded-full animate-spin" />
        </CardContent>

        <CardFooter className="flex justify-center">
            <Button
            variant="outline"
            className="border-primary-foreground text-primary-foreground bg-primary hover:bg-primary/80"
            onClick={() => router.replace("/")}
            >
            Voltar para Home agora
            </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
