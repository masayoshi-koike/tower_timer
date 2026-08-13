import { FixedImages } from "@/links/animation";
import SmokeChimney from "../../../animation/smoke-chimney-animation";
import { memo } from "react";

interface Props {
  elapsedTime: number;
  status: string;
  isPlaying: boolean;
  isBreak: boolean;
}

function BreakTimeArea({
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

export default memo(BreakTimeArea);