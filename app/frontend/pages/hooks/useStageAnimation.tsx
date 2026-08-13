import { useState, useEffect, } from "react";

export function useStageAnimation(currentStage: number, targetStage: number, customTrigger?: boolean) {
  const [showOneTimeSprite, setShowOneTimeSprite] = useState(false);
  const [showLoopingSprite, setShowLoopingSprite] = useState(false);

  const [prevStage, setPrevStage] = useState(currentStage);
  const [prevTrigger, setPrevTrigger] = useState(customTrigger);

  if (currentStage !== prevStage || customTrigger !== prevTrigger) {
    const isStageProgress = currentStage === targetStage && prevStage === targetStage - 1;
    const isTriggerFired = customTrigger && !prevTrigger;

    if (isStageProgress || isTriggerFired) {
      setShowOneTimeSprite(true);
      setShowLoopingSprite(false);
    } 
    else if (currentStage === targetStage) {
      setShowOneTimeSprite(false);
      setShowLoopingSprite(true);
    } 
    else {
      setShowOneTimeSprite(false);
      setShowLoopingSprite(false);
    }

    setPrevStage(currentStage);
    setPrevTrigger(customTrigger);
  };

  useEffect(() => {
    if (showOneTimeSprite) {
      const oneTimeTimer = setTimeout(() => {
        setShowOneTimeSprite(false);
      }, 1000);

      const loopTimer = setTimeout(() => {
        setShowLoopingSprite(true);
      }, 4000);

      return () => {
        clearTimeout(oneTimeTimer);
        clearTimeout(loopTimer);
      };
    }
  }, [showOneTimeSprite]); 

  return { showOneTimeSprite, showLoopingSprite };
}