import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { SignUpForm } from "@/features/auth/ui/sign-up-form";

export default async function SignUpPage() {
  const session = await auth();
  if (session?.user?.id) redirect("/athletes");
  return <SignUpForm />;
}
