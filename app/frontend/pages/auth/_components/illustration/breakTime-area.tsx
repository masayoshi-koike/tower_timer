import { FixedImages } from "@/links/animation";
import BreakCat from "@/pages/animation/break-cat-animation";
import CoffeeSmoke from "@/pages/animation/coffee-smoke-animation";
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
      <BreakCat elapsedTime={elapsedTime} status={status} isPlaying={isPlaying} />
      <CoffeeSmoke elapsedTime={elapsedTime} status={status} isPlaying={isPlaying} />
    </>
  );
}

export default memo(BreakTimeArea);