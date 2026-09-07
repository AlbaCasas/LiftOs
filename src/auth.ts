import NextAuth from "next-auth";
import type { Account, Profile } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { OAuthProviderId } from "next-auth/providers";
import Google, { type GoogleProfile } from "next-auth/providers/google";

import { verifyPassword } from "@/features/auth/infrastructure/password";
import { coachRepository } from "@/features/auth/infrastructure/postgres-coaches";

const google = "google" satisfies OAuthProviderId;

const isGoogleProfile = (
  account: Account | null | undefined,
  profile?: Profile,
): profile is GoogleProfile =>
  account?.provider === google && profile != null;

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
    signIn({ account, profile }) {
      if (isGoogleProfile(account, profile)) {
        return Boolean(profile.email_verified && profile.email);
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (isGoogleProfile(account, profile)) {
        const coach = await coachRepository.findOrCreateByEmail(
          profile.email.toLowerCase().trim(),
        );
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
