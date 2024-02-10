import Gradients from "@/components/layouts/gradients/Gradients";
import Header from "@/components/layouts/header/Header";
import { ScrollArea } from "@/components/ui/scroll-area";



export default function Home() {
  return (
    <main>
      <ScrollArea className="h-full min-h-[100vh] w-full   p-4 max-w-7xl m-auto">
        <Header />

        <Gradients />
      </ScrollArea>
    </main>
  );
}
