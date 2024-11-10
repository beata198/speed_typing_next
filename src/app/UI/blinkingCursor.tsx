import { motion } from "framer-motion";

export default function BlinkingCursor() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        duration: 0.7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="w-0.5 h-8 bg-blue-400 inline-block"
    ></motion.div>
  );
}
