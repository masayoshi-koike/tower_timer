import { Button } from '@/components/ui/button';
import LoginPage from '../login';

type Props = {
  name: string;
}

export default function Index({ name }: Props) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Inertia.js + React + Railsの連携に成功しました。</p>
      <LoginPage/>
    </div>
  )
}