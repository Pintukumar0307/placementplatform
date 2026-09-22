import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

import AdminLogoutButton from "@/components/admin/logout-button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "COLLEGE_ADMIN" || !session.user.collegeId) {
    redirect("/login");
  }

  const college = await db.college.findUnique({
    where: { id: session.user.collegeId },
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-orange-600 truncate" title={college?.name}>
            {college?.name || "College Admin"}
          </h2>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          <Link href="/admin" className="px-4 py-2 hover:bg-gray-100 rounded-md">
            Dashboard
          </Link>
          <Link href="/admin/profile" className="px-4 py-2 hover:bg-gray-100 rounded-md">
            College Profile
          </Link>
          <Link href="/admin/students" className="px-4 py-2 hover:bg-gray-100 rounded-md">
            Students
          </Link>
          <Link href="/admin/jobs" className="px-4 py-2 hover:bg-gray-100 rounded-md">
            Jobs
          </Link>
          <Link href="/admin/applications" className="px-4 py-2 hover:bg-gray-100 rounded-md">
            Applications
          </Link>
          <Link href="/admin/resumes" className="px-4 py-2 hover:bg-gray-100 rounded-md">
            Resumes
          </Link>
          <Link href="/admin/expert-sessions" className="px-4 py-2 hover:bg-gray-100 rounded-md">
            Expert Sessions
          </Link>
          <Link href="/admin/events" className="px-4 py-2 hover:bg-gray-100 rounded-md">
            Events
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-end mb-6">
          <AdminLogoutButton />
        </div>
        {children}
      </main>
    </div>
  );
}
