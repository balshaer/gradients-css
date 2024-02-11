/* eslint-disable @next/next/no-img-element */

import VercelIcon from "@/app/assets/vercel.png";
import NextJSIcon from "@/app/assets/nextjs.png";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="h-20 w-full max-sm:gap-5  flex justify-between items-center  text-sm border-t-2 border-[#edf0f15f]  max-sm:flex-col max-md:py-5">
      <div className="flex gap-2 max-sm:flex-col  text-[var(--color-paragraph)] items-center justify-center font-medium ">
        <span>Built with:</span>

        <div className="flex gap-4">
          <a href="https://nextjs.org/" target="_blank">
            <div className="flex items-center justify-center gap-1 opacity-70 cursor-pointer hover:text-white hoverd hover:opacity-100 ">
              <span>Next JS</span>

              <span className="flex ">
                <Image
                  src={NextJSIcon}
                  width={20}
                  height={20}
                  className="object-contain"
                  alt="Picture of the author"
                />
              </span>
            </div>
          </a>

          <a target="_blank" href="https://vercel.com/">
            <div className="flex items-center justify-center gap-1 opacity-70 cursor-pointer hover:text-white hoverd hover:opacity-100">
              <span>Vercel</span>

              <span className="flex ">
                <Image
                  src={VercelIcon}
                  width={18}
                  height={18}
                  className="object-contain"
                  alt="Picture of the author"
                />
              </span>
            </div>
          </a>
        </div>
      </div>

      <a target="_blank" href="https://github.com/balshaer/gradients-css">
        <div className="flex gap-2 text-[var(--color-paragraph)] font-medium hoverd  cursor-pointer hover:text-white">
          <span>Contribute to this project</span>

          <span className="cursor-pointer">
            <FaGithub className="h-5 w-5" />
          </span>
        </div>
      </a>
    </footer>
  );
}

export default Footer;
