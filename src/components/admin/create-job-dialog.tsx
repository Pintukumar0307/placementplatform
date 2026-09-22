"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createJobAction } from "@/actions/jobs";

export default function CreateJobDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    try {
      await createJobAction(formData);
      setOpen(false);
    } catch (err: any) {
      setError(err.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-700">Add New Job</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form action={onSubmit}>
          <DialogHeader>
            <DialogTitle>Post a New Job</DialogTitle>
            <DialogDescription>
              Create a new placement opportunity for your students.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            {error && (
              <div className="text-red-500 text-sm font-medium">{error}</div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input id="companyName" name="companyName" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Job Title / Role *</Label>
              <Input id="title" name="title" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobType">Job Type *</Label>
              <select 
                id="jobType" 
                name="jobType" 
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ctc">CTC / Stipend</Label>
                <Input id="ctc" name="ctc" placeholder="e.g. 10 LPA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" placeholder="e.g. PAN India" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eligibility">Eligibility</Label>
              <Input id="eligibility" name="eligibility" placeholder="e.g. B.Tech CS 2024, 7+ CGPA" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Application Deadline</Label>
              <Input id="deadline" name="deadline" type="date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <textarea 
                id="description" 
                name="description" 
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-700">
              {loading ? "Posting..." : "Post Job"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
