"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { JobType } from "@prisma/client";

export async function createJobAction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "COLLEGE_ADMIN" || !session.user.collegeId) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const companyName = formData.get("companyName") as string;
  const jobType = formData.get("jobType") as JobType;
  const ctc = formData.get("ctc") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const eligibility = formData.get("eligibility") as string;
  const deadlineStr = formData.get("deadline") as string;

  if (!title || !companyName || !jobType) {
    throw new Error("Missing required fields");
  }

  try {
    await db.job.create({
      data: {
        title,
        companyName,
        jobType,
        ctc,
        location,
        description,
        eligibility,
        deadline: deadlineStr ? new Date(deadlineStr) : null,
        collegeId: session.user.collegeId,
        isPublished: true, // Auto publish for simplicity, or we can add a toggle
      },
    });

    revalidatePath("/admin/jobs");
    revalidatePath("/placements"); // Revalidate student view
    return { success: true };
  } catch (error) {
    console.error("Error creating job:", error);
    throw new Error("Failed to create job");
  }
}
