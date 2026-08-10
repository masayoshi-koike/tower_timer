import { MovedImages } from "@/links/animation";
import { useStageAnimation } from "@/pages/hooks/useStageAnimation";

const SPRITE_CONFIG = {
  cols: 6,
  animDurationSec: 0.7,
};

interface Props {
  status: string;
  isPlaying: boolean;
  yClass: string;
  currentStage: number;
  targetStage: number; 
  isFinished?: boolean;
}

export default function Transform({ status, isPlaying, yClass, currentStage, targetStage, isFinished }: Props) {
  const { showOneTimeSprite } = useStageAnimation(currentStage, targetStage, isFinished);
  if (!showOneTimeSprite) return null;

  const isFifthFloor = targetStage === 5;
  const hasAnimation = status === "in_progress" || status === "paused" || isFifthFloor;;

  const currentIsPlaying = isFifthFloor ? true : isPlaying;
  

  return (
    <div className={`absolute ${yClass} translate-x-[30%] z-20 w-[60%] aspect-square`}>
      <div className="relative overflow-hidden w-full h-full">
        <img
          src={MovedImages.transform}
          alt="Sprite Animation"
          className={`absolute top-0 left-0 h-full max-w-none ${hasAnimation ? "animate-sprite" : ""}`}
          style={
            {
              '--anim-duration': `${SPRITE_CONFIG.animDurationSec}s`,
              "--anim-cols": SPRITE_CONFIG.cols,
              "--anim-type": "forwards",
              width: `${SPRITE_CONFIG.cols * 100}%`,
              animationPlayState: currentIsPlaying ? "running" : "paused",
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}
