import Header from "@/components/layouts/header/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <ScrollArea className="h-full min-h-[100vh] w-full  border p-4 max-w-7xl m-auto">
        <Header />
      </ScrollArea>
    </main>
  );
}
