"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

export default function Notification() {
  const [close, setClose] = useState<boolean>(true);

  const closeNotification = () => {
    setClose(false);
  };
  useEffect(() => {
    const notification = localStorage.getItem("notification");
    if (notification === "true") {
      setClose(true);
    } else {
      setClose(false);
    }
  }, []);

  useEffect(() => {
    if (close) {
      localStorage.setItem("notification", "true");
    } else {
      localStorage.setItem("notification", "false");
    }
  }, [close]);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{
        height: close ? 40 : 0,
        opacity: close ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="text-sm font-medium flex justify-between dark:bg-white bg-neutral-700 text-white dark:text-neutral-700 items-center px-4 tracking-wide"
    >
      <div className="text-center w-full">
        Press{" "}
        <span className="font-bold tracking-normal uppercase text-xs">
          start
        </span>{" "}
        or just start typing!
      </div>
      <button
        onClick={closeNotification}
        className="font-black text-xlf dark:text-neutral-700"
      >
        <MdClose />
      </button>
    </motion.div>
  );
}
