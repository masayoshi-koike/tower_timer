import { useEffect, useState } from "react";
import  "../../stylesheet/animation.css"
import { MovedImages } from "@/links/animation";


const SPRITE_CONFIG = {
  cols: 12,
  animDurationSec: 5,
};

interface Props {
  elapsedTime: number;
  status: string;
  isPlaying: boolean;
}

export default function SmokePeaple({
  elapsedTime,
  status,
  isPlaying,
}: Props) {
  const [animationDelay, setAnimationDelay] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      if (status === "in_progress" || status === "paused") {
        setAnimationDelay(-(elapsedTime % SPRITE_CONFIG.animDurationSec));
      }
      setIsInitialized(true);
    } else if (status === "canceled" || elapsedTime === 0) {
      setAnimationDelay(0);
    }
  }, [status, elapsedTime, isInitialized]);

  const hasAnimation = status === "in_progress" || status === "paused";

  return (
    <div className={`absolute translate-y-[490%] translate-x-[685%] w-[6.5%]  aspect-[100/200]`}>
      <div className="relative overflow-hidden w-full h-full">
        <img
          src={MovedImages.smoke_people}
          alt="Sprite Animation"
          className={`absolute top-0 left-0 h-full max-w-none ${hasAnimation ? "animate-sprite" : ""}`}
          style={
            {
              "--anim-duration": `${SPRITE_CONFIG.animDurationSec}s`,
              "--anim-cols": SPRITE_CONFIG.cols,
              "--anim-type": "infinite",
              width: `${SPRITE_CONFIG.cols * 100}%`,
              animationPlayState: isPlaying ? "running" : "paused",
              animationDelay: `${animationDelay}s`,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}
