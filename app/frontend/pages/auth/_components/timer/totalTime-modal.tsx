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
        className="p-8 w-fit max-w-[95vw] sm:max-w-max min-w-[320px] bg-[#EFECE5] border-none rounded-2xl flex flex-col items-center justify-center min-h-[360px] shadow-xl"
      >
        <div className="flex flex-col items-center justify-center w-full mt-4">
          <h2 className="text-lg sm:text-xl font-custom font-black tracking-widest text-gray-900 mb-2 uppercase">
            Total Time
          </h2>

          <div className="w-[75%] h-[1.5px] bg-gray-800 mb-12"></div>
          <div className="flex items-baseline justify-center text-gray-900">
            <span className="text-5xl font-custom font-bold tracking-widest">
              {formattedTime}
            </span>
            <span className="text-xl font-custom font-boldml-2 pl-3">hrs</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
