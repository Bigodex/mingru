import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("mingruDB"); // use o mesmo banco que você padronizou
        const user = await db.collection("users").findOne({ email: credentials?.email });

        if (!user) throw new Error("Usuário não encontrado");

        const isValid = await bcrypt.compare(credentials!.password, user.password);
        if (!isValid) throw new Error("Senha incorreta");

        const { password, ...safeUser } = user;
        return safeUser as any;
      },
    }),
  ],
  session: {
    strategy: "jwt", // mantém sessão via token
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
