import { myWebsite } from "@/data/links";
import { ExternalLinkIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="container mx-auto flex h-16 items-center justify-between gap-2 px-4 py-4
      max-md:flex-col max-md:h-auto max-md:gap-2 max-md:text-center max-md:items-center max-md:justify-center">
      <p className="flex items-center text-sm text-primary">
        Developed by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center ps-1 font-medium text-[var(--link)] hover:text-[var(--link-hover)]"
          href={myWebsite}
        >
          Baraa
          <ExternalLinkIcon className="ms-1 h-3 w-3" />
        </a>
      </p>
      <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} GradientsCSS. All rights reserved.</p>
    </footer>
  );
}
