import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { revalidatePath } from "next/cache";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

async function updateCollegeProfile(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const collegeId = session?.user.collegeId;

  if (!session || session.user.role !== "COLLEGE_ADMIN" || !collegeId) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const city = formData.get("city") as string;
  const website = formData.get("website") as string;

  await db.college.update({
    where: { id: collegeId },
    data: { name, address, city, website },
  });

  revalidatePath("/admin/profile");
}

export default async function CollegeProfilePage() {
  const session = await getServerSession(authOptions);
  const collegeId = session?.user.collegeId as string;

  const college = await db.college.findUnique({
    where: { id: collegeId },
  });

  if (!college) return <div>College not found</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">College Profile</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Profile Configuration</CardTitle>
          <CardDescription>Update your college details here. These details will be visible to students.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateCollegeProfile} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">College Name</Label>
              <Input id="name" name="name" defaultValue={college.name} required />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" defaultValue={college.address || ""} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" defaultValue={college.city || ""} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" name="website" type="url" defaultValue={college.website || ""} />
            </div>

            <div className="pt-4">
              <Button type="submit" className="bg-orange-600 hover:bg-orange-700">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
