import { FixedImages } from '@/links/animation';
import '../../stylesheet/animation.css';

interface Props {
  isPlaying: boolean;
}

export default function BreakTxt({ isPlaying }: Props) {
  const playStateStyle = {
    animationPlayState: isPlaying ? 'running' : 'paused',
  };

  return (
    <>
      <div className="absolute top-[9.8%] left-[29.8%] flex h-[6%] w-[35.3%] items-center overflow-hidden bg-[#ebebe2]">
        <div className="animate-marquee-text flex h-full w-[200%]" style={playStateStyle}>
          <img
            src={FixedImages.breakTxt}
            className="h-full object-contain px-[10%]"
            alt="break_txt_1"
          />
          <img
            src={FixedImages.breakTxt}
            className="h-full object-contain px-[10%]"
            alt="break_txt_2"
          />
        </div>
        <div
          className="animate-wipe-cover absolute top-0 left-0 size-full bg-[#ebebe2]"
          style={playStateStyle}
        ></div>
      </div>
    </>
  );
}
