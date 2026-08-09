import { useForm } from "@inertiajs/react";
import LoginDialog from "./login-dialog";

interface Props{
  isOpen: boolean;
  onClose: () => void;
  onOpenSignUp: () => void;
}

export default function LoginContainer({ isOpen, onOpenSignUp, onClose }: Props) { 

  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
  })

  const onSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();
    post('/user_sessions', {
      onSuccess: () => {
        onClose();
        reset();
      },
      preserveScroll: true,
    })
  } 

  return (
    <LoginDialog
      isOpen={isOpen}
      onOpenChange={onClose}
      onOpenSignUp={onOpenSignUp}
      data={data}
      setData={setData}
      onSubmit={onSubmit}
      processing={processing}
      errors={errors}
    />
  )
}