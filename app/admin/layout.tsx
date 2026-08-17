// D:\Elite-ID\frontend\app\admin\layout.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const adminCookie =
    cookieStore.get("elite-admin")?.value;

  if (!adminCookie) {
    redirect("/login");
  }

  const adminId = Number(adminCookie);

  if (
    !Number.isInteger(adminId) ||
    adminId <= 0
  ) {
    redirect("/login");
  }

  const admin = await prisma.admin.findUnique({
    where: {
      id: adminId,
    },
    select: {
      id: true,
      username: true,
      role: true,
    },
  });

  if (
    !admin ||
    (admin.role !== "ADMIN" &&
      admin.role !== "OWNER")
  ) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}