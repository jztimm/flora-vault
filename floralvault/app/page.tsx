import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#f0e7d8] to-[#f9f3e6] gap-2">
      <h1>Floral Vault</h1>
      <Button className="bg-[#78bc7efe] text-[#000000] hover:bg-[#37945bdd] hover:text-[#000d]">
        Sample Text
      </Button>
    </div>
  );
}
