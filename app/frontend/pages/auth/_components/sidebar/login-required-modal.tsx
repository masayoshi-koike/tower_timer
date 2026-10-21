import { Dialog, DialogContent } from '@/components/ui/dialog';

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginRequiredModal({ isOpen, onOpenChange }: Props) {
  return (
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
  );
}
