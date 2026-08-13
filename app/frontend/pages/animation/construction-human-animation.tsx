import { useState } from "react";
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
  const hasAnimation = status === "in_progress" || status === "paused";
  const { showLoopingSprite } = useStageAnimation(currentStage, targetStage);

  const [animationDelay] = useState(() => {
    if (status === 'in_progress' || status === 'paused') {
      return -(elapsedTime % SPRITE_CONFIG.animDurationSec);
    }
    return 0;
  });
  
  if (!showLoopingSprite) return null;

  return (
    <div className={`animate-fade-in absolute ${yClass} aspect-[100/200] w-[8%]  translate-x-[470%]`}>
      <div className="relative size-full overflow-hidden">
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
