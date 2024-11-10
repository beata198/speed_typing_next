import Image from "next/image";

export default function DesktopOnlyMessage() {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <Image
        className="dark:bg-neutral-400 p-3 rounded-md"
        src="warning.svg"
        width={300}
        height={75}
        alt="warning"
      />
      <h3 className="text-xl">
        <span className="text-2xl">Whoa there, tiny screen!</span> This app
        needs a bit more room to stretch its legs. Hop onto a bigger screen with
        a keyboard for the best experience—your fingers and our app will thank
        you!
      </h3>
    </div>
  );
}
