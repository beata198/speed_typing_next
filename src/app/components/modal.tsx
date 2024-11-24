"use client";
import { useRef } from "react";

export default function Modal() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  return (
    <dialog ref={dialogRef} open className="z-30 rounded-md">
      <div className="p-3 shadow-lg">
        <form method="dialog">
          <button className="  absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">Your results!</h3>
        <ul>
          <li>words/min</li>
          <li>chars/min</li>
          <li>% accuracy</li>
          <li>mistakes</li>
        </ul>
        <p className="py-4">Press ESC key or click on ✕ button to close</p>
      </div>
    </dialog>
  );
}
