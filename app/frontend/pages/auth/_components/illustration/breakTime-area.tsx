import { FixedImages } from "@/links/animation";
import SmokeChimney from "../../../animation/smoke-chimney-animation";

interface Props {
  elapsedTime: number;
  status: string;
  isPlaying: boolean;
  isBreak: boolean;
}

export default function BreakTimeArea({
  elapsedTime,
  status,
  isPlaying,
  isBreak,
}: Props) {
  
  return (
    <>
      <img
        src={FixedImages.breakTime}
        className="absolute size-full object-contain"
        alt="background_img"
      />
      <SmokeChimney
        elapsedTime={elapsedTime}
        status={status}
        isPlaying={isPlaying}
        isBreak={isBreak}
      />

    </>
  );
}
