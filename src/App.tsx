import "animate.css";
import "../app/css/globals.css";
import AppRoutes from "@/routes/__routes";
import { inject } from "@vercel/analytics";
import { Toaster } from "@/components/ui/toaster";
import GridBackground from "@/components/ui/GridBackground";

const App: React.FC = () => {
  inject();

  return (
    <div dir="ltr" className="App relative min-h-screen overflow-x-hidden">
      <GridBackground />
      <Toaster />
      <AppRoutes />
    </div>
  );
};

export default App;
