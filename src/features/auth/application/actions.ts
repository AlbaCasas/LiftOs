"use server";

import { AuthError } from "next-auth";
import { getTranslations } from "next-intl/server";

import { signIn, signOut } from "@/auth";
import { hashPassword } from "../infrastructure/password";
import { coachRepository } from "../infrastructure/postgres-coaches";

const emailAndPassword = (credentials: FormData) => ({
  email: String(credentials.get("email") ?? "")
    .toLowerCase()
    .trim(),
  password: String(credentials.get("password") ?? ""),
});

export const signInCoach = async (
  _state: { message?: string } | undefined,
  signinData: FormData,
) => {
  const t = await getTranslations("Auth");
  const { email, password } = emailAndPassword(signinData);
  if (!email || !password) return { message: t("invalid") };

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/athletes",
    });
  } catch (error) {
    if (error instanceof AuthError) return { message: t("invalid") };
    throw error;
  }
};

export const signUpCoach = async (
  _state: { message?: string } | undefined,
  signupData: FormData,
) => {
  const t = await getTranslations("Auth");
  const { email, password } = emailAndPassword(signupData);
  if (!email || !password) return { message: t("invalid") };
  if (password.length < 8) return { message: t("passwordHint") };

  if (await coachRepository.findByEmail(email)) {
    return { message: t("emailTaken") };
  }

  try {
    await coachRepository.create({
      id: crypto.randomUUID(),
      email,
      passwordHash: await hashPassword(password),
    });
  } catch {
    return { message: t("failed") };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/athletes",
    });
  } catch (error) {
    if (error instanceof AuthError) return { message: t("failed") };
    throw error;
  }
};

export const signOutCoach = async () => {
  await signOut({ redirectTo: "/sign-in" });
};
