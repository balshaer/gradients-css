import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { NumberTicker } from "../ui/NumberTicker";

const HeroUsers = () => {
  const avatars = [
    "https://bundui-images.netlify.app/avatars/01.png",
    "https://bundui-images.netlify.app/avatars/03.png",
    "https://bundui-images.netlify.app/avatars/05.png",
    "https://bundui-images.netlify.app/avatars/06.png",
  ];

  const StarIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="orange"
      stroke="orange"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-star h-5 w-5"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );

  const Avatar = ({ src }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
      <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
        {isLoading && <Skeleton className="h-10 w-10" />}
        <img
          alt="shadcn ui kit avatar"
          src={src}
          onLoad={() => setIsLoading(false)}
          className={isLoading ? "hidden" : "block"}
        />
      </span>
    );
  };

  return (
    <div>
      <div className="mt-3 flex flex-col gap-4 lg:flex-row">
        <div className="flex justify-center -space-x-4">
          {avatars.map((avatar, index) => (
            <Avatar key={index} src={avatar} />
          ))}
        </div>
        <div className="flex flex-col">
          <span className="mt-1 flex justify-center gap-1 lg:justify-start">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon key={index} />
            ))}
          </span>
          <span className="text-sm text-muted-foreground">
            More than
            <NumberTicker value={50} />+ happy users
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroUsers;
