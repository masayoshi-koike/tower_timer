import { useState, useEffect, useRef } from "react";

export function useStageAnimation(currentStage: number, targetStage: number, customTrigger?: boolean) {
  const [showOneTimeSprite, setShowOneTimeSprite] = useState(false);
  const [showLoopingSprite, setShowLoopingSprite] = useState(false);

  const prevStageRef = useRef(currentStage);
  const prevTriggerRef = useRef(customTrigger);

  useEffect(() => {
    const isStageProgress = currentStage === targetStage && prevStageRef.current === targetStage - 1;
    const isTriggerFired = customTrigger && !prevTriggerRef.current;
    if (isStageProgress || isTriggerFired) {
      setShowOneTimeSprite(true);

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
    else if (currentStage === targetStage) {
      setShowLoopingSprite(true);
    } 
    else {
      setShowOneTimeSprite(false);
      setShowLoopingSprite(false);
    }

    prevStageRef.current = currentStage;
    prevTriggerRef.current = customTrigger;
  }, [currentStage, targetStage, customTrigger]);

  return { showOneTimeSprite, showLoopingSprite };
}