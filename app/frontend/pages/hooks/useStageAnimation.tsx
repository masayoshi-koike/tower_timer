import { useState, useRef, useLayoutEffect, } from "react";

export function useStageAnimation(currentStage: number, targetStage: number, customTrigger?: boolean) {
  const [showOneTimeSprite, setShowOneTimeSprite] = useState(false);
  const [showLoopingSprite, setShowLoopingSprite] = useState(false);

  const prevStageRef = useRef(currentStage);
  const prevTriggerRef = useRef(customTrigger);

  useLayoutEffect(() => {
  const isStageProgress = currentStage === targetStage && prevStageRef.current === targetStage - 1;
  const isTriggerFired = customTrigger && !prevTriggerRef.current;

  let oneTimeTimer: ReturnType<typeof setTimeout>;
  let loopTimer: ReturnType<typeof setTimeout>;

  if (isStageProgress || isTriggerFired) {
    setShowOneTimeSprite(true);
    setShowLoopingSprite(false);

    oneTimeTimer = setTimeout(() => {
      setShowOneTimeSprite(false);
    }, 1000);

    loopTimer = setTimeout(() => {
      setShowLoopingSprite(true);
    }, 4000);
  } 
  else if (currentStage === targetStage) {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowOneTimeSprite(false);
    setShowLoopingSprite(true);
  } 
  else {
    setShowLoopingSprite(false);
    setShowOneTimeSprite((prev) => {
      if (prev) return true; 
      return false;
    });
  }

  prevStageRef.current = currentStage;
  prevTriggerRef.current = customTrigger;

  return () => {
    if (oneTimeTimer) clearTimeout(oneTimeTimer);
    if (loopTimer) clearTimeout(loopTimer);
  };
  }, [currentStage, targetStage, customTrigger]);
  
  return { showOneTimeSprite, showLoopingSprite };
}