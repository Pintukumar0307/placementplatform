import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, FileText, Briefcase, Calendar, Video, Network } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function StudentHome() {
  const session = await getServerSession(authOptions);
  const collegeId = session?.user.collegeId as string;
  
  const jobsCount = await db.job.count({ where: { collegeId, isPublished: true } });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Generate Resume</h2>
          <p className="text-sm text-gray-600 mt-1">Click here to generate resume for your profile.</p>
        </div>
        <Link href="/resumes" className="bg-white p-3 rounded-full shadow-sm hover:shadow transition-shadow">
          <FileText className="w-6 h-6 text-orange-600" />
        </Link>
      </div>

      {/* Quick Links Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/placements" className="block group">
          <Card className="hover:border-orange-200 transition-colors h-full">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Placements</h3>
                <p className="text-xs text-gray-500 mt-1">{jobsCount} Active Opportunities</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/events" className="block group">
          <Card className="hover:border-orange-200 transition-colors h-full">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Events</h3>
                <p className="text-xs text-gray-500 mt-1">Campus Events</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/expert-sessions" className="block group">
          <Card className="hover:border-orange-200 transition-colors h-full">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Expert Sessions</h3>
                <p className="text-xs text-gray-500 mt-1">Mentorship & Talks</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/more" className="block group">
          <Card className="hover:border-orange-200 transition-colors h-full">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 bg-gray-50 text-gray-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Network className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">My Network</h3>
                <p className="text-xs text-gray-500 mt-1">Connect with alumni</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

    </div>
  );
}
