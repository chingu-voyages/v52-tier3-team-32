"use client";

import { SignOutButton } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { PowerIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

function SignOutLink() {
  const { toast } = useToast();
  const handleLogout = () => {
    toast({ description: "You have been signed out." });
  };

  return (
    <SignOutButton redirectUrl="/">
      <Button variant={"outline"} onClick={handleLogout}>
        <PowerIcon />
        Sign out
      </Button>
    </SignOutButton>
  );
}

export default SignOutLink;
