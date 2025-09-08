"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"

export function GoogleAuthButton() {
  return (
    <Button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/" })}
      variant="outline"
      className="w-full border mt-0"
    >
      <FcGoogle className="h-4 w-4 mr-2" />
      Entrar com o Google
    </Button>
  )
}
