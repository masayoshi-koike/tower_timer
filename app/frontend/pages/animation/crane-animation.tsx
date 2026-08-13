import { useEffect, useState } from "react";
import { MovedImages } from "@/links/animation";
import "../../stylesheet/craneAnimation.css";

const SPRITE_CONFIG = {
  cols: 6,                         
  rows: 3,                        
  moveDuration: 10000,              
  animDurationX: '3s',           
  animDurationY: '3s',           
};

interface Props {
  elapsedTime: number;
  status: string;
  stage: number; 
  isPlaying: boolean; 
}

export default function CarAnimation({ elapsedTime, status, stage, isPlaying}: Props) {
  const [carStatus, setCarStatus] = useState<'initial' | 'entering' | 'arrived'>(() => {
    if (status === 'canceled' || status === 'none') return 'initial';
    if (elapsedTime >= SPRITE_CONFIG.moveDuration / 1000) return 'arrived';
    return 'initial';
  });
  const [initialDelay, setInitialDelay] = useState(0);

  useEffect(() => {
    if (status === 'canceled' || status === 'none') {
      setCarStatus('initial');
      setInitialDelay(0);
      return;
    }
    
    if (isPlaying && stage === 0 && elapsedTime >= SPRITE_CONFIG.moveDuration / 1000) {
      setCarStatus('arrived');
    } else if (isPlaying && stage === 0 && carStatus === 'initial') {
      setInitialDelay(elapsedTime * 1000);
      setCarStatus('entering');
    }
    if(stage > 0 ) return setCarStatus('initial')
  }, [status, isPlaying, stage, carStatus]);

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.animationName === 'moveIn') {
      setCarStatus('arrived');
    }
  };

  return (
    <>
      <div 
        className={`absolute z-20 aspect-square w-[35%] translate-y-[230%] ${
          carStatus === 'initial' ? 'car-initial' : 
          carStatus === 'entering' ? 'car-entering' : 
          'car-arrived'
        }`}
        style={{
          '--move-duration': `${SPRITE_CONFIG.moveDuration}ms`,
          animationPlayState: isPlaying ? 'running' : 'paused',
          ...(carStatus === 'entering' && initialDelay > 0 ? { animationDelay: `-${initialDelay}ms` } : {})
        } as React.CSSProperties}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="relative size-full overflow-hidden">
          <img
            src={MovedImages.crane}
            alt="Car Animation"
            className={`absolute top-0 left-0 max-w-none ${
              carStatus === 'arrived' ? 'crane-animate-sprite-y' : 'crane-animate-sprite-x'
            }`}
            style={{
              '--anim-duration-x': SPRITE_CONFIG.animDurationX,
              '--anim-duration-y': SPRITE_CONFIG.animDurationY,
              '--sprite-cols': SPRITE_CONFIG.cols,
              width: `${SPRITE_CONFIG.cols * 100}%`,
              height: `${SPRITE_CONFIG.rows * 100}%`,
              animationPlayState: isPlaying ? 'running' : 'paused',
              imageRendering: 'pixelated',
            } as React.CSSProperties}
          />
        </div>
      </div>
    </>
  );
}