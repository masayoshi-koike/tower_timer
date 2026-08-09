import { FixedImages } from "@/links/animation";

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
    </>
  );
}
