import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { CONTACT_CONFIG } from "@/lib/contact";

export function WhatsAppFloat() {
  if (typeof document === "undefined") return null;

  const button = (
    <motion.a
      href={CONTACT_CONFIG.whatsapp.link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-[999999] flex items-center justify-center rounded-full bg-[#25D366] shadow-2xl"
      style={{
        bottom: "32px",
        right: "32px",
        width: "64px",
        height: "64px",
        pointerEvents: "auto",
        isolation: "isolate", // ✅ FINAL FIX
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <img
        src="/whatsapp.svg"
        alt="WhatsApp"
        className="w-8 h-8"
        draggable={false}
      />
    </motion.a>
  );

  return createPortal(button, document.body);
}
