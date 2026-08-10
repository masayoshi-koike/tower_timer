import { FixedImages } from "@/links/animation";
import CarAnimation from "@/pages/animation/crane-animation";
import SmokeChimney from "@/pages/animation/smoke-chimney-animation";
import "../../../../stylesheet/animation.css"

interface Props {
  elapsedTime: number;
  status: string;
  stage: number;
  isPlaying: boolean;
  isFinished: boolean;
}

const CONSTRUCTION_CONFIGS = [
  { stage: 1, targetStage: 1, yClass: "translate-y-[23.5%]" },
  { stage: 2, targetStage: 2, yClass: "translate-y-[6.5%]" },
  { stage: 3, targetStage: 3, yClass: "translate-y-[-8.5%]" },
  { stage: 4, targetStage: 4, yClass: "translate-y-[-22%]" },
];

export default function IllustrationArea({
  elapsedTime,
  status,
  stage,
  isPlaying,
  isFinished
}: Props) {

  return (
    <>
      <img
        src={FixedImages.background}
        className="absolute w-full h-full object-contain"
        alt="background_img"
      />
      <CarAnimation
        elapsedTime={elapsedTime}
        status={status}
        stage={stage}
        isPlaying={isPlaying}
      />
      <SmokeChimney
        elapsedTime={elapsedTime}
        status={status}
        isPlaying={isPlaying}
      />
      {CONSTRUCTION_CONFIGS.map((config) => (
        stage === config.stage && (
          <img
            key={`construction-${config.stage}`}
            src={FixedImages.construction}
            className={`animate-fade-in absolute w-full h-full ${config.yClass} scale-[30%] object-contain`}
            alt="construction"
          />
        )
      ))}
      {(stage >= 1 || isFinished) && (
        <img
        src={FixedImages.firstFloor}
        className="absolute w-full h-full object-contain"
        alt="floor_img_1"
      />
      )}
      {(stage >= 3 || isFinished) && (
        <img
        src={FixedImages.thirdFloor}
        className="absolute w-full h-full object-contain"
        alt="floor_img_3"
      />
      )}
      {(stage >= 2 || isFinished) && (
        <img
        src={FixedImages.secondFloor}
        className="absolute w-full h-full object-contain"
        alt="floor_img_2"
        />
      )}
      {(stage >= 4 || isFinished) && (
      <img
        src={FixedImages.fourthFloor}
        className="absolute w-full h-full object-contain"
        alt="floor_img_4"
        />
      )}
      { isFinished && (
        <img
          src={FixedImages.fifthFloor}
          className="absolute w-full h-full object-contain"
          alt="floor_img_5" 
        />
      )}
    </>
  );
}
