"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroBanner } from "@/components/hero-banner";
import { BenefitsBar } from "@/components/benefits-bar";
import { ProductCarousel } from "@/components/product-carousel";
import { useRouter } from "next/navigation";

// Produtos organizados por categoria
const products = {
  maisVendidos: [
    {
      id: 1,
      name: "Camiseta Oversized Mustache",
      description: "Camiseta branca oversized com estampa minimalista de um homem de bigode ao lado esquerdo do peito, confortável, moderna e extremamente versátil.",
      price: 89.9,
      image: "/Camisetas/camiseta-mustache.svg",
    },
    {
      id: 2,
      name: "Hoodie Urban Oversized",
      description: "Moletom oversized com capuz, estilo urbano e tecido premium, ideal para dias frios.",
      price: 159.9,
      image: "/Camisetas/camiseta-oversized.svg",
    },
    {
      id: 3,
      name: "Calça Cargo Shadow",
      description: "Calça cargo bege com bolsos laterais e modelagem street, resistente, prática e super estilosa.",
      price: 199.9,
      image: "/Calcas/cargo_shadow.svg",
    },
    {
      id: 4,
      name: "Jaqueta Bomber Verde Militar",
      description: "Jaqueta bomber verde estilo militar, resistente e estilosa, perfeita para compor looks urbanos.",
      price: 249.9,
      image: "/Camisetas/camiseta-vader.svg",
    },
    {
      id: 5,
      name: "Tênis High Top Branco",
      description: "Tênis cano alto branco, clássico do streetwear, confortável, durável e de design atemporal.",
      price: 299.9,
      image: "/Calcas/cargo.svg",
    },
    {
      id: 6,
      name: "Boné Snapback Preto",
      description: "Boné preto ajustável com aba reta, ícone urbano, leve, moderno e sempre atual.",
      price: 79.9,
      image: "/Camisetas/camiseta-rick.svg",
    },
  ],
  camisetas: [
    {
      id: 7,
      name: "Camiseta Oversized Mustache",
      description: "Camiseta branca oversized com estampa minimalista de um homem de bigode ao lado esquerdo do peito, confortável, moderna e extremamente versátil.",
      price: 89.9,
      image: "/Camisetas/camiseta-mustache.svg",
    },
    {
      id: 8,
      name: "Hoodie Urban Oversized",
      description: "Moletom oversized com capuz, estilo urbano e tecido premium, ideal para dias frios.",
      price: 159.9,
      image: "/Camisetas/camiseta-oversized.svg",
    },
    {
      id: 9,
      name: "Jaqueta Bomber Verde Militar",
      description: "Jaqueta bomber verde estilo militar, resistente e estilosa, perfeita para compor looks urbanos.",
      price: 249.9,
      image: "/Camisetas/camiseta-vader.svg",
    },
    {
      id: 10,
      name: "Boné Snapback Preto",
      description: "Boné preto ajustável com aba reta, ícone urbano, leve, moderno e sempre atual.",
      price: 79.9,
      image: "/Camisetas/camiseta-rick.svg",
    },
    {
      id: 11,
      name: "Camiseta Tie-Dye",
      description: "Camiseta com estampa tie-dye, vibrante e descontraída.",
      price: 99.9,
      image: "/Camisetas/camiseta-vader.svg",
    },
    {
      id: 12,
      name: "Camiseta Básica Preta",
      description: "Camiseta preta básica, essencial para qualquer guarda-roupa.",
      price: 69.9,
      image: "/Camisetas/camiseta-oversized.svg",
    },
  ],
  calcas: [
    {
      id: 13,
      name: "Calça Jogger Cinza",
      description: "Calça jogger de moletom cinza com punhos elásticos.",
      price: 149.9,
      image: "/Calcas/cargo.svg",
    },
    {
      id: 14,
      name: "Jeans Ripped Azul",
      description: "Calça jeans azul rasgada, estilo urbano autêntico.",
      price: 219.9,
      image: "/Calcas/cargo_shadow.svg",
    },
    {
      id: 15,
      name: "Calça Cargo Preta",
      description: "Calça cargo preta com bolsos utilitários, ideal para looks urbanos.",
      price: 199.9,
      image: "/Calcas/baggy.svg",
    },
    {
      id: 16,
      name: "Calça Wide Leg",
      description: "Calça wide leg azul clara, confortável e estilosa.",
      price: 189.9,
      image: "/Calcas/pantalona.svg",
    },
    {
      id: 17,
      name: "Calça Skinny Fit",
      description: "Calça skinny preta, ajustada e moderna.",
      price: 179.9,
      image: "/Calcas/widefit.svg",
    },
    {
      id: 18,
      name: "Calça Pantalona",
      description: "Calça pantalona bege, elegante e versátil.",
      price: 209.9,
      image: "/Calcas/pantalona.svg",
    },
  ],
  jaquetas: [
    {
      id: 16,
      name: "Jaqueta Denim Azul",
      description: "Jaqueta jeans clássica azul, atemporal e street.",
      price: 189.9,
      image: "/Jaquetas/jaqueta_branca.png",
    },
    {
      id: 17,
      name: "Jaqueta Puffer Preta",
      description: "Jaqueta puffer preta oversized, ideal para inverno.",
      price: 329.9,
      image: "/Jaquetas/jaqueta_mesclada.png",
    },
    {
      id: 18,
      name: "Jaqueta Corta-Vento",
      description: "Jaqueta corta-vento leve e resistente, ideal para dias chuvosos.",
      price: 249.9,
      image: "/Jaquetas/jaqueta_preta.png",
    },
    {
      id: 19,
      name: "Jaqueta de Couro",
      description: "Jaqueta de couro preta, clássica e sofisticada.",
      price: 399.9,
      image: "/Jaquetas/jaqueta_mesclada.png",
    },
    {
      id: 20,
      name: "Jaqueta Varsity",
      description: "Jaqueta varsity com detalhes em branco e preto, estilo colegial.",
      price: 279.9,
      image: "/Jaquetas/jaqueta_verde.png",
    },
    {
      id: 21,
      name: "Jaqueta Militar",
      description: "Jaqueta estilo militar verde oliva, resistente e funcional.",
      price: 299.9,
      image: "/Jaquetas/jaqueta_verde.png",
    },
  ],
  acessorios: [
    {
      id: 18,
      name: "Mochila Urban Preta",
      description: "Mochila preta estilo urbano, prática e resistente.",
      price: 159.9,
      image: "/Acessorios/mochila_urban.png",
    },
    {
      id: 19,
      name: "Óculos Retro Redondo",
      description: "Óculos de sol retrô com lentes escuras arredondadas.",
      price: 89.9,
      image: "/Acessorios/oculos_retro.png",
    },
    {
      id: 20,
      name: "Relógio Minimalista",
      description: "Relógio de pulso minimalista com pulseira de couro.",
      price: 199.9,
      image: "/Acessorios/relogio_simples.png",
    },
    {
      id: 21,
      name: "Carteira Slim",
      description: "Carteira slim de couro, compacta e prática.",
      price: 79.9,
      image: "/Acessorios/carteira_slim.png",
    },
    {
      id: 22,
      name: "Cinto de Tecido",
      description: "Cinto de tecido ajustável, ideal para looks casuais.",
      price: 49.9,
      image: "/Acessorios/relogio_simples.png",
    },
    {
      id: 23,
      name: "Chapéu Fedora",
      description: "Chapéu fedora preto, elegante e clássico.",
      price: 129.9,
      image: "/Acessorios/carteira_slim.png",
    },
  ],
}

