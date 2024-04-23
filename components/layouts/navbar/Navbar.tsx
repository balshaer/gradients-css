import GithubButton from "@/components/common/githubButton/GithubButton";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <header>
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link
          href={"/"}
          className=" font-bold text-xl bg-gradient-to-r from-[#bf5ae0] via-[#9400D3] to-[#a811da] inline-block text-transparent bg-clip-text"
        >
          Gradients CSS
        </Link>
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
