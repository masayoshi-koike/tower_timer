import { FixedImages } from "@/links/animation";
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
      <img
        src={FixedImages.breakTxt}
        className="absolute size-[20%] object-contain"
        alt="background_img"
      />
    </>
  );
}

export default memo(BreakTimeArea);