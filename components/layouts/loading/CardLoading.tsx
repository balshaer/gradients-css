import { FunctionComponent } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface CardLoadingProps {}

const CardLoading: FunctionComponent<CardLoadingProps> = () => {
  const renderSkeletons = (count: number) => {
    const skeletons = [];
    for (let i = 0; i < count; i++) {
      skeletons.push(
        <div
          key={i}
          className="h-72 rounded-3xl text-sm flex flex-col justify-start items-center bg-black p-4 gap-2 opacity-50"
        >
          <header className="w-full flex justify-between items-center h-10">
            <Skeleton className="w-[100px] h-[25px] rounded-full bg-[#edf0f170]" />
            <Skeleton className="w-[30px] h-[30px] rounded-xl bg-[#edf0f170]" />
          </header>
          <div className="h-full w-full flex justify-center items-center">
            <Skeleton className="w-[120px] h-[120px] rounded-full bg-[#edf0f170]" />
          </div>
          <footer className="flex flex-col items-start justify-start gap-4 w-full">
            <div className="flex gap-2">
              <Skeleton className="w-[30px] h-[30px] rounded-full bg-[#edf0f170]" />
              <Skeleton className="w-[30px] h-[30px] rounded-full bg-[#edf0f170]" />
              <Skeleton className="w-[30px] h-[30px] rounded-full bg-[#edf0f170]" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="w-[70px] h-[25px] rounded-3xl bg-[#edf0f170]" />
              <Skeleton className="w-[70px] h-[25px] rounded-3xl bg-[#edf0f170]" />
              <Skeleton className="w-[70px] h-[25px] rounded-3xl bg-[#edf0f170]" />
            </div>
          </footer>
        </div>
      );
    }
    return skeletons;
  };

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
      {renderSkeletons(12)}
    </section>
  );
};

export default CardLoading;
