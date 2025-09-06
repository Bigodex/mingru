"use client";

import React from "react";
import { Header } from "@/components/header";

export default function ProfilePage() {
  const user = {
    name: "Pedro Silva",
    email: "pedro.silva@example.com",
    profilePicture: "/profile-picture.jpg",
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123, São Paulo, SP",
    birthDate: "01/01/1990",
    nationality: "Brasileiro",
    maritalStatus: "Solteiro",
    gender: "Masculino",
    linkedin: "linkedin.com/in/pedro-silva",
    github: "github.com/pedro-silva",
    website: "www.pedrosilva.dev",
    hobbies: ["Fotografia", "Ciclismo", "Leitura"],
    paymentInfo: {
      cardNumber: "**** **** **** 1234",
      expiryDate: "12/25",
      cardHolder: "Pedro Silva",
    },
    deliveryInfo: {
      address: "Rua das Entregas, 456, São Paulo, SP",
      city: "São Paulo",
      state: "SP",
      zipCode: "12345-678",
      country: "Brasil",
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header 
        onCategoryClick={() => console.log("Category clicked")} 
        onAvatarClick={() => console.log("Avatar clicked")} 
      />
      <div className="container mx-auto px-4 py-12 flex justify-center space-x-8">
        {/* Card de Informações Pessoais */}
        <div className="bg-card shadow-lg rounded-lg p-6 w-96 border">
          <h2 className="text-xl font-bold primary-foreground mb-4 text-center">Informações Pessoais</h2>
          <div className="flex flex-col items-center">
            <img
              src={user.profilePicture}
              alt="Foto de Perfil"
              className="w-28 h-28 rounded-full border-4 border-foreground mb-4"
            />
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground text-sm flex items-center mt-1">
              <svg aria-hidden className="mr-2 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <span className="truncate">{user.email}</span>
            </p>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-muted-foreground">
              <strong className="w-36">Telefone:</strong>
              <span className="ml-2">{user.phone}</span>
            </p>
            <p className="text-muted-foreground">
              <strong className="w-36">Data de Nascimento:</strong>
              <span className="ml-2">{user.birthDate}</span>
            </p>
            <p className="text-muted-foreground">
              <strong className="w-36">Nacionalidade:</strong>
              <span className="ml-2">{user.nationality}</span>
            </p>
            <p className="text-muted-foreground">
              <strong className="w-36">Estado Civil:</strong>
              <span className="ml-2">{user.maritalStatus}</span>
            </p>
            <p className="text-muted-foreground">
              <strong className="w-36">Gênero:</strong>
              <span className="ml-2">{user.gender}</span>
            </p>
            <p className="text-muted-foreground">
              <strong className="w-36">Hobbies:</strong>
              <span className="ml-2">{user.hobbies.join(", ")}</span>
            </p>
          </div>
        </div>

        {/* Card de Informações de Entrega */}
        <div className="bg-card shadow-lg rounded-lg p-6 w-96 border">
          <h2 className="text-xl font-bold primary-foreground mb-4 text-center">Informações de Entrega</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              <strong>Endereço:</strong> {user.deliveryInfo.address}
            </p>
            <p className="text-muted-foreground">
              <strong>Cidade:</strong> {user.deliveryInfo.city}
            </p>
            <p className="text-muted-foreground">
              <strong>Estado:</strong> {user.deliveryInfo.state}
            </p>
            <p className="text-muted-foreground">
              <strong>CEP:</strong> {user.deliveryInfo.zipCode}
            </p>
            <p className="text-muted-foreground">
              <strong>País:</strong> {user.deliveryInfo.country}
            </p>
          </div>
        </div>

        {/* Card de Informações de Pagamento */}
        <div className="bg-card shadow-lg rounded-lg p-6 w-96 border">
          <h2 className="text-xl font-bold primary-foreground mb-4 text-center">Informações de Pagamento</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              <strong>Número do Cartão:</strong> {user.paymentInfo.cardNumber}
            </p>
            <p className="text-muted-foreground">
              <strong>Validade:</strong> {user.paymentInfo.expiryDate}
            </p>
            <p className="text-muted-foreground">
              <strong>Titular:</strong> {user.paymentInfo.cardHolder}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
