import SidberContainer from '@/pages/auth/_components/sidebar/sidebar-container';

type Props = {
  name: string;
}

export default function Index({ name }: Props) {
  return (
    <div className="bg-[#ebebe2]">
      <SidberContainer>
        <h1>Hello, {name}!</h1>
        <p>Inertia.js + React + Railsの連携に成功しました。</p>
      </SidberContainer>
    </div>
  )
}