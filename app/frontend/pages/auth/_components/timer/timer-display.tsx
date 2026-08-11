interface Props {
  timeInSeconds: number;
  isBreak: boolean;
}

export default function TimerDisplay({
  timeInSeconds,
  isBreak,
}: Props) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="text-center mb-4 sm:mb-8 pb-4 sm:pb-8 landscape:max-[1024px]:mb-1 landscape:max-[1024px]:pb-1">
      {isBreak && (
        <p className="text-xl landscape:max-[1024px]:text-sm font-bold text-blue-500 mb-2 landscape:max-[1024px]:mb-0">
          Break Time
        </p>
      )}
      <div className={`text-5xl min-[400px]:text-6xl sm:text-[80px] landscape:max-[1024px]:text-4xl tracking-widest font-custom antialiased ${isBreak ? 'text-blue-500' : 'text-gray-900'}`}>
        {formattedTime}
      </div>
    </div>
  );
}