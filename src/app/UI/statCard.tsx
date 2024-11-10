interface StatCardProps {
  number: number;
  text?: string;
  classes?: string;
}

export default function StatCard({ number, text, classes }: StatCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 ">
      <div
        className={`w-24 h-24 flex justify-center items-center text-4xl font-bold dark:text-neutral-700 bg-neutral-700 text-white dark:bg-white ${classes} rounded-md`}
      >
        {number}
      </div>
      <p>{text}</p>
    </div>
  );
}