export default function HomePage() {
  const router = useRouter();

  const handleProfileNavigation = () => {
    router.push("/profile");
  };

  const handleLogout = () => {
    // Implementar lógica de logout
    console.log("Usuário deslogado");
  };

  return (
    <div className="min-h-screen">
      <Header
        onCategoryClick={(category) => router.push(`/filter?category=${category}`)}
        onAvatarClick={() => {
          const dropdown = document.getElementById("avatar-dropdown");
          dropdown?.classList.toggle("hidden");
        }}
      />
      <div id="avatar-dropdown" className="hidden absolute right-4 mt-2 bg-white shadow-md rounded">
        <button onClick={handleProfileNavigation} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Ver Perfil
        </button>
        <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Sair
        </button>
      </div>
      <main>
        {/* Hero Banner */}
        <HeroBanner />
        {/* Benefits Bar */}
        <BenefitsBar />
        {/* Product Sections */}
        <div className="container mx-auto px-4 py-2 space-y-2">
          <ProductCarousel title="Mais Vendidos" products={products.maisVendidos} />
          <ProductCarousel title="Camisetas Streetwear" products={products.camisetas} />
          <ProductCarousel title="Calças Largas" products={products.calcas} />
          <ProductCarousel title="Jaquetas Oversized" products={products.jaquetas} />
          <ProductCarousel title="Acessórios" products={products.acessorios} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
