import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="flex items-center group relative">
        <Home className="h-6 w-6 text-primary-foreground absolute opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        <Image
          src="/Branding/logo-oficial.svg"
          alt="Mingru"
          width={50}
          height={50}
          className="object-cover transition-transform duration-200 transform translate-x-0 group-hover:translate-x-7 bg-primary-foreground/90 rounded-full"
        />
      </div>
    </Link>
  );
}
