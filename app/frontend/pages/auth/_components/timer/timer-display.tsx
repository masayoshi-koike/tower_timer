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
    <div className="mb-4 pb-4 text-center sm:mb-8 sm:pb-8 landscape:max-[1024px]:mb-1 landscape:max-[1024px]:pb-1">
      {isBreak && (
        <p className="mb-2 text-xl font-bold text-blue-500 landscape:max-[1024px]:mb-0 landscape:max-[1024px]:text-sm">
          Break Time
        </p>
      )}
      <div className={`font-custom text-5xl tracking-widest antialiased min-[400px]:text-6xl sm:text-[80px] landscape:max-[1024px]:text-4xl ${isBreak ? 'text-blue-500' : 'text-gray-900'}`}>
        {formattedTime}
      </div>
    </div>
  );
}