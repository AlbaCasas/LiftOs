"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldError } from "@/components/ui/field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { signUpCoach } from "../application/actions";
import { ContinueWithOAuth } from "./continue-with-oauth";

export const SignUpForm = () => {
  const t = useTranslations("Auth");
  const [state, action, pending] = useActionState(signUpCoach, undefined);

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{t("signUpTitle")}</CardTitle>
          <CardDescription>{t("signUpDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ContinueWithOAuth />
          <div className="relative">
            <Separator />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="bg-card px-2 text-xs text-muted-foreground">
                {t("or")}
              </span>
            </span>
          </div>
          <form action={action} className="flex flex-col gap-4" noValidate>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>
            {state?.message ? <FieldError>{state.message}</FieldError> : null}
            <Button type="submit" size="lg" className="w-full" disabled={pending}>
              {pending ? t("submitting") : t("submitSignUp")}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              <Link href="/sign-in" className="underline-offset-4 hover:underline">
                {t("toSignIn")}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
