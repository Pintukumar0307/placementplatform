import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const existingManager = await db.user.findFirst({
      where: { role: "PLATFORM_MANAGER" }
    });

    if (existingManager) {
      return NextResponse.json({ message: "Platform manager already exists" });
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const manager = await db.user.create({
      data: {
        name: "Platform Manager",
        email: "manager@platform.com",
        passwordHash: hashedPassword,
        role: "PLATFORM_MANAGER"
      }
    });

    return NextResponse.json({ 
      message: "Seeded successfully", 
      email: manager.email,
      password: "admin123"
    });
  } catch (error: any) {
    console.error("SEED ERROR:", error);
    return NextResponse.json({ error: "Seed failed", details: error.message || String(error) }, { status: 500 });
  }
}
