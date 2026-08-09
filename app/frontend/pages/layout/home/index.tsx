import SidberContainer from '@/pages/auth/_components/sidebar/sidebar-container';
import TimerPage from './timer/timerPage';

type Props = {
  name: string;
}

export default function Index({ name }: Props) {
  return (
    <div className="bg-[#ebebe2]">
      <SidberContainer>
        <TimerPage />
      </SidberContainer>
    </div>
  )
}