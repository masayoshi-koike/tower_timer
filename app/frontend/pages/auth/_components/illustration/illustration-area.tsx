import { FixedImages } from "@/links/animation";
import CarAnimation from "@/pages/animation/crane-animation";
import SmokeChimney from "@/pages/animation/smoke-chimney-animation";

interface Props {
  elapsedTime: number;
  status: string;
  stage: number;
  isPlaying: boolean;
  isFinished: boolean;
}

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
    </>
  );
}
