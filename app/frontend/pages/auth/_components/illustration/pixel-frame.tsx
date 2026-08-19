import { ReactNode } from "react";

interface PixelFrameProps {
  children: ReactNode;
}

export default function PixelFrame({ children }: PixelFrameProps) {
  return (
    <div className="relative aspect-square w-full max-w-90 border-[2px] border-black bg-[#ebebe2] p-[2px] min-[1025px]:max-w-250 lg:border-[4px] lg:p-1 landscape:max-[1024px]:max-w-[90vh]">

      <div className="absolute top-[-2px] left-[-2px] size-[2px] bg-[#ebebe2] lg:-top-1 lg:-left-1 lg:size-[4px]" />
      <div className="absolute top-[-2px] right-[-2px] size-[2px] bg-[#ebebe2] lg:-top-1 lg:-right-1 lg:size-[4px]" />
      <div className="absolute bottom-[-2px] left-[-2px] size-[2px] bg-[#ebebe2] lg:-top-1 lg:-left-1 lg:size-[4px]" />
      <div className="absolute right-[-2px] bottom-[-2px] size-[2px] bg-[#ebebe2] lg:-top-1 lg:-left-1 lg:size-[4px]" />

      <div className="relative size-full border-[2px] border-black lg:border-[4px]">

        <div className="absolute top-[-2px] left-[-2px] size-[2px] bg-[#ebebe2] lg:-top-1 lg:-left-1 lg:size-[4px]" />
        <div className="absolute top-[-2px] right-[-2px] size-[2px] bg-[#ebebe2] lg:-top-1 lg:-left-1 lg:size-[4px]" />
        <div className="absolute bottom-[-2px] left-[-2px] size-[2px] bg-[#ebebe2] lg:-top-1 lg:-left-1 lg:size-[4px]" />
        <div className="absolute right-[-2px] bottom-[-2px] size-[2px] bg-[#ebebe2] lg:-top-1 lg:-left-1 lg:size-[4px]" />

        <div className="relative size-full overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}