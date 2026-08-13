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
      <DialogContent showCloseButton={false} className="gap-0 overflow-hidden border-gray-300 bg-[#EFECE5] p-0 sm:max-w-80">
        <div className="flex flex-col text-center text-sm font-medium text-gray-800">
          <div className="border-b border-gray-400/50 py-5">{auth.user?.name}</div>
          <div className="border-b border-gray-400/50 py-5">{auth.user?.email}</div>

          <div
            onClick={handleDelete}
            className="cursor-pointer py-5 transition-colors hover:bg-black/5 active:bg-black/10"
          >
            ログアウト
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
