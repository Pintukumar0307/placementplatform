"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function createCollegeAction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "PLATFORM_MANAGER") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const adminEmail = formData.get("adminEmail") as string;
  const adminPassword = formData.get("adminPassword") as string;

  if (!name || !adminEmail || !adminPassword) {
    throw new Error("Missing required fields");
  }

  // Check if email is already taken
  const existingUser = await db.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  try {
    await db.$transaction(async (tx) => {
      // 1. Create College
      const college = await tx.college.create({
        data: {
          name,
        },
      });

      // 2. Create College Admin
      await tx.user.create({
        data: {
          email: adminEmail,
          passwordHash: hashedPassword,
          name: "College Admin",
          role: "COLLEGE_ADMIN",
          collegeId: college.id,
        },
      });
    });

    revalidatePath("/platform-manager/colleges");
    return { success: true };
  } catch (error) {
    console.error("Error creating college:", error);
    throw new Error("Failed to create college");
  }
}
