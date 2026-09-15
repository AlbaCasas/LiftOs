import { Shell } from "@/components/common/shell";
import { requireCoachId } from "@/features/auth/application/require-coach";

export default async function BlocksLayout({
  children,
}: LayoutProps<"/blocks">) {
  await requireCoachId();
  return <Shell>{children}</Shell>;
}
