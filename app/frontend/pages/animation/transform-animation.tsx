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
  
  const isFifthFloor = targetStage === 5;
  const hasAnimation = status === "in_progress" || status === "paused" || isFifthFloor;

  const currentIsPlaying = isFifthFloor ? true : isPlaying;
  
  return (
    <div className={`absolute ${yClass} z-20 aspect-square w-[60%] translate-x-[30%] ${showOneTimeSprite ? 'block' : 'hidden'}`}>
      <div className="relative size-full overflow-hidden">
        <img
          src={MovedImages.transform}
          alt="Sprite Animation"
          className={`absolute top-0 left-0 h-full max-w-none ${showOneTimeSprite && hasAnimation ? "animate-sprite" : ""}`}
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