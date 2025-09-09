"use client";

import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Edit } from "lucide-react";

/* ========= Tipos simples para organizar ========= */
type CustomerInfo = {
  firstName?: string;
  lastName?: string;
  cpf?: string;
  birthdate?: string; // ISO yyyy-mm-dd
  email?: string;
  phone?: string;
};

type Props = {
  customerInfo: CustomerInfo;
  setCustomerInfo: Dispatch<SetStateAction<CustomerInfo>>;
  setCurrentStep: (n: number) => void;
};

/* ========= Util para manter o estilo dos inputs consistente ========= */
const inputClass = (isEditing: boolean) =>
  `text-sm border h-10 sm:h-11 ${
    isEditing
      ? "border-border"
      : "border-muted-foreground/10 text-muted-foreground"
  }`;

/* ========= Componente ========= */
export default function StepCustomerInfo({
  customerInfo,
  setCustomerInfo,
  setCurrentStep,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [backupInfo, setBackupInfo] = useState<CustomerInfo | null>(null);

  // Preenche a partir do perfil na montagem
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/profile");
        if (!active) return;
        if (res.ok) {
          const data = await res.json();
          if (data?.personal) {
            setCustomerInfo((prev) => ({ ...prev, ...data.personal }));
          }
        }
      } catch {
        // silencioso para não quebrar UX
      }
    })();
    return () => {
      active = false;
    };
  }, [setCustomerInfo]);

  async function handleSave() {
    try {
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personal: customerInfo }),
      });
      setIsEditing(false);
    } catch {
      // você pode exibir um toast de erro aqui, se tiver
      setIsEditing(false);
    }
  }

  function handleCancel() {
    if (backupInfo) setCustomerInfo(backupInfo);
    setIsEditing(false);
  }

  return (
    <Card>
      {/* Header responsivo */}
      <CardHeader className="space-y-3 md:space-y-2">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <User className="h-5 w-5 shrink-0" />
              <span className="truncate">Informações Pessoais</span>
            </CardTitle>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-snug">
              Alterar os dados neste formulário atualiza também o seu perfil.
            </p>
          </div>

          {/* Ações: empilha no mobile, lado a lado no md+ */}
          {!isEditing ? (
            <div className="flex w-full md:w-auto">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1 ml-auto"
                onClick={() => {
                  setBackupInfo(customerInfo);
                  setIsEditing(true);
                }}
              >
                <Edit className="h-4 w-4" /> Editar
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 w-full md:w-auto">
              <Button
                type="button"
                onClick={handleSave}
                className="border flex-1 md:flex-none"
              >
                Salvar
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1 md:flex-none"
              >
                Cancelar
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-5 sm:space-y-6">
        {/* Nome / Sobrenome */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="firstName" className="text-sm">
              Nome *
            </Label>
            <Input
              id="firstName"
              autoComplete="given-name"
              className={inputClass(isEditing)}
              placeholder="Seu nome"
              value={customerInfo.firstName ?? ""}
              readOnly={!isEditing}
              onChange={
                isEditing
                  ? (e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                  : undefined
              }
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lastName" className="text-sm">
              Sobrenome *
            </Label>
            <Input
              id="lastName"
              autoComplete="family-name"
              className={inputClass(isEditing)}
              placeholder="Seu sobrenome"
              value={customerInfo.lastName ?? ""}
              readOnly={!isEditing}
              onChange={
                isEditing
                  ? (e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                  : undefined
              }
              required
            />
          </div>
        </div>

        {/* CPF / Nascimento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="cpf" className="text-sm">
              CPF *
            </Label>
            <Input
              id="cpf"
              inputMode="numeric"
              autoComplete="off"
              className={inputClass(isEditing)}
              placeholder="000.000.000-00"
              value={customerInfo.cpf ?? ""}
              readOnly={!isEditing}
              onChange={
                isEditing
                  ? (e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        cpf: e.target.value,
                      }))
                  : undefined
              }
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="birthdate" className="text-sm">
              Data de Nascimento *
            </Label>
            <Input
              id="birthdate"
              type="date"
              autoComplete="bday"
              className={inputClass(isEditing)}
              value={customerInfo.birthdate ?? ""}
              readOnly={!isEditing}
              onChange={
                isEditing
                  ? (e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        birthdate: e.target.value,
                      }))
                  : undefined
              }
              required
            />
          </div>
        </div>

        {/* Email / Telefone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              className={inputClass(isEditing)}
              placeholder="seu@email.com"
              value={customerInfo.email ?? ""}
              readOnly={!isEditing}
              onChange={
                isEditing
                  ? (e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                  : undefined
              }
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-sm">
              Telefone *
            </Label>
            <Input
              id="phone"
              inputMode="tel"
              autoComplete="tel-national"
              className={inputClass(isEditing)}
              placeholder="(11) 99999-9999"
              value={customerInfo.phone ?? ""}
              readOnly={!isEditing}
              onChange={
                isEditing
                  ? (e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                  : undefined
              }
              required
            />
          </div>
        </div>

        {/* CTA */}
        <div className="pt-1">
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="w-full sm:w-auto"
              disabled={isEditing} // evita avançar com edição pendente
            >
              Continuar para Entrega
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
