import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface SignupDialogProps{
  isOpen: boolean;
  onOpenChange: () => void;
  data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  };
  setData: (field: string, value: string) => void;
  onSubmit: (e: React.ChangeEvent) => void;
  processing: boolean;
  errors: Partial<Record<string, string>>;
}

export default function SignupDialog({
  isOpen,
  onOpenChange,
  data,
  setData,
  onSubmit,
  processing,
  errors,
}: SignupDialogProps) {
  
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl">ユーザー作成</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">ユーザーネーム</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                placeholder="山田 太郎"
              />
              {errors.name && (
                <span className="text-sm text-red-500">{errors.name}</span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="example@example.com"
              />
              {errors.email && (
                <span className="text-sm text-red-500">{errors.email}</span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
              />
              {errors.password && (
                <span className="text-sm text-red-500">{errors.password}</span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password_confirmation">パスワード (確認用)</Label>
              <Input
                id="password_confirmation"
                type="password"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
              />
              {errors.password_confirmation && (
                <span className="text-sm text-red-500">{errors.password_confirmation}</span>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit" disabled={processing}>
              {processing ? '作成中...' : '作成する'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}