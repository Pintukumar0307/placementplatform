import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { 
  Home, 
  Briefcase, 
  FileText, 
  Video, 
  Menu 
} from "lucide-react";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "STUDENT" || !session.user.collegeId) {
    redirect("/login");
  }

  const college = await db.college.findUnique({
    where: { id: session.user.collegeId },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row pb-16 md:pb-0">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r shadow-sm fixed h-full z-10">
        <div className="p-6 border-b flex items-center gap-4">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
            {college?.name?.charAt(0) || "C"}
          </div>
          <h2 className="text-sm font-bold text-gray-800 line-clamp-2">
            {college?.name || "College"}
          </h2>
        </div>
        <nav className="flex flex-col gap-2 p-4 flex-1">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 hover:text-orange-600 rounded-lg text-gray-600 font-medium transition-colors">
            <Home className="w-5 h-5" /> Home
          </Link>
          <Link href="/placements" className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 hover:text-orange-600 rounded-lg text-gray-600 font-medium transition-colors">
            <Briefcase className="w-5 h-5" /> Placements
          </Link>
          <Link href="/resumes" className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 hover:text-orange-600 rounded-lg text-gray-600 font-medium transition-colors">
            <FileText className="w-5 h-5" /> Resumes
          </Link>
          <Link href="/expert-sessions" className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 hover:text-orange-600 rounded-lg text-gray-600 font-medium transition-colors">
            <Video className="w-5 h-5" /> Expert Sessions
          </Link>
          <Link href="/more" className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 hover:text-orange-600 rounded-lg text-gray-600 font-medium transition-colors mt-auto">
            <Menu className="w-5 h-5" /> More
          </Link>
          <form action="/api/auth/signout" method="POST" className="mt-2">
             <button type="submit" className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg text-gray-600 font-medium transition-colors">
                 Logout
             </button>
          </form>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 relative min-h-screen">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b p-4 flex items-center gap-3 sticky top-0 z-10 shadow-sm">
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">
            {college?.name?.charAt(0) || "C"}
          </div>
          <h1 className="font-bold text-gray-800 line-clamp-1 flex-1">{college?.name}</h1>
          <div className="w-8 h-8 rounded-full bg-gray-200"></div> {/* Avatar Placeholder */}
        </header>

        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t flex justify-around p-2 z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Link href="/" className="flex flex-col items-center p-2 text-gray-500 hover:text-orange-600">
          <Home className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/placements" className="flex flex-col items-center p-2 text-gray-500 hover:text-orange-600">
          <Briefcase className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Placements</span>
        </Link>
        <Link href="/resumes" className="flex flex-col items-center p-2 text-gray-500 hover:text-orange-600">
          <FileText className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Resumes</span>
        </Link>
        <Link href="/expert-sessions" className="flex flex-col items-center p-2 text-gray-500 hover:text-orange-600">
          <Video className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Sessions</span>
        </Link>
        <Link href="/more" className="flex flex-col items-center p-2 text-gray-500 hover:text-orange-600">
          <Menu className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">More</span>
        </Link>
      </nav>
    </div>
  );
}
