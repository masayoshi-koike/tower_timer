import { toast } from 'sonner';
import { FlashProps } from "@/types/auth";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";


export default function FlashToast() {
  const { flash } = usePage<FlashProps>().props;
  console.log("Current Flash Props:", flash);

  useEffect(() => {
    if (!flash) return;

    if (flash.success) {
      toast.success(flash.success)
    }
  }, [flash]);

  return null;

}