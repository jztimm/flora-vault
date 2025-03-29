"use client";

import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex w-full h-24 px-10 pt-2 items-center justify-between bg-[#f0ece6]">
      {/* Logo */}
      <h1
        className="text-4xl font-bold tracking-tight text-foreground cursor-pointer"
        onClick={() => (window.location.href = "/")}
      >
        FloralVault
      </h1>

      {/* Searchbar */}
      <div className="relative w-1/2">
        <Input
          type="text"
          placeholder="Search plants, users, or ailments..."
          className="pr-10 rounded-2xl bg-white border-0"
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 cursor-pointer" />
      </div>

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
