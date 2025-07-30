import { useState, memo } from "react";
import { Skeleton } from "../ui/skeleton";
import { NumberTicker } from "../ui/NumberTicker";

// Memoized StarIcon
const StarIcon = memo(() => (
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
    aria-label="Star"
    role="img"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
));

// Avatar component with alt support and fade-in effect
interface AvatarProps {
  src: string;
  alt: string;
}

const Avatar = memo(({ src, alt }: AvatarProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
      {isLoading && <Skeleton className="h-10 w-10" />}
      <img
        alt={alt}
        src={src}
        onLoad={() => setIsLoading(false)}
        className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
      />
    </span>
  );
});

const avatars = [
  { src: "https://bundui-images.netlify.app/avatars/01.png", alt: "Avatar 1" },
  { src: "https://bundui-images.netlify.app/avatars/03.png", alt: "Avatar 2" },
  { src: "https://bundui-images.netlify.app/avatars/05.png", alt: "Avatar 3" },
  { src: "https://bundui-images.netlify.app/avatars/06.png", alt: "Avatar 4" },
];

const HeroUsers = () => (
  <div>
    <div className="mt-3 flex flex-col gap-4 lg:flex-row">
      <div className="flex justify-center -space-x-4">
        {avatars.map(({ src, alt }) => (
          <Avatar key={src} src={src} alt={alt} />
        ))}
      </div>
      <div className="flex flex-col justify-center">
        <span className="mt-1 flex justify-center gap-1 lg:justify-start">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <StarIcon key={i} />
            ))}
        </span>
        <span className="text-sm text-muted-foreground flex gap-1 items-center">
          More than <NumberTicker value={50} />+ happy users
        </span>
      </div>
    </div>
  </div>
);

export default HeroUsers;

