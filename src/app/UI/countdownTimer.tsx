interface countdownTimerProps {
  time: number;
}

export default function countdownTimer({ time }: countdownTimerProps) {
  return (
    <div className="relative w-[15ppx] h-[150px] flex items-center justify-center">
      <div
        className="dot absolute w-full h-full flex justify-center items-start rounded-full z-10 "
        style={{ transform: `rotateZ(${time * 6}deg)` }}
      >
        <div className="absolute w-[13px] h-[13px] bg-blue-400  rounded-full top-[-2px]"></div>
      </div>

      <svg className="relative w-[150px] h-[150px] rotate-[272deg]">
        <circle
          className="w-[100%] h-[100%] fill-transparent stroke-[8] stroke-neutral-500 translate-x-[5px] translate-y-[5px]"
          style={{ strokeLinecap: "round" }}
          cx="70"
          cy="70"
          r="70"
        ></circle>
        <circle
          className="w-[100%] h-[100%] fill-transparent stroke-[8] stroke-blue-400 translate-x-[5px] translate-y-[5px] "
          style={{
            strokeDasharray: 440,
            strokeDashoffset: 440 - (440 * time) / 60,
            strokeLinecap: "round",
          }}
          cx="70"
          cy="70"
          r="70"
        ></circle>
      </svg>
      <div className="absolute text-center text-[50px] font-semibold flex flex-col justify-center items-center gap-0">
        <p className="-mt-[15px]">{time}</p>
        <span className="text-sm tracking-wider uppercase -mt-[15px]">
          {time > 1 ? "seconds" : "second"}
        </span>
      </div>
    </div>
  );
}
