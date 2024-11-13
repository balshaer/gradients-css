import "animate.css";
import "../app/css/globals.css";
import AppRoutes from "@/routes/__routes";
import { inject } from "@vercel/analytics";

import { Toaster } from "@/components/ui/toaster";

const App: React.FC = () => {
  inject();

  return (
    <div dir="ltr" className="App">
      <Toaster />
      <AppRoutes />
    </div>
  );
};

export default App;
