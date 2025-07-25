import { Link } from "react-router-dom";

import { motion } from "framer-motion";

export default function Logo() {
  return (
    <Link to={"/"}>
      <div className="flex cursor-pointer select-none items-center justify-start gap-2">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-[var(--headline)]"
        >
          Logo
        </motion.h1>
      </div>
    </Link>
  );
}
