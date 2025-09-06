import Link from "next/link"
import { Facebook, Instagram, Twitter, Shirt, User, Star, Gift, Phone, HelpCircle, RefreshCw, Truck, Shield, FileText, Cookie } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-/50 border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img src="/logo-oficial.svg" alt="Mingru Logo" className="h-18 w-18" />
              <div className="text-3xl font-bold text-primary-foreground">Mingru</div>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              Mingru nasce do conceito de migrar — evoluir, transformar e se reinventar. Um streetwear único, com qualidade premium, personalidade marcante e atitude que atravessa gerações.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary-foreground">Categorias</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/categoria/camisetas" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Shirt className="h-4 w-4" />
                  <span>Camisetas</span>
                </Link>
              </li>
              <li>
                <Link href="/categoria/calcas" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <User className="h-4 w-4" />
                  <span>Calças</span>
                </Link>
              </li>
              <li>
                <Link href="/categoria/calcados" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Star className="h-4 w-4" />
                  <span>Calçados</span>
                </Link>
              </li>
              <li>
                <Link href="/categoria/acessorios" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Gift className="h-4 w-4" />
                  <span>Acessórios</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary-foreground">Suporte</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/contato" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>Contato</span>
                </Link>
              </li>
              <li>
                <Link href="/faq" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <HelpCircle className="h-4 w-4" />
                  <span>FAQ</span>
                </Link>
              </li>
              <li>
                <Link href="/trocas" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <RefreshCw className="h-4 w-4" />
                  <span>Trocas e Devoluções</span>
                </Link>
              </li>
              <li>
                <Link href="/entrega" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Truck className="h-4 w-4" />
                  <span>Entrega</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary-foreground">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacidade" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Shield className="h-4 w-4" />
                  <span>Política de Privacidade</span>
                </Link>
              </li>
              <li>
                <Link href="/termos" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <FileText className="h-4 w-4" />
                  <span>Termos de Uso</span>
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Cookie className="h-4 w-4" />
                  <span>Cookies</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Mingru. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
