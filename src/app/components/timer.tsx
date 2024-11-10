"use client";
import { useState, useEffect } from "react";
import { FaRotate } from "react-icons/fa6";
import CountdownTimer from "../UI/countdownTimer";

interface TimerProps {
  timeLeft: number;
  active: boolean;
  onSetActive: (value: boolean) => void;
}

export default function Timer({ timeLeft, active, onSetActive }: TimerProps) {
  const [time, setTime] = useState<number>(timeLeft);
  const classesBtn =
    "flex items-center gap-2 bg-neutral-700 dark:bg-white dark:text-neutral-700 text-white font-bold rounded-md p-2 h-fit hover:opacity-80 disabled:opacity-65";

  useEffect(() => {
    if (active && time > 0) {
      const timer = setInterval(() => {
        setTime(time - 1);
        console.log(time);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (time === 0) {
      console.log("Time's up!");
      onSetActive(false);
    }
  }, [time, active, onSetActive]);

  const resetTimerHandler = (): void => {
    setTime(timeLeft);
    if (active === false) {
      onSetActive(true);
    } else {
      onSetActive(false);
    }
  };
  const startTimerHandler = () => {
    onSetActive(true);
  };

  return (
    <>
      <div>
        <CountdownTimer time={time} />
      </div>
      <button
        onClick={startTimerHandler}
        className={classesBtn}
        disabled={active}
      >
        Start
      </button>
      <button
        onClick={resetTimerHandler}
        className={classesBtn}
        disabled={!active && time === timeLeft}
      >
        <FaRotate />
        Restart
      </button>
    </>
  );
}
