import IllustrationArea from "@/pages/auth/_components/illustration/illustration-area";
import TimerControls from "@/pages/auth/_components/timer/timer-controles";
import TimerDisplay from "@/pages/auth/_components/timer/timer-display";


export default function TimerPage() {

  return (
    <div className="flex-1 flex items-center justify-center w-full pr-5">
      <div className="w-full max-w-7xl grid grid-cols-1 min-[1025px]:grid-cols-12 gap-1 items-center">
        <div className="min-[1025px]:col-span-5 flex flex-col items-center justify-center p-4">
          <TimerDisplay  />
          <TimerControls />
        </div>

        <div className="min-[1025px]:col-span-7 flex items-center justify-center w-full p-4">
          <div className="relative max-w-full w-[400px] min-[1025px]:w-[1000px] aspect-square border-2 border-gray-900 overflow-hidden bg-[#ebebe2]">
            <IllustrationArea />
          </div>
        </div>
      </div>
    </div>
  );
}
