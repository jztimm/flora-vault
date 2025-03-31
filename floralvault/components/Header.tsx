"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      router.push(`/results?query=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <div className="bg-[#2b2a2a] flex w-full h-24 px-10 pt-2 items-center justify-between ">
      {/* Logo */}
      <h1
        className="text-4xl text-white font-bold tracking-tight cursor-pointer"
        onClick={() => (window.location.href = "/")}
      >
        <span className="bg-gradient-to-r from-[#dab9df] to-[#e5b3ec] bg-clip-text text-transparent">
          Floral
        </span>
        <span className="text-[#81a308]">Vault</span>
      </h1>

      {/* Searchbar */}
      <form onSubmit={handleSearch} className="relative w-1/2">
        <Input
          type="text"
          placeholder="Search plants, users, tags, or ailments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10 rounded-2xl bg-white border-0"
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 cursor-pointer" />
      </form>

      {/* Login */}
      <Link href="/login">
        <Button className="bg-primary text-primary-foreground hover:bg-ring rounded-2xl px-4 py-2 font-semibold transition-colors duration-200 ease-in-out cursor-pointer">
          Login
        </Button>
      </Link>
    </div>
  );
};

export default Header;
