"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function AdminLogoutButton() {
  return (
    <Button 
      variant="outline" 
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      Logout
    </Button>
  );
}
