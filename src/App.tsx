import "animate.css";
import "../app/css/globals.css";
import AppRoutes from "@/routes/__routes";
import { inject } from "@vercel/analytics";
import { Toaster } from "@/components/ui/toaster";
import GridBackground from "@/components/ui/GridBackground";
import Support from "./components/layouts/Support";
import { SupportWidget } from "./components/layouts/SupportWidget";

const App: React.FC = () => {
  inject();

  return (
    <div dir="ltr" className="App pb-[30px] relative min-h-screen overflow-x-hidden">
    <SupportWidget  />
      <Support/>
      <GridBackground />
      <Toaster />
      <AppRoutes />
    </div>
  );
};

export default App;
