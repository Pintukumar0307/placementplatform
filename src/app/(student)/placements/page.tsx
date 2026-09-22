import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, IndianRupee, Clock } from "lucide-react";
import Link from "next/link";

export default async function PlacementsPage() {
  const session = await getServerSession(authOptions);
  const collegeId = session?.user.collegeId as string;

  const jobs = await db.job.findMany({
    where: { collegeId, isPublished: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Opportunities</h1>
      
      <div className="grid gap-4">
        {jobs.map((job) => (
          <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-500 shrink-0">
                      {job.companyName.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="font-bold text-lg text-gray-900">{job.title}</h2>
                      <p className="text-gray-600 font-medium">{job.companyName}</p>
                    </div>
                  </div>
                  <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-semibold border border-green-100">
                    Eligible
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Briefcase className="w-3 h-3" /> Job Type</p>
                    <p className="font-semibold text-sm">{job.jobType.replace("_", " ")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><IndianRupee className="w-3 h-3" /> CTC</p>
                    <p className="font-semibold text-sm">{job.ctc || "Not Disclosed"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Location</p>
                    <p className="font-semibold text-sm">{job.location || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Deadline</p>
                    <p className="font-semibold text-sm">{job.deadline ? new Date(job.deadline).toLocaleDateString() : "N/A"}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Link href={`/placements/${job.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">View Details</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {jobs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No Opportunities Yet</h3>
            <p className="text-gray-500">Check back later for new placement opportunities.</p>
          </div>
        )}
      </div>
    </div>
  );
}
