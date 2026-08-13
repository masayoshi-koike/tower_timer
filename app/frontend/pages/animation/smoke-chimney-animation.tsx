import { MovedImages } from '@/links/animation';
import { useState } from 'react';
import '../../stylesheet/animation.css';

const SPRITE_CONFIG = {
  cols: 4,
  animDurationSec: 3,
};

interface Props {
  elapsedTime: number;
  status: string;
  isPlaying: boolean;
  isBreak?: boolean;
}

export default function SmokeChimney({ elapsedTime, status, isPlaying, isBreak }: Props) {
  const hasAnimation = status === 'in_progress' || status === 'paused' || isBreak;

  const [animationDelay] = useState(() => {
    if (status === 'in_progress' || status === 'paused') {
      return -(elapsedTime % SPRITE_CONFIG.animDurationSec);
    }
    return 0;
  });

  return (
    <div
      className={`absolute aspect-[100/200] ${isBreak ? 'w-[25%] translate-x-[110%] translate-y-[5%]' : 'w-[13%] translate-x-[500%] translate-y-[165%]'} `}
    >
      <div className="relative size-full overflow-hidden">
        <img
          src={MovedImages.smoke_chimney}
          alt="Sprite Animation"
          className={`absolute top-0 left-0 h-full max-w-none ${hasAnimation ? 'animate-sprite' : ''}`}
          style={
            {
              '--anim-duration': `${SPRITE_CONFIG.animDurationSec}s`,
              '--anim-cols': SPRITE_CONFIG.cols,
              '--anim-type': 'infinite',
              width: `${SPRITE_CONFIG.cols * 100}%`,
              animationPlayState: isPlaying ? 'running' : 'paused',
              animationDelay: `${animationDelay}s`,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}
