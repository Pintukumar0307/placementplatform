import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { revalidatePath } from "next/cache";
import CreateJobDialog from "@/components/admin/create-job-dialog";

async function publishJob(jobId: string, isPublished: boolean) {
  "use server";
  await db.job.update({
    where: { id: jobId },
    data: { isPublished },
  });
  revalidatePath("/admin/jobs");
}

export default async function AdminJobsPage() {
  const session = await getServerSession(authOptions);
  const collegeId = session?.user.collegeId as string;

  const jobs = await db.job.findMany({
    where: { collegeId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Jobs</h1>
        <CreateJobDialog />
      </div>

      <div className="bg-white border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>CTC</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.companyName}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.ctc || "N/A"}</TableCell>
                <TableCell>
                  {job.isPublished ? (
                    <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-semibold">Published</span>
                  ) : (
                    <span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs font-semibold">Draft</span>
                  )}
                </TableCell>
                <TableCell>
                  <form action={publishJob.bind(null, job.id, !job.isPublished)}>
                    <Button variant="outline" size="sm">
                      {job.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
            {jobs.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No jobs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
