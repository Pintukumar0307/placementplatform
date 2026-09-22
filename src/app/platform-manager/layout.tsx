import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import AdminLogoutButton from "@/components/admin/logout-button";

export default async function PlatformManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "PLATFORM_MANAGER") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-bold text-orange-600">Platform Admin</h2>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          <Link href="/platform-manager" className="px-4 py-2 hover:bg-gray-100 rounded-md">
            Dashboard
          </Link>
          <Link href="/platform-manager/colleges" className="px-4 py-2 hover:bg-gray-100 rounded-md">
            Manage Colleges
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-end mb-6">
          <AdminLogoutButton />
        </div>
        {children}
      </main>
    </div>
  );
}
