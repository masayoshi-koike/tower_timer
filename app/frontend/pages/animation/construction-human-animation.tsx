import { useEffect, useState } from "react";
import  "../../stylesheet/animation.css"
import { useStageAnimation } from "../hooks/useStageAnimation";
import { MovedImages } from "@/links/animation";

const SPRITE_CONFIG = {
  cols: 7,
  animDurationSec: 3,
};

interface Props {
  elapsedTime: number;
  status: string;
  isPlaying: boolean;
  yClass: string;
  currentStage: number;
  targetStage: number;
}

export default function ConstructionHuman({
  elapsedTime,
  status,
  isPlaying,
  yClass,
  currentStage,
  targetStage,
}: Props) {
  const { showLoopingSprite } = useStageAnimation(currentStage, targetStage);
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

  if (!showLoopingSprite) return null;

  const hasAnimation = status === "in_progress" || status === "paused";

  return (
    <div className={`animate-fade-in absolute ${yClass} translate-x-[470%] w-[8%]  aspect-[100/200]`}>
      <div className="relative overflow-hidden w-full h-full">
        <img
          src={MovedImages.construction_human}
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
