"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function registerStudentAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const collegeId = formData.get("collegeId") as string;
  const studentId = formData.get("studentId") as string;

  if (!name || !email || !password || !collegeId) {
    throw new Error("Missing required fields");
  }

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          passwordHash: hashedPassword,
          role: "STUDENT",
          collegeId,
        },
      });

      await tx.studentProfile.create({
        data: {
          userId: user.id,
          studentId,
        },
      });
    });
  } catch (error) {
    console.error(error);
    throw new Error("Registration failed");
  }

  redirect("/login");
}
