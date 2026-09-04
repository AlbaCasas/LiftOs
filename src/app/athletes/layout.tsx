import { Shell } from "@/components/common/shell";
import { requireCoachId } from "@/features/auth/application/require-coach";

export default async function AthletesLayout({
  children,
}: LayoutProps<"/athletes">) {
  await requireCoachId();
  return <Shell>{children}</Shell>;
}
