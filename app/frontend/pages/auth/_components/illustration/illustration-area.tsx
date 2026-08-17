import { FixedImages } from '@/links/animation';
import CarAnimation from '@/pages/animation/crane-animation';
import SmokeChimney from '@/pages/animation/smoke-chimney-animation';
import '../../../../stylesheet/animation.css';
import ConstructionHuman from '@/pages/animation/construction-human-animation';
import SmokePeaple from '@/pages/animation/smoke-people-animation';
import Cat from '@/pages/animation/cat-animation';
import Transform from '@/pages/animation/transform-animation';
import { memo } from 'react';

interface Props {
  elapsedTime: number;
  status: string;
  stage: number;
  isPlaying: boolean;
  isFinished: boolean;
}

const TRANSFORM_CONFIGS = [
  { targetStage: 1, yClass: 'translate-y-[90%]' },
  { targetStage: 2, yClass: 'translate-y-[65%]' },
  { targetStage: 3, yClass: 'translate-y-[40%]' },
  { targetStage: 4, yClass: 'translate-y-[20%]' },
  { targetStage: 5, yClass: 'translate-y-[-10%]' },
];

const CONSTRUCTION_HUMAN_CONFIGS = [
  { targetStage: 1, yClass: 'translate-y-[420%]' },
  { targetStage: 2, yClass: 'translate-y-[315%]' },
  { targetStage: 3, yClass: 'translate-y-[220%]' },
  { targetStage: 4, yClass: 'translate-y-[135%]' },
];

const CONSTRUCTION_CONFIGS = [
  { stage: 1, targetStage: 1, yClass: 'translate-y-[23.5%]' },
  { stage: 2, targetStage: 2, yClass: 'translate-y-[6.5%]' },
  { stage: 3, targetStage: 3, yClass: 'translate-y-[-8.5%]' },
  { stage: 4, targetStage: 4, yClass: 'translate-y-[-22%]' },
];

function IllustrationArea({ elapsedTime, status, stage, isPlaying, isFinished }: Props) {
  return (
    <>
      <img
        src={FixedImages.background}
        className="absolute size-full object-contain"
        alt="background_img"
      />
      <CarAnimation elapsedTime={elapsedTime} status={status} stage={stage} isPlaying={isPlaying} />
      <SmokeChimney elapsedTime={elapsedTime} status={status} isPlaying={isPlaying} />
      {CONSTRUCTION_CONFIGS.map(
        (config) =>
          stage === config.stage && (
            <img
              key={`construction-${config.stage}`}
              src={FixedImages.construction}
              className={`animate-fade-in absolute size-full ${config.yClass} scale-[30%] object-contain`}
              alt="construction"
            />
          )
      )}
      {CONSTRUCTION_HUMAN_CONFIGS.map((config) => (
        <ConstructionHuman
          elapsedTime={elapsedTime}
          key={config.targetStage}
          currentStage={stage}
          targetStage={config.targetStage}
          status={status}
          isPlaying={isPlaying}
          yClass={config.yClass}
        />
      ))}
      {TRANSFORM_CONFIGS.map((config) => (
        <Transform
          key={config.targetStage}
          currentStage={stage}
          targetStage={config.targetStage}
          status={status}
          isPlaying={isPlaying}
          yClass={config.yClass}
          isFinished={config.targetStage === 5 ? isFinished : undefined}
        />
      ))}
      <img
        src={FixedImages.firstFloor}
        className={`absolute size-full object-contain ${stage >= 1 || isFinished ? 'block' : 'hidden'}`}
        alt="floor_img_1"
      />
      <img
        src={FixedImages.thirdFloor}
        className={`absolute size-full object-contain ${stage >= 3 || isFinished ? "block" : "hidden"}`}
        alt="floor_img_3"
      />
      {(stage >= 3 || isFinished) && (
        <Cat elapsedTime={elapsedTime} status={status} isPlaying={isPlaying} />
      )}
      <img
        src={FixedImages.secondFloor}
        className={`absolute size-full object-contain ${stage >= 2 || isFinished ? "block" : "hidden"}`}
        alt="floor_img_2"
      />
      {(stage >= 2 || isFinished) && (
        <SmokePeaple elapsedTime={elapsedTime} status={status} isPlaying={isPlaying} />
      )}
      <img
        src={FixedImages.fourthFloor}
        className={`absolute size-full object-contain ${stage >= 4 || isFinished ? "block" : "hidden"}`}
        alt="floor_img_4"
      />
      <img
        src={FixedImages.fifthFloor}
        className={`absolute size-full object-contain ${isFinished ? "block" : "hidden"}`}
        alt="floor_img_5"
      />
    </>
  );
}

export default memo(IllustrationArea);
