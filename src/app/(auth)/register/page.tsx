import { db } from "@/lib/db";
import RegisterForm from "@/components/auth/register-form";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const colleges = await db.college.findMany({
    where: { isActive: true },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <RegisterForm colleges={colleges} />
    </div>
  );
}
