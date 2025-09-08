import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise, { databaseName: "mingruDB" }),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise
        const db = client.db("mingruDB")

        const user = await db
          .collection("users")
          .findOne({ email: credentials?.email })

        if (!user) throw new Error("Usuário não encontrado")

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        )
        if (!isValid) throw new Error("Senha incorreta")

        // Remove o campo de senha antes de retornar
        const { password, ...safeUser } = user
        return safeUser as any
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.id = token.sub
        }
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // usa sua página de login
  },
})

export { handler as GET, handler as POST }
