import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { verifyPassword } from "@/features/auth/infrastructure/password";
import { coachRepository } from "@/features/auth/infrastructure/postgres-coaches";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/sign-in" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        const email =
          typeof credentials.email === "string"
            ? credentials.email.toLowerCase().trim()
            : "";
        const password =
          typeof credentials.password === "string" ? credentials.password : "";
        if (!email || !password) return null;

        const user = await coachRepository.findByEmail(email);
        if (!user?.passwordHash) return null;

        const ok = await verifyPassword(password, user.passwordHash);
        if (!ok) return null;

        return { id: user.id, email: user.email };
      },
    }),
  ],
  callbacks: {
    signIn({ account, user }) {
      if (account?.provider === "google") return Boolean(user.email);
      return true;
    },
    async jwt({ token, user, account }) {
      if (account?.provider === "google") {
        const email =
          typeof user.email === "string" ? user.email.toLowerCase().trim() : "";
        if (!email) return token;
        const coach = await coachRepository.findOrCreateByEmail(email);
        token.sub = coach.id;
        return token;
      }
      if (user?.id) token.sub = user.id;
      return token;
    },
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      return session;
    },
  },
});
