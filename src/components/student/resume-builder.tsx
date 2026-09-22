"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { saveResumeAction } from "@/actions/resumes";
import { useRouter } from "next/navigation";

export default function ResumeBuilder() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Basic resume state
  const [resumeData, setResumeData] = useState({
    name: "Master 1 Pager",
    personalInfo: { email: "", phone: "", linkedin: "" },
    education: [{ institution: "", degree: "", year: "" }],
    experience: [{ company: "", role: "", duration: "", description: "" }],
    skills: ""
  });

  async function handleSave() {
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", resumeData.name);
      formData.append("content", JSON.stringify(resumeData));
      
      const res = await saveResumeAction(formData);
      if (res.success) {
        router.push("/resumes");
      }
    } catch (err: any) {
      setError(err.message || "Failed to save resume");
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Editor Side */}
      <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2">
        {error && <div className="text-red-500 font-medium">{error}</div>}
        
        <Card>
          <CardHeader><CardTitle>Resume Name</CardTitle></CardHeader>
          <CardContent>
            <Input 
              value={resumeData.name}
              onChange={(e) => setResumeData({...resumeData, name: e.target.value})}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Personal Info</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input 
                value={resumeData.personalInfo.email}
                onChange={(e) => setResumeData({...resumeData, personalInfo: {...resumeData.personalInfo, email: e.target.value}})}
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input 
                value={resumeData.personalInfo.phone}
                onChange={(e) => setResumeData({...resumeData, personalInfo: {...resumeData.personalInfo, phone: e.target.value}})}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Education</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Institution</Label>
              <Input 
                value={resumeData.education[0].institution}
                onChange={(e) => {
                  const newEd = [...resumeData.education];
                  newEd[0].institution = e.target.value;
                  setResumeData({...resumeData, education: newEd});
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Degree</Label>
                <Input 
                  value={resumeData.education[0].degree}
                  onChange={(e) => {
                    const newEd = [...resumeData.education];
                    newEd[0].degree = e.target.value;
                    setResumeData({...resumeData, education: newEd});
                  }}
                />
              </div>
              <div>
                <Label>Graduation Year</Label>
                <Input 
                  value={resumeData.education[0].year}
                  onChange={(e) => {
                    const newEd = [...resumeData.education];
                    newEd[0].year = e.target.value;
                    setResumeData({...resumeData, education: newEd});
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
          <CardContent>
            <Input 
              placeholder="e.g. React, Node.js, Python"
              value={resumeData.skills}
              onChange={(e) => setResumeData({...resumeData, skills: e.target.value})}
            />
          </CardContent>
        </Card>
        
        <Button onClick={handleSave} disabled={loading} className="w-full bg-orange-600 hover:bg-orange-700">
          {loading ? "Saving..." : "Save Resume"}
        </Button>
      </div>

      {/* Preview Side */}
      <div className="hidden lg:block bg-white border shadow-sm h-[80vh] p-8 overflow-y-auto rounded-lg">
        <h2 className="text-xl font-bold border-b pb-2 mb-4 text-center">{resumeData.name || "Untitled Resume"}</h2>
        
        <div className="text-center mb-6">
          <p className="text-sm">{resumeData.personalInfo.email} | {resumeData.personalInfo.phone}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-bold border-b border-gray-300 mb-2 uppercase text-sm tracking-wider">Education</h3>
          <div className="flex justify-between">
            <span className="font-medium">{resumeData.education[0].institution || "University Name"}</span>
            <span className="text-sm">{resumeData.education[0].year || "Year"}</span>
          </div>
          <p className="text-sm">{resumeData.education[0].degree || "Degree"}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-bold border-b border-gray-300 mb-2 uppercase text-sm tracking-wider">Skills</h3>
          <p className="text-sm">{resumeData.skills || "Add some skills..."}</p>
        </div>
      </div>
    </div>
  );
}
