import { myWebsite } from "@/data/links";
import { ExternalLinkIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer container flex h-[64px] items-center justify-between max-md:flex-col max-md:gap-3 max-md:py-10 max-md:text-center">
      <p className="flex items-center justify-center text-sm">
        Devlop by{" "}
        <a
          target="_blank"
          className="hoverd flex items-center justify-center ps-1 font-medium text-blue-500 hover:text-blue-400"
          href={myWebsite}
        >
          Baraa
          <ExternalLinkIcon className="ms-1 h-3 w-3" />
        </a>
      </p>

      <div>
        <p className="text-xs text-gray-500 max-md:pb-6">
          &copy; {new Date().getFullYear()} GradientsCSS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
