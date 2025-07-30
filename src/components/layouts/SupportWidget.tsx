import { useState, useEffect, useCallback } from "react";
import { Wallet, Copy, X, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";

// --- Constants ---
const USDT_TRC20_ADDRESS = "TUpNv8wRALuuKuDpH9PbbCatSFHVtqeByk";
const TRUST_WALLET_LINK =
  "https://link.trustwallet.com/send?coin=195&address=TUpNv8wRALuuKuDpH9PbbCatSFHVtqeByk&token_id=TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

// -- Animation variants
const buttonVariants = {
  initial: { scale: 1, rotate: 0 },
  animate: { scale: 1.08, rotate: 8 },
  exit: { scale: 1, rotate: 0 }
};
const iconVariants = {
  hidden: { scale: 0.4, opacity: 0, rotate: -30 },
  visible: { scale: 1, opacity: 1, rotate: 0, transition: { type: "spring", duration: 0.22 } },
  exit: { scale: 0.4, opacity: 0, rotate: -30, transition: { duration: 0.12 } }
};
const menuVariants = {
  closed: { opacity: 0, y: 30, transition: { duration: 0.13 } },
  open: { opacity: 1, y: 0, transition: { duration: 0.20 } },
};

export function SupportWidget() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = useCallback(async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(USDT_TRC20_ADDRESS);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = USDT_TRC20_ADDRESS;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      toast?.({
        title: "Address copied!",
        description: "Thank you for supporting my work.",
        duration: 1200,
      });
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }, [toast]);

  // Close modal on Escape key
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      {/* Floating button */}
      <motion.button
        type="button"
        aria-pressed={open}
        title="Support Me"
        aria-label="Support Me"
        onClick={() => setOpen((v) => !v)}
        tabIndex={0}
        initial="initial"
        animate={open ? "animate" : "initial"}
        variants={buttonVariants}
        whileTap={{ scale: 0.93 }}
        className={`
          fixed z-50 bottom-10 right-10 max-md:bottom-4 max-md:right-4
          flex items-center justify-center
          w-14 h-14 max-md:w-12 max-md:h-12
          rounded-full shadow-xl border border-[var(--border)]
          bg-[var(--background)] text-[var(--primary)]
          hover:bg-[var(--muted)] hover:text-[var(--primary-foreground)]
          focus-visible:ring-4 focus-visible:ring-[var(--focus)]
          transition-all duration-200 outline-none
        `}
      >
        <AnimatePresence mode="wait" initial={false}>
          {!open ? (
            <motion.span
              key="heart"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex"
            >
              <Heart className="w-6 h-6 text-[var(--destructive)]" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="x"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex"
            >
              <X className="w-6 h-6 text-[var(--primary)]" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Modal, overlay, content */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.48 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40"
              style={{
                background: "var(--background)",
                opacity: 0.48,
              }}
              aria-label="Close support modal"
              tabIndex={-1}
              role="presentation"
            />
            {/* Modal */}
            <motion.div
              key="supportMenu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              style={{
                position: "fixed",
                bottom: "6rem",
                right: "1.5rem",
                zIndex: 50,
                minWidth: "312px",
                maxWidth: "95vw",
              }}
              className={`
                bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)]
                rounded-[var(--radius)] shadow-lg px-0
              `}
              tabIndex={-1}
              aria-modal="true"
              role="dialog"
            >
              {/* Modal content container */}
              <div className="flex flex-col items-center gap-4 py-4 px-6">
                <span
                  className="flex items-center gap-1 px-2 py-1 bg-[var(--background)]
                    text-[var(--foreground)] text-[11px] rounded-[calc(var(--radius)*0.7)]
                    uppercase font-semibold tracking-wide border border-[var(--border)]
                    opacity-95 select-none mb-1"
                >
                  <Wallet className="w-3.5 h-3.5" />
                  USDT (TRC20)
                </span>
                {/* QR code */}
                <div
                  className="flex items-center justify-center bg-[var(--background)] p-3 rounded-[var(--radius)] border border-[var(--border)]"
                  aria-label="QR code for USDT payment"
                  role="img"
                  tabIndex={-1}
                >
                  <img
                    src={"/src/assets/qrcode.jpg"}
                    alt="QR code to send USDT (TRC20)"
                    width={104}
                    height={104}
                    style={{ display: "block" }}
                  />
                </div>
                {/* Address + copy */}
                <div
                  className="
                    flex items-center gap-2 w-max bg-[var(--muted)] text-[var(--muted-foreground)]
                    px-2.5 py-2 rounded-[var(--radius)] border border-[var(--border)] font-mono
                    text-xs break-all focus-within:ring-2 focus-within:ring-[var(--focus)] transition
                  "
                  tabIndex={-1}
                  aria-label="USDT TRC20 Wallet Address"
                  role="group"
                >
                  <span className="truncate">{USDT_TRC20_ADDRESS}</span>
                  <button
                    type="button"
                    aria-label="Copy wallet address"
                    aria-pressed={copied}
                    onClick={handleCopy}
                    className="flex items-center hover:text-blue-600 focus:text-blue-700 transition"
                  >
                    <Copy size={14} />
                  </button>
                </div>
                {/* Trust Wallet button */}
                <a
                  href={TRUST_WALLET_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pay via Trust Wallet"
                  tabIndex={0}
                >
                  <Button className="bg-gray-700 gap-0 hover:bg-gray-800 border text-white border-none">
                    <span>Trust Wallet</span>
                    <span className="ml-2 h-[20px] w-[20px]">
                      {/* TrustWallet SVG */}
                      <svg width="20" height="22" viewBox="0 0 444 501" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.710022 72.41L222.16 0.109985V500.63C63.98 433.89 0.710022 305.98 0.710022 233.69V72.41Z" fill="#0500FF"/><path d="M443.62 72.41L222.17 0.109985V500.63C380.35 433.89 443.62 305.98 443.62 233.69V72.41Z" fill="url(#trust__paint0_linear_3_10)"/><defs><linearGradient id="trust__paint0_linear_3_10" x1="385.26" y1="-34.78" x2="216.61" y2="493.5" gradientUnits="userSpaceOnUse"><stop offset="0.02" stopColor="#0000FF"/><stop offset="0.08" stopColor="#0094FF"/><stop offset="0.16" stopColor="#48FF91"/><stop offset="0.42" stopColor="#0094FF"/><stop offset="0.68" stopColor="#0038FF"/><stop offset="0.9" stopColor="#0500FF"/></linearGradient></defs></svg>
                    </span>
                  </Button>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
