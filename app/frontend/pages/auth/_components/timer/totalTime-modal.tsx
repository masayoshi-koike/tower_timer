import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PageProps } from "@/types/auth";
import { usePage } from "@inertiajs/react";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TotalTimeModal({ isOpen, onOpenChange }: Props) {
  const { auth } = usePage<PageProps>().props; 
  const hours = Math.floor(auth.total_minutes / 60);
  const minutes = auth.total_minutes % 60;
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;


  if (!auth.loggedIn) return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
          <div className="text-center text-xl sm:text-left">
            ログインが必要です
          </div>
          <div className="pt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            こちらの機能をご利用いただくには、アカウントへのログインが必要です。
          </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex min-h-90 w-fit max-w-[95vw] min-w-80 flex-col items-center justify-center rounded-2xl border-none bg-[#EFECE5] p-8 shadow-xl sm:max-w-max"
      >
        <div className="mt-4 flex w-full flex-col items-center justify-center">
          <h2 className="mb-2 font-custom text-lg font-black tracking-widest text-gray-900 uppercase sm:text-xl">
            Total Time
          </h2>

          <div className="mb-12 h-[1.5px] w-[75%] bg-gray-800"></div>
          <div className="flex items-baseline justify-center text-gray-900">
            <span className="font-custom text-5xl font-bold tracking-widest">
              {formattedTime}
            </span>
            <span className="font-boldml-2 pl-3 font-custom text-xl">hrs</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
