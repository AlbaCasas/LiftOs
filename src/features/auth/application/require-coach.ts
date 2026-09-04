import { cache } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

export const requireCoachId = cache(async () => {
  const session = await auth();
  const coachId = session?.user?.id;
  if (!coachId) redirect("/sign-in");
  return coachId;
});
