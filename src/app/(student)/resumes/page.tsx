import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit2, FileText, CheckCircle, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function ResumesPage() {
  const session = await getServerSession(authOptions);
  const studentId = session?.user.id as string;
  const collegeId = session?.user.collegeId as string;

  const resumes = await db.resume.findMany({
    where: { studentId, collegeId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Resumes</h1>
        <Link href="/resumes/build">
          <Button className="bg-orange-600 hover:bg-orange-700 gap-2">
            <Plus className="w-4 h-4" /> Create Resume
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resumes.map((resume) => (
          <Card key={resume.id} className="relative overflow-hidden group">
            {resume.isDefault && (
              <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Default
              </div>
            )}
            <CardContent className="p-6 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-1">{resume.name}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Created {new Date(resume.createdAt).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md">
                    {resume.status}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 pt-4 border-t opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Edit2 className="w-3 h-3" /> Edit
                </Button>
                <Button variant="destructive" size="sm" className="px-2">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {resumes.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No Resumes Found</h3>
            <p className="text-gray-500 mb-4">Create your first resume to apply for placements.</p>
            <Link href="/resumes/build">
              <Button className="bg-orange-600 hover:bg-orange-700 gap-2">
                <Plus className="w-4 h-4" /> Create Resume
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
