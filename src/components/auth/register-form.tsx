"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { registerStudentAction } from "@/actions/auth";

type College = { id: string; name: string };

export default function RegisterForm({ colleges }: { colleges: College[] }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    try {
      await registerStudentAction(formData);
    } catch (err: any) {
      setError(err.message || "Registration failed");
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-orange-600">Student Registration</CardTitle>
        <CardDescription>Create your account to access placements</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={onSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-sm font-medium text-center">{error}</div>}
          
          <div className="space-y-2">
            <Label htmlFor="collegeId">Select College</Label>
            <select 
              id="collegeId" 
              name="collegeId" 
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">-- Choose your college --</option>
              {colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="John Doe" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="john@student.edu" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID / Roll Number</Label>
            <Input id="studentId" name="studentId" placeholder="e.g. 2023001" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required minLength={6} />
          </div>

          <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-gray-500">
        <p>
          Already have an account? <Link href="/login" className="text-orange-600 font-medium hover:underline">Sign in</Link>
        </p>
      </CardFooter>
    </Card>
  );
}
