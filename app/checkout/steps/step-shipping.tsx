"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Truck, Edit } from "lucide-react";

type StepShippingProps = {
  shippingAddress: any;
  setShippingAddress: (v: any) => void;
  shippingMethod: "standard" | "express" | string;
  setShippingMethod: (v: any) => void;
  subtotal: number;
  setCurrentStep: (n: number) => void;
};

export default function StepShipping({
  shippingAddress,
  setShippingAddress,
  shippingMethod,
  setShippingMethod,
  subtotal,
  setCurrentStep,
}: StepShippingProps) {
  // estado de edição + backups
  const [isEditing, setIsEditing] = useState(false);
  const [backupAddress, setBackupAddress] = useState<any | null>(null);
  const [backupMethod, setBackupMethod] = useState<typeof shippingMethod | null>(null);

  // ao montar, busca dados de entrega salvos no perfil
  useEffect(() => {
    const fetchProfileDelivery = async () => {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        if (data.delivery) setShippingAddress(data.delivery);
      }
    };
    fetchProfileDelivery();
  }, []);

  function handleStartEdit() {
    setBackupAddress(structuredClone ? structuredClone(shippingAddress) : { ...shippingAddress });
    setBackupMethod(shippingMethod);
    setIsEditing(true);
  }

  // ao salvar, atualiza também o perfil
  async function handleSave() {
    try {
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delivery: shippingAddress }),
      });
    } catch (err) {
      console.error(err);
    }
    setIsEditing(false);
  }

  function handleCancel() {
    if (backupAddress) setShippingAddress(backupAddress);
    if (backupMethod) setShippingMethod(backupMethod);
    setIsEditing(false);
  }
  return (
    <Card>
      <CardHeader className="space-y-3 md:space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Truck className="h-5 w-5 shrink-0" />
              <span className="truncate">Endereço de Entrega</span>
            </CardTitle>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-snug">
              Alterar os dados neste formulário altera também os dados do perfil
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            {!isEditing && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleStartEdit}
              >
                <Edit className="h-4 w-4" /> Editar
              </Button>
            )}
            {isEditing && (
              <>
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
              </>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cep">CEP *</Label>
            <Input
              id="cep"
              placeholder="00000-000"
              value={shippingAddress.cep}
              onChange={(e) => setShippingAddress({ ...shippingAddress, cep: e.target.value })}
              required
              disabled={!isEditing}
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="street">Endereço *</Label>
            <Input
              id="street"
              placeholder="Rua, Avenida, etc."
              value={shippingAddress.street}
              onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
              required
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="number">Número *</Label>
            <Input
              id="number"
              placeholder="123"
              value={shippingAddress.number}
              onChange={(e) => setShippingAddress({ ...shippingAddress, number: e.target.value })}
              required
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="complement">Complemento</Label>
            <Input
              id="complement"
              placeholder="Apartamento, bloco, etc."
              value={shippingAddress.complement}
              onChange={(e) => setShippingAddress({ ...shippingAddress, complement: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="neighborhood">Bairro *</Label>
            <Input
              id="neighborhood"
              placeholder="Bairro"
              value={shippingAddress.neighborhood}
              onChange={(e) => setShippingAddress({ ...shippingAddress, neighborhood: e.target.value })}
              required
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">Cidade *</Label>
            <Input
              id="city"
              placeholder="Cidade"
              value={shippingAddress.city}
              onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
              required
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">Estado *</Label>
            <Input
              id="state"
              placeholder="Estado"
              value={shippingAddress.state}
              onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
              required
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone *</Label>
          <Input
            id="phone"
            placeholder="(00) 00000-0000"
            value={shippingAddress.phone}
            onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
            required
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-3">
          <Label>Método de Entrega</Label>
          <RadioGroup
            value={shippingMethod}
            onValueChange={(v) => setShippingMethod(v)}
          >
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
          <RadioGroupItem
            value="standard"
            id="standard"
            className="bg-primary-foreground/20"
          />
          <Label htmlFor="standard" className="flex-1 cursor-pointer">
            <div className="flex justify-between items-center">
                <span>Entrega Padrão &gt;&gt;&gt;</span>
              <span>{subtotal >= 150 ? "Grátis" : "R$ 15,90"}</span>
            </div>
          </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
          <RadioGroupItem
            value="express"
            id="express"
            className="bg-primary-foreground/10"
          />
          <Label htmlFor="express" className="flex-1 cursor-pointer">
            <div className="flex justify-between items-center">
              <span>Entrega Expressa &gt;&gt;&gt;</span>
              <span>  R$25,90</span>
            </div>
          </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep(1)}
            className="flex-1"
          >
            Voltar
          </Button>
          <Button
            type="button"
            onClick={() => setCurrentStep(3)}
            className="flex-1"
            disabled={isEditing} // evita avançar com edição pendente
          >
            Continuar para Pagamento
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
