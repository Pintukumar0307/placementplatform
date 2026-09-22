"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function saveResumeAction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "STUDENT" || !session.user.collegeId) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const content = formData.get("content") as string;

  if (!name || !content) {
    throw new Error("Missing required fields");
  }

  try {
    await db.resume.create({
      data: {
        name,
        content, // raw JSON string from builder
        studentId: session.user.id,
        collegeId: session.user.collegeId,
      },
    });
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }

  revalidatePath("/resumes");
  return { success: true };
}
