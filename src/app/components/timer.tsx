"use client";
import { useState, useEffect } from "react";
import { FaRotate } from "react-icons/fa6";
import CountdownTimer from "../UI/countdownTimer";

interface TimerProps {
  timeLeft: number;
  active: boolean;
  onSetActive: (value: boolean) => void;
  onClearTyping: () => void;
  onAllowTyping: () => void;
}

const classesBtn =
  "flex items-center gap-2 bg-neutral-700 dark:bg-white dark:text-neutral-700 text-white font-bold rounded-md p-2 h-fit hover:opacity-80 disabled:opacity-65";

export default function Timer({
  timeLeft,
  active,
  onSetActive,
  onClearTyping,
  onAllowTyping,
}: TimerProps) {
  const [time, setTime] = useState<number>(timeLeft);

  useEffect(() => {
    if (!active || time < 0) return;

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
      console.log(time);
    }, 1000);
    return () => clearInterval(timer);
  }, [active, time]);

  useEffect(() => {
    if (time === 0) {
      console.log("Time's up!");
      onSetActive(false);
      setTime(timeLeft);
      onClearTyping();
    }
  }, [time, onSetActive, timeLeft, onClearTyping]);

  console.log(active);

  const resetTimerHandler = (): void => {
    onSetActive(false);
    setTime(timeLeft);
    onClearTyping();
  };
  const startTimerHandler = () => {
    onSetActive(true);
    onAllowTyping();
  };

  console.log(timeLeft);
  return (
    <>
      <div>
        <CountdownTimer time={time} />
      </div>
      <button
        onClick={startTimerHandler}
        className={classesBtn}
        disabled={active}
        aria-label="Start"
      >
        Start
      </button>
      <button
        onClick={resetTimerHandler}
        className={classesBtn}
        aria-label="Restart"
        disabled={!active && time === timeLeft}
      >
        <FaRotate />
        Restart
      </button>
    </>
  );
}
