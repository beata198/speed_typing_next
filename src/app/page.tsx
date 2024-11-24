"use client";
import { useEffect, useState } from "react";
import Timer from "./components/timer";
import StatCard from "./UI/statCard";
import DesktopOnlyMessage from "./components/desktopOnlyMessage";
import BlinkingCursor from "./UI/blinkingCursor";
import Modal from "./components/modal";

const allowedKeys = [
  "Backspace",
  "Shift",
  " ",
  "'",
  '"',
  ":",
  ";",
  "-",
  ",",
  ".",
];

export default function Home() {
  const [generateWords, setGenerateWords] = useState<string[]>([]);
  const [userTyping, setUserTyping] = useState<string[]>([]);
  const [typingIsAllowed, setTypingIsAllowed] = useState<boolean>(true);

  const [wordsPerMinute, setWordsPerMinute] = useState(0);
  const [active, setActive] = useState<boolean>(false);
  const [charsPerMinute, setCharsPerMinute] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const [offset, setOffset] = useState<number>(200);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  // useEffect(() => {
  //   if (!active && userTyping.length > 0) {
  //     setActive(true);
  //   }
  // }, [userTyping, active]);

  // console.log(active, userTyping[0]);

  useEffect(() => {
    const dataFetch = async () => {
      const res = await fetch(
        "https://random-word-api.herokuapp.com/word?number=200"
      );
      const data = await res.json();
      setGenerateWords(data.join(" "));
    };
    dataFetch();
  }, []);

  useEffect(() => {
    const keyPressHandler = (e: KeyboardEvent) => {
      if (!typingIsAllowed) {
        return;
      }

      if (!active) {
        setActive(true);
      }

      if (startTime === null) {
        setStartTime(Date.now());
      }

      // check if it is a letter
      const isLetter = e.key.length === 1 && /^[a-zA-Z]$/.test(e.key);
      if (allowedKeys.includes(e.key) || isLetter) {
        if (userTyping.length > 0) {
          setOffset((prev) => prev - 19.8);
        }

        if (e.key === " ") {
          e.preventDefault();
          setUserTyping((prev) => prev.concat(" "));
        } else if (e.key === "Backspace") {
          if (userTyping.length > 0) {
            setOffset((prev) => prev + 19.8 * 2);
            setUserTyping((prev) => prev.slice(0, -1));
          }
        } else if (e.key === "Shift") {
        } else setUserTyping((prev) => prev.concat(e.key));
      }

      e.preventDefault();
      return;
    };

    window.addEventListener("keydown", keyPressHandler);

    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, [startTime, userTyping, active, typingIsAllowed]);

  useEffect(() => {
    if (startTime === null) return;

    const elapsedTime = (Date.now() - startTime) / 60000;

    const correctChars = userTyping.filter(
      (char, index) => char === generateWords[index]
    ).length;
    const totalTypedChars = userTyping.length;
    const mistakeCount = totalTypedChars - correctChars;
    setMistakes(mistakeCount);

    const calculatedAccuracy =
      totalTypedChars > 0
        ? Math.floor((correctChars / totalTypedChars) * 100)
        : 100;
    setAccuracy(calculatedAccuracy);

    const calculatedWPM = Math.floor(totalTypedChars / 5 / elapsedTime);
    const calculatedCPM = Math.floor(totalTypedChars / elapsedTime);
    setWordsPerMinute(calculatedWPM);
    setCharsPerMinute(calculatedCPM);
  }, [userTyping, startTime, generateWords]);

  // set active status when START button is pressed
  const setActiveHandler = (value: boolean) => {
    setActive(value);
  };

  // display message to mobile users
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsSmallScreen(window.innerWidth < 700);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const clearUserTypingHandler = () => {
    // setUserTyping([]);
    // setTypingIsAllowed(false);
    // setOffset(200);
  };

  const allowTypingHandler = () => {
    setTypingIsAllowed(true);
  };

  return (
    <>
      <Modal />
      {isSmallScreen && <DesktopOnlyMessage />}
      {!isSmallScreen && (
        <>
          <div className="flex gap-4 items-center justify-center">
            <Timer
              timeLeft={10}
              active={active}
              onSetActive={setActiveHandler}
              onClearTyping={clearUserTypingHandler}
              onAllowTyping={allowTypingHandler}
            />
          </div>
          <div className="flex gap-12 justify-center mb-10">
            <StatCard number={wordsPerMinute} text="words/min" />
            <StatCard number={charsPerMinute} text="chars/min" />
            <StatCard number={accuracy} text="% accuracy" />
            <StatCard number={mistakes} text="mistakes" />
          </div>

          <div className="relative w-1/2 overflow-hidden m-auto h-[45px]">
            <div
              className={`whitespace-nowrap w-fit text-4xl overflow-hidden font-mono h-full select-none opacity-40 dark:opacity-1`}
              style={{ transform: `translateX(${offset}px)` }}
            >
              {[...generateWords].map((char, index) => (
                <span key={`s_${char}${index}`}>{char}</span>
              ))}
            </div>
            <div
              className={`w-full text-4xl font-mono text-yellow-400 h-full absolute top-0 left-0 whitespace-nowrap select-none`}
              style={{ transform: `translateX(${offset}px)` }}
            >
              {userTyping.map((char, index) => (
                <span
                  key={`${char}${index}`}
                  className={` ${
                    char === " " && char === generateWords[index]
                      ? " bg-green-200  opacity-75"
                      : ""
                  } ${
                    char !== " " && generateWords[index] === " "
                      ? " bg-red-200  opacity-75"
                      : ""
                  } ${
                    userTyping[index] === generateWords[index]
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {char === generateWords[index] ? char : generateWords[index]}
                </span>
              ))}
              <BlinkingCursor />
            </div>
          </div>
        </>
      )}
    </>
  );
}
