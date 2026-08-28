import { FixedImages } from "@/links/animation";
import BreakCat from "@/pages/animation/break-cat-animation";
import CoffeeSmoke from "@/pages/animation/break-coffee-animation";
import BreakTxt from "@/pages/animation/break-txt-animtion";
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
      <BreakTxt isPlaying={isPlaying}/>
      <BreakCat elapsedTime={elapsedTime} status={status} isPlaying={isPlaying} />
      <CoffeeSmoke elapsedTime={elapsedTime} status={status} isPlaying={isPlaying} />
    </>
  );
}

export default memo(BreakTimeArea);