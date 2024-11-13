import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import { motion } from "framer-motion";

// Lazy load components for better performance
const HomePage = React.lazy(() => import("@/pages/HomePage"));
const NotFoundPage = React.lazy(() => import("@/pages/NotFoundPage"));

const AppRoutes: React.FC = () => {
  // Loading component
  const LoadingFallback = () => (
    <motion.div
      className="flex h-screen items-center justify-center bg-[var(--background)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-2xl text-[var(--foreground)]">Loading...</div>
    </motion.div>
  );

  return (
    <Suspense fallback={<LoadingFallback/>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
