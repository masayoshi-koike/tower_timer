import { MovedImages } from "@/links/animation";
import { useEffect, useState } from "react";
import  "../../stylesheet/animation.css"

const SPRITE_CONFIG = {
  cols: 7,
  animDurationSec: 3,
};

interface Props {
  elapsedTime: number;
  status: string;
  isPlaying: boolean;
}

export default function Cat({
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
    <div className={`absolute aspect-[100/200] w-[6.5%] translate-x-[630%]  translate-y-[370%]`}>
      <div className="relative size-full overflow-hidden">
        <img
          src={MovedImages.cat}
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
