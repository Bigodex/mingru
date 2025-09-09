"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, User, MapPin, CreditCard } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import CreditCardPreview from "@/components/payment/CreditCardPreview";


type Personal = {
  avatarUrl: string | null;
  firstName: string;
  lastName: string;
  cpf: string;
  birthdate: string;
  email: string;
  phone: string;
};

type Delivery = {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
};

type Payment = {
  cardHolder: string;
  cpf: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
};

export default function PerfilPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Protege rota
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  const [personal, setPersonal] = useState<Personal>({
    avatarUrl: null,
    firstName: "",
    lastName: "",
    cpf: "",
    birthdate: "",
    email: "",
    phone: "",
  });

  const [delivery, setDelivery] = useState<Delivery>({
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const [payment, setPayment] = useState<Payment>({
    cardHolder: "",
    cpf: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const [editPersonal, setEditPersonal] = useState(false);
  const [editDelivery, setEditDelivery] = useState(false);
  const [editPayment, setEditPayment] = useState(false);

  // ====== NOVO: refs para controle do input de arquivo e última URL criada
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const lastObjectUrlRef = useRef<string | null>(null);

  // Preenche com sessão (só email agora)
  useEffect(() => {
    if (session?.user) {
      setPersonal((p) => ({
        ...p,
        email: session?.user?.email ?? p.email,
      }));
    }
  }, [session]);

  // Busca perfil salvo no banco
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        if (data.personal) setPersonal(data.personal);
        if (data.delivery) setDelivery(data.delivery);
        if (data.payment) setPayment(data.payment);
      }
    };
    fetchProfile();
  }, []);

  // Upload avatar (preview local)
  const handleFile = (file: File | null) => {
    if (!file) return;

    // Libera URL anterior para evitar vazamento de memória
    if (lastObjectUrlRef.current) {
      URL.revokeObjectURL(lastObjectUrlRef.current);
      lastObjectUrlRef.current = null;
    }

    const url = URL.createObjectURL(file);
    lastObjectUrlRef.current = url;
    setPersonal((p) => ({ ...p, avatarUrl: url }));

    // Permite selecionar o mesmo arquivo novamente se quiser
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Abre seletor de arquivos ao clicar no botão
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // Save handlers
  const savePersonal = async () => {
    try {
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personal }),
      });
      setEditPersonal(false);
      alert("Informações pessoais salvas!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar informações pessoais.");
    }
  };

  const saveDelivery = async () => {
    try {
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delivery }),
      });
      setEditDelivery(false);
      alert("Informações de entrega salvas!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar informações de entrega.");
    }
  };

  const savePayment = async () => {
    try {
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payment }),
      });
      setEditPayment(false);
      alert("Informações de pagamento salvas!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar informações de pagamento.");
    }
  };

  if (status === "loading") {
    return <div className="container mx-auto px-4 py-10">Carregando…</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header
        onCategoryClick={() => console.log("Category clicked")}
        onAvatarClick={() => console.log("Avatar clicked")}
      />

      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 ">
          {/* --------- CARD ESQUERDA – INFORMAÇÕES PESSOAIS --------- */}
          <Card className="h-full flex flex-col border-primary-foreground/20">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="flex items-center flex-1 text-center">
                <User className="mr-2 h-5 w-5" />
                Informações Pessoais
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditPersonal((prev) => !prev)}
              >
                <Pencil className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-5 flex-1 flex flex-col">
              <div className="flex flex-col items-center gap-3">
                <div className="h-24 w-24 rounded-full overflow-hidden border">
                  <img
                    src={personal.avatarUrl || "/placeholder-user.jpg"}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* ====== NOVO: input oculto + botão que abre o seletor ====== */}
                {editPersonal && (
                  <>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                    />
                    <Button variant="outline" type="button" onClick={openFileDialog}>
                      Trocar foto
                    </Button>
                  </>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input
                  id="firstName"
                  className="border border-border"
                  value={personal.firstName}
                  readOnly={!editPersonal}
                  onChange={(e) =>
                    setPersonal({ ...personal, firstName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input
                  id="lastName"
                  className="border border-border"
                  value={personal.lastName}
                  readOnly={!editPersonal}
                  onChange={(e) =>
                    setPersonal({ ...personal, lastName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  className="border border-border"
                  inputMode="numeric"
                  placeholder="000.000.000-00"
                  value={personal.cpf}
                  readOnly={!editPersonal}
                  onChange={(e) =>
                    setPersonal({ ...personal, cpf: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthdate">Data de nascimento</Label>
                <Input
                  id="birthdate"
                  className="border border-border"
                  type="date"
                  value={personal.birthdate}
                  readOnly={!editPersonal}
                  onChange={(e) =>
                    setPersonal({ ...personal, birthdate: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  className="border border-border"
                  type="email"
                  value={personal.email}
                  readOnly={!editPersonal}
                  onChange={(e) =>
                    setPersonal({ ...personal, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  className="border border-border"
                  inputMode="tel"
                  placeholder="(00) 00000-0000"
                  value={personal.phone}
                  readOnly={!editPersonal}
                  onChange={(e) =>
                    setPersonal({ ...personal, phone: e.target.value })
                  }
                />
              </div>

              {editPersonal && (
                <Button onClick={savePersonal} className="mt-auto w-full border">
                  Salvar
                </Button>
              )}
            </CardContent>
          </Card>

          {/* --------- CARD CENTRO – INFORMAÇÕES DE ENTREGA --------- */}
          <Card className="h-full flex flex-col border-primary-foreground/20">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="flex items-center flex-1 text-center">
                <MapPin className="mr-2 h-5 w-5" />
                Informações de Entrega
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditDelivery((prev) => !prev)}
              >
                <Pencil className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-5 flex-1 flex flex-col">
              <div className="h-56 w-full rounded-md bg-muted/50 border flex items-center justify-center text-sm text-muted-foreground">
                Google Maps aqui (placeholder)
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { id: "cep", label: "CEP", placeholder: "00000-000" },
                  { id: "street", label: "Rua", placeholder: "Rua/Avenida" },
                  { id: "number", label: "Número", placeholder: "Nº" },
                  {
                    id: "complement",
                    label: "Complemento",
                    placeholder: "Apto, bloco, referência…",
                  },
                  { id: "neighborhood", label: "Bairro" },
                  { id: "city", label: "Cidade" },
                  {
                    id: "state",
                    label: "Estado (UF)",
                    placeholder: "SP, RJ, MG…",
                  },
                ].map((field) => (
                  <div
                    key={field.id}
                    className={`space-y-2 ${
                      field.id === "state" ? "sm:col-span-2" : ""
                    }`}
                  >
                    <Label htmlFor={field.id}>{field.label}</Label>
                    <Input
                      id={field.id}
                      className="border border-border"
                      placeholder={field.placeholder}
                      value={(delivery as any)[field.id]}
                      readOnly={!editDelivery}
                      onChange={(e) =>
                        setDelivery({ ...delivery, [field.id]: e.target.value })
                      }
                    />
                  </div>
                ))}
              </div>

              {editDelivery && (
                <Button onClick={saveDelivery} className="mt-auto w-full border">
                  Salvar
                </Button>
              )}
            </CardContent>
          </Card>

          {/* --------- CARD DIREITA – INFORMAÇÕES DE PAGAMENTO --------- */}
            <Card className="h-full flex flex-col border-primary-foreground/20">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="flex items-center flex-1 text-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Informações de Pagamento
              </CardTitle>
              <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditPayment((prev) => !prev)}
              >
              <Pencil className="h-5 w-5" />
              </Button>
            </CardHeader>

            <CardContent className="space-y-5 flex-1 flex flex-col">
              {/* >>> Substitui o placeholder por este bloco <<< */}
              <div className="w-full flex items-center justify-center">
              <CreditCardPreview
                number={payment.cardNumber}
                name={payment.cardHolder}
                expiry={payment.cardExpiry}
                cvv={payment.cardCvv}
              />
              </div>

              <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                className="border border-border"
                inputMode="numeric"
                placeholder="000.000.000-00"
                value={payment.cpf}
                readOnly={!editPayment}
                onChange={(e) =>
                setPayment({ ...payment, cpf: e.target.value })
                }
              />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Número do cartão</Label>
                  <Input
                    id="cardNumber"
                    className="border border-border"
                    inputMode="numeric"
                    placeholder="**** **** **** ****"
                    value={payment.cardNumber}
                    readOnly={!editPayment}
                    onChange={(e) =>
                      setPayment({ ...payment, cardNumber: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardExpiry">Validade (MM/AA)</Label>
                  <Input
                    id="cardExpiry"
                    className="border border-border"
                    placeholder="MM/AA"
                    value={payment.cardExpiry}
                    readOnly={!editPayment}
                    onChange={(e) =>
                      setPayment({ ...payment, cardExpiry: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="cardCvv">CVV</Label>
                  <Input
                    id="cardCvv"
                    className="border border-border"
                    inputMode="numeric"
                    placeholder="***"
                    value={payment.cardCvv}
                    readOnly={!editPayment}
                    onChange={(e) =>
                      setPayment({ ...payment, cardCvv: e.target.value })
                    }
                  />
                </div>
              </div>

              {editPayment && (
                <Button onClick={savePayment} className="mt-auto w-full border">
                  Salvar
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
