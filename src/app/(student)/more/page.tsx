import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Briefcase, 
  Calendar, 
  Video, 
  Network, 
  User, 
  Key, 
  HelpCircle, 
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import LogoutButton from "@/components/student/logout-button";

export default async function MorePage() {
  const session = await getServerSession(authOptions);
  
  if (!session) return null;

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { studentProfile: true }
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Profile Header */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border shadow-sm">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-500">
          {user?.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
          <p className="text-sm text-gray-500">{user?.studentProfile?.course || "Student"}</p>
          <Link href="/profile" className="text-orange-600 text-sm font-medium hover:underline">
            View Profile
          </Link>
        </div>
      </div>

      {/* Main Links */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            <Link href="/resumes" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">Generate Resume</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link href="/placements" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">Placements</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link href="/events" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">Events</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link href="/expert-sessions" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">Expert Sessions</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link href="/network" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Network className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">My Network</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <h3 className="font-bold text-gray-900 px-2 mt-8 mb-2">Account</h3>
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            <Link href="/profile" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">Profile</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link href="/change-password" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Key className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">Change Password</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link href="/support" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">Support</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            
            <LogoutButton />

          </div>
        </CardContent>
      </Card>

    </div>
  );
}
