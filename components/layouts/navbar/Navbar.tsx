import GithubButton from "@/components/common/githubButton/GithubButton";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <header>
      <div className="mx-auto flex h-16  items-center gap-8  ">
   
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block"></nav>
          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <span>
                <GithubButton />
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
