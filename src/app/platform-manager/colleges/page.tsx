import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import CreateCollegeDialog from "@/components/platform-manager/create-college-dialog";

export default async function ManageCollegesPage() {
  const colleges = await db.college.findMany({
    include: {
      users: {
        where: { role: "COLLEGE_ADMIN" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Colleges</h1>
        <CreateCollegeDialog />
      </div>

      <div className="bg-white border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>College Name</TableHead>
              <TableHead>Admin Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {colleges.map((college) => (
              <TableRow key={college.id}>
                <TableCell className="font-medium">{college.name}</TableCell>
                <TableCell>
                  {college.users[0]?.email || <span className="text-gray-400">No admin assigned</span>}
                </TableCell>
                <TableCell>
                  {college.isActive ? (
                    <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-semibold">
                      Active
                    </span>
                  ) : (
                    <span className="text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-semibold">
                      Inactive
                    </span>
                  )}
                </TableCell>
                <TableCell>{new Date(college.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
            {colleges.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  No colleges found. Create one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
