import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateSessionDialog from "@/components/admin/create-session-dialog";

export default async function AdminExpertSessionsPage() {
  const session = await getServerSession(authOptions);
  const collegeId = session?.user.collegeId as string;

  const sessions = await db.expertSession.findMany({
    where: { collegeId },
    include: {
      _count: {
        select: { registrations: true },
      },
    },
    orderBy: { date: "asc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Expert Sessions</h1>
        <CreateSessionDialog />
      </div>

      <div className="bg-white border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Session Title</TableHead>
              <TableHead>Expert</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Registrations</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((sess) => (
              <TableRow key={sess.id}>
                <TableCell className="font-medium">{sess.title}</TableCell>
                <TableCell>{sess.expertName}</TableCell>
                <TableCell>{new Date(sess.date).toLocaleString()}</TableCell>
                <TableCell>{sess._count.registrations}</TableCell>
              </TableRow>
            ))}
            {sessions.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  No expert sessions scheduled.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
