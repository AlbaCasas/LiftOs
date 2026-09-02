import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { SignInForm } from "@/features/auth/ui/sign-in-form";

export default async function SignInPage() {
  const session = await auth();
  if (session?.user?.id) redirect("/athletes");
  return <SignInForm />;
}
