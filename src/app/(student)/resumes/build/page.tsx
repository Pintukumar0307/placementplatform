import ResumeBuilder from "@/components/student/resume-builder";

export default function BuildResumePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Resume Builder</h1>
      <ResumeBuilder />
    </div>
  );
}
