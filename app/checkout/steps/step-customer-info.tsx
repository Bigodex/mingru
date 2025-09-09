"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Edit } from "lucide-react";

export default function StepCustomerInfo({
  customerInfo,
  setCustomerInfo,
  setCurrentStep,
}: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [backupInfo, setBackupInfo] = useState<any>(null);

  // Pre-fill from profile on mount
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          if (data?.personal) {
            setCustomerInfo((prev: any) => ({ ...prev, ...data.personal }));
          }
        }
      } catch {
        // silencioso — não quebra a UI mobile
      }
    }
    loadProfile();
  }, [setCustomerInfo]);

  async function handleSave() {
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ personal: customerInfo }),
    });
    setIsEditing(false);
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
              Alterar os dados neste formulário não altera no perfil
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

      <CardContent className="space-y-4">
        {/* Nome/Sobrenome */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="firstName" className="text-sm">
              Nome *
            </Label>
            <Input
              id="firstName"
              className={`text-sm border ${
                !isEditing
                  ? "border-muted-foreground/10 text-muted-foreground"
                  : "border-border"
              }`}
              placeholder="Seu nome"
              value={customerInfo.firstName ?? ""}
              readOnly={!isEditing}
              onChange={
                isEditing
                  ? (e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        firstName: e.target.value,
                      })
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
              className={`text-sm border ${
                !isEditing
                  ? "border-muted-foreground/10 text-muted-foreground"
                  : "border-border"
              }`}
              placeholder="Seu sobrenome"
              value={customerInfo.lastName ?? ""}
              readOnly={!isEditing}
              onChange={
                isEditing
                  ? (e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        lastName: e.target.value,
                      })
                  : undefined
              }
              required
            />
          </div>
        </div>

        {/* CPF/Nascimento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="cpf" className="text-sm">
              CPF *
            </Label>
            <Input
              id="cpf"
              className={`text-sm border ${
                !isEditing
                  ? "border-muted-foreground/10 text-muted-foreground"
                  : "border-border"
              }`}
              placeholder="000.000.000-00"
              value={customerInfo.cpf ?? ""}
              readOnly={!isEditing}
              onChange={
                isEditing
                  ? (e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        cpf: e.target.value,
                      })
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
              className={`text-sm border ${
                !isEditing
                  ? "border-muted-foreground/10 text-muted-foreground"
                  : "border-border"
              }`}
              value={customerInfo.birthdate ?? ""}
              readOnly={!isEditing}
              onChange={
                isEditing
                  ? (e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        birthdate: e.target.value,
                      })
                  : undefined
              }
              required
            />
          </div>
        </div>

        {/* Email/Telefone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              className={`text-sm border ${
                !isEditing
                  ? "border-muted-foreground/10 text-muted-foreground"
                  : "border-border"
              }`}
              placeholder="seu@email.com"
              value={customerInfo.email ?? ""}
              readOnly={!isEditing}
              onChange={
                isEditing
                  ? (e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        email: e.target.value,
                      })
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
              className={`text-sm border ${
                !isEditing
                  ? "border-muted-foreground/10 text-muted-foreground"
                  : "border-border"
              }`}
              placeholder="(11) 99999-9999"
              value={customerInfo.phone ?? ""}
              readOnly={!isEditing}
              onChange={
                isEditing
                  ? (e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        phone: e.target.value,
                      })
                  : undefined
              }
              required
            />
          </div>
        </div>

        <div className="pt-1">
          <Button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="w-full md:w-auto"
          >
            Continuar para Entrega
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
