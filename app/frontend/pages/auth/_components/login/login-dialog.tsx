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

interface LoginDialogProps{
  isOpen: boolean;
  onOpenSignUp: () => void;
  onOpenChange: () => void;
  data: {
    email: string;
    password: string;
  };
  setData: (field: string, value: string) => void;
  onSubmit: (e: React.ChangeEvent) => void;
  processing: boolean;
  errors: Partial<Record<string, string>>;
}

export default function LoginDialog({
  isOpen,
  onOpenSignUp,
  onOpenChange,
  data,
  setData,
  onSubmit,
  processing,
  errors,
}: LoginDialogProps) { 

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl">ログイン</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="example@example.com"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
              />
              {errors.base && (
                <span className="text-sm text-red-500">{errors.base}</span>
              )}
            </div>
          </div>

          <DialogFooter className="flex flex-row sm:justify-between ">
            <Button type="submit" disabled={processing} className="flex-1">
              {processing ? 'ログイン中...' : 'ログイン'}
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={onOpenSignUp} 
              className="flex-1"
            >
              新規登録
            </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}