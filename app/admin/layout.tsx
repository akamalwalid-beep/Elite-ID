import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const adminId = cookieStore.get("elite-admin")?.value;

  if (!adminId) {
    redirect("/login");
  }

  const admin = await prisma.admin.findUnique({
    where: {
      id: Number(adminId),
    },
  });

  if (!admin || admin.role !== "ADMIN" && admin.role !== "OWNER") {
    redirect("/login");
  }

  return <>{children}</>;
}