import { useForm } from "@inertiajs/react";
import SignUpDialog from "./signup-dialog";

interface Props{
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupContainer({ isOpen, onClose }: Props) {

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const onSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();
    post('/users', {
      onSuccess: () => {
        onClose();
        reset();
      },
      preserveScroll: true,
    })
  } 

  return (
    <SignUpDialog
      isOpen={isOpen}
      onOpenChange={onClose}
      data={data}
      setData={setData}
      onSubmit={onSubmit}
      processing={processing}
      errors={errors}
    />
  )
}