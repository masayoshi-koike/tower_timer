import { Button } from "@/components/ui/button";

interface Props {
  status: string;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

export default function TimerControls({
  status,
  onStart,
  onStop,
  onReset,
}: Props) {
  return (
    <div className="flex gap-4">
      <Button
        type="button"
        variant="outline"
        className="rounded-full px-[30px] py-[17px] border-2 border-gray-900 font-custom uppercase tracking-wider bg-[#ebebe2]"
      >
        Stop
      </Button>
      <Button
        type="button"
        variant="outline"
        className="rounded-full px-[24px] py-[17px] border-2 border-gray-900 font-custom uppercase tracking-wider bg-[#ebebe2]"
      >
        Start
      </Button>
      <Button
        type="button"
        variant="outline"
        className="rounded-full px-[24px] py-[17px] border-2 border-gray-900 font-custom uppercase tracking-wider bg-[#ebebe2]"
      >
        Reset
      </Button>
    </div>
  );
}
