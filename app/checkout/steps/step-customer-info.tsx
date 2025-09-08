"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Edit } from "lucide-react";

export default function StepCustomerInfo({ customerInfo, setCustomerInfo, setCurrentStep }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [backupInfo, setBackupInfo] = useState<any>(null);

  // Pre-fill from profile on mount
  useEffect(() => {
    async function loadProfile() {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        if (data.personal) {
          setCustomerInfo((prev: any) => ({ ...prev, ...data.personal }));
        }
      }
    }
    loadProfile();
  }, [setCustomerInfo]);

  async function handleSave() {
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ personal: customerInfo })
    });
    setIsEditing(false);
  }

  function handleCancel() {
    if (backupInfo) setCustomerInfo(backupInfo);
    setIsEditing(false);
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" /> Informações Pessoais
        </CardTitle>
        {!isEditing ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => {
              setBackupInfo(customerInfo);
              setIsEditing(true);
            }}
          >
            <Edit className="h-4 w-4" /> Editar
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button type="button" onClick={handleSave} className="border">
              Salvar
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nome *</Label>
            <Input
              id="firstName"
              className={`border ${!isEditing ? "border-muted-foreground/10 text-muted-foreground" : "border-border"}`}
              placeholder="Seu nome"
              value={customerInfo.firstName}
              readOnly={!isEditing}
              onChange={isEditing ? (e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value }) : undefined}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Sobrenome *</Label>
            <Input
              id="lastName"
              className={`border ${!isEditing ? "border-muted-foreground/10 text-muted-foreground" : "border-border"}`}
              placeholder="Seu sobrenome"
              value={customerInfo.lastName}
              readOnly={!isEditing}
              onChange={isEditing ? (e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value }) : undefined}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF *</Label>
            <Input
              id="cpf"
              className={`border ${!isEditing ? "border-muted-foreground/10 text-muted-foreground" : "border-border"}`}
              placeholder="000.000.000-00"
              value={customerInfo.cpf}
              readOnly={!isEditing}
              onChange={isEditing ? (e) => setCustomerInfo({ ...customerInfo, cpf: e.target.value }) : undefined}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthdate">Data de Nascimento *</Label>
            <Input
              id="birthdate"
              className={`border ${!isEditing ? "border-muted-foreground/10 text-muted-foreground" : "border-border"}`}
              type="date"
              value={customerInfo.birthdate}
              readOnly={!isEditing}
              onChange={isEditing ? (e) => setCustomerInfo({ ...customerInfo, birthdate: e.target.value }) : undefined}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              className={`border ${!isEditing ? "border-muted-foreground/10 text-muted-foreground" : "border-border"}`}
              type="email"
              placeholder="seu@email.com"
              value={customerInfo.email}
              readOnly={!isEditing}
              onChange={isEditing ? (e) => setCustomerInfo({ ...customerInfo, email: e.target.value }) : undefined}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              className={`border ${!isEditing ? "border-muted-foreground/10 text-muted-foreground" : "border-border"}`}
              placeholder="(11) 99999-9999"
              value={customerInfo.phone}
              readOnly={!isEditing}
              onChange={isEditing ? (e) => setCustomerInfo({ ...customerInfo, phone: e.target.value }) : undefined}
              required
            />
          </div>
        </div>

        <Button type="button" onClick={() => setCurrentStep(2)} className="w-full">
          Continuar para Entrega
        </Button>
      </CardContent>
    </Card>
  );
}
