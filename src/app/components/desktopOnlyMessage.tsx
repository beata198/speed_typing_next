import Image from "next/image";

export default function DesktopOnlyMessage() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
      <Image
        className="dark:bg-neutral-400 p-3 rounded-md"
        src="warning.svg"
        width={250}
        height={60}
        alt="warning"
      />
      <h3 className="text-3xl text-yellow-300 font-medium uppercase tracking-wide mt-3">
        Whoa there, tiny screen!
      </h3>
      <h4>
        This app needs a bit more room to stretch its legs. Hop onto a bigger
        screen with a keyboard for the best experience—your fingers and our app
        will thank you!
      </h4>
    </div>
  );
}
