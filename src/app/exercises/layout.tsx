import { Shell } from "@/components/common/shell";
import { requireCoachId } from "@/features/auth/application/require-coach";

export default async function ExercisesLayout({
  children,
}: LayoutProps<"/exercises">) {
  await requireCoachId();
  return <Shell>{children}</Shell>;
}
