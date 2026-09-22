"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors text-red-600"
    >
      <div className="flex items-center gap-3">
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </div>
    </button>
  );
}
