"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createSessionAction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "COLLEGE_ADMIN" || !session.user.collegeId) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const expertName = formData.get("expertName") as string;
  const dateStr = formData.get("date") as string;
  const timeStr = formData.get("time") as string;
  const description = formData.get("description") as string;

  if (!title || !expertName || !dateStr || !timeStr) {
    throw new Error("Missing required fields");
  }

  const date = new Date(`${dateStr}T${timeStr}`);

  try {
    await db.expertSession.create({
      data: {
        title,
        expertName,
        date,
        description,
        collegeId: session.user.collegeId,
      },
    });

    revalidatePath("/admin/expert-sessions");
    revalidatePath("/expert-sessions");
    return { success: true };
  } catch (error) {
    console.error("Error creating expert session:", error);
    throw new Error("Failed to create expert session");
  }
}
