import { AnimatePresence, motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

interface CodePreviewProps {
  code: string;
  copiedStates: Record<string, boolean>;
  activeTab: any;
  copyToClipboard: (
    text: string,
    key: "tailwind" | "css" | "sass" | "bootstrap" | "xml" | "svg" | "json" | "colors",
  ) => void;
}

export const CodePreview: React.FC<CodePreviewProps> = ({
  code,
  copiedStates,
  activeTab,
  copyToClipboard,
}) => (
  <div className="relative mt-2 max-w-full">
    <pre className="truncate w-full max-w-full overflow-hidden whitespace-nowrap rounded-md border border-border bg-secondary p-2 pr-10 text-xs text-muted-foreground">
      {code}
    </pre>
    <button
      className="absolute right-0 top-0 flex h-full w-[30px] items-center justify-center border border-border bg-secondary p-0 text-primary"
      onClick={() => copyToClipboard(code, activeTab)}
    >
      <AnimatePresence>
        {copiedStates[activeTab] ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Check className="text-success h-4 w-4" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Copy className="h-4 w-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  </div>
);
