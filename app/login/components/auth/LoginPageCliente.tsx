"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { AuthLayout } from "../layout/AuthLayout";
import { LoginForm } from "./LoginForm";
import { useLoginGate } from "../../hooks/useLoginGate"; // <- caminho correto

export default function LoginPageClient() {
  const { status } = useSession();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // aplica o gate (corrige “acesso negado” indevido durante o login)
  useLoginGate({ status, isLoggingIn });

  if (status === "loading") {
    return (
      <AuthLayout>
        <div className="p-6">Carregando…</div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <LoginForm
        onStartLogin={() => setIsLoggingIn(true)}
        onFinishLogin={() => setIsLoggingIn(false)}
      />
    </AuthLayout>
  );
}
