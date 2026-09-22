import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PlatformManagerDashboard() {
  const collegesCount = await db.college.count();
  const adminsCount = await db.user.count({
    where: { role: "COLLEGE_ADMIN" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Colleges</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-orange-600">{collegesCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>College Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-orange-600">{adminsCount}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
