import { Dialog, DialogContent} from "@/components/ui/dialog";
import { PageProps } from "@/types/auth";
import { router, usePage } from "@inertiajs/react";

interface Props{
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function UserMenuModal({isOpen, onOpenChange}: Props) {
  const { auth } = usePage<PageProps>().props;

  const handleDelete = () => {
    if (window.confirm(`ログアウトしますか？`)) {
      router.delete(`/user_sessions/${auth.user?.id}`, {
        preserveScroll: true,
      });
    }
    onOpenChange();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="p-0 gap-0 sm:max-w-[320px] bg-[#EFECE5] border-gray-300 overflow-hidden">
        <div className="flex flex-col text-center text-gray-800 text-sm font-medium">
          <div className="py-5 border-b border-gray-400/50">{auth.user?.name}</div>
          <div className="py-5 border-b border-gray-400/50">{auth.user?.email}</div>

          <div
            onClick={handleDelete}
            className="py-5 cursor-pointer hover:bg-black/5 active:bg-black/10 transition-colors"
          >
            ログアウト
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
