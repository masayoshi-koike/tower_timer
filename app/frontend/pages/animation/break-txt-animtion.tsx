import { FixedImages } from '@/links/animation';

interface Props {
  isPlaying: boolean;
}

export default function BreakTxt({ isPlaying }: Props) {
  const playStateStyle = {
    animationPlayState: isPlaying ? 'running' : 'paused',
  };

  return (
    <>
      <style>{`
        .animate-marquee-text {
          animation: marqueeSequence 10s infinite;
        }
        .animate-wipe-cover {
          animation: wipeSequence 10s infinite;
        }

        @keyframes marqueeSequence {
          0% { transform: translateX(0); opacity: 1; }
          30% { transform: translateX(-100%); opacity: 1; } 
          45% { transform: translateX(-100%); opacity: 1; }
          46%, 60% { transform: translateX(0); opacity: 1; }
          61%, 63% { opacity: 0; } 
          64%, 66% { opacity: 1; }
          67%, 69% { opacity: 0; }
          70%, 72% { opacity: 1; }
          73%, 75% { opacity: 0; }
          76%, 78% { opacity: 1; }
          100% { transform: translateX(0); opacity: 1; }
        }

        @keyframes wipeSequence {
          0% { transform: translateY(-100%); }
          35% { 
            transform: translateY(-100%); 
            animation-timing-function: steps(15, end); 
          } 
          42%, 45% { 
            transform: translateY(0); 
            animation-timing-function: steps(15, end);
          }   
          52%, 100% { 
            transform: translateY(100%); 
          }
        }
      `}</style>

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
          className="animate-wipe-cover absolute top-0 left-0 h-full w-full bg-[#ebebe2]"
          style={playStateStyle}
        ></div>
      </div>
    </>
  );
}
