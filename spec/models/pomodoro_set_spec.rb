require "rails_helper"

RSpec.describe PomodoroSet, type: :model do
  describe "バリデーション" do
    it "userが紐付いていれば有効であること" do
      pomodoro_set = build(:pomodoro_set)
      expect(pomodoro_set).to be_valid
    end

    it "userが紐付いていない場合は無効であること" do
      pomodoro_set = build(:pomodoro_set, user: nil)
      expect(pomodoro_set).to be_invalid
    end
  end

  describe "#start!" do
    context "一時停止中(paused)の場合" do
      it "in_progressに変わり、resumed_atが更新されること" do
        pomodoro_set = create(:pomodoro_set, :paused, elapsed_time: 30)
        now = Time.current

        travel_to(now) { pomodoro_set.start! }

        expect(pomodoro_set.reload).to be_in_progress
        expect(pomodoro_set.resumed_at).to be_within(1.second).of(now)
        expect(pomodoro_set.elapsed_time).to eq(30)
      end
    end

    context "休憩の一時停止中(break_paused)の場合" do
      it "break_timeに変わり、resumed_atが更新されること" do 
        pomodoro_set = create(:pomodoro_set, :break_paused)
        now = Time.current

        travel_to(now) { pomodoro_set.start! } 

        expect(pomodoro_set.reload).to be_break_time
        expect(pomodoro_set.resumed_at).to be_within(1.second).of(now) 
      end
    end
  end

  describe "#stop!" do
    context "進行中(in_progress)の場合" do
      it "pausedに変わり、経過時間がelapsed_timeに加算されること" do
        resumed_at = Time.current.change(usec: 0)
        pomodoro_set = create(:pomodoro_set, :in_progress, elapsed_time: 10, resumed_at: resumed_at)

        travel_to(resumed_at + 50.seconds) { pomodoro_set.stop! }
        pomodoro_set.reload

        expect(pomodoro_set).to be_paused
        expect(pomodoro_set.elapsed_time).to eq(60)
        expect(pomodoro_set.resumed_at).to be_nil
      end
    end

    context "休憩中(break_time)の場合" do
      it "break_pausedに変わり、経過時間がelapsed_timeに加算されること" do 
        resumed_at = Time.current.change(usec: 0)
        pomodoro_set = create(:pomodoro_set, :break_time, elapsed_time: 10, resumed_at: resumed_at)

        travel_to(resumed_at + 50.seconds) { pomodoro_set.stop! }
        pomodoro_set.reload

        expect(pomodoro_set).to be_break_paused
        expect(pomodoro_set.elapsed_time).to eq(60) 
        expect(pomodoro_set.resumed_at).to be_nil   
      end
    end

    context "進行中でも休憩中でもない場合" do
      it "falseを返し、状態を変更しないこと" do
        pomodoro_set = create(:pomodoro_set, :paused, elapsed_time: 10)

        result = pomodoro_set.stop!

        expect(result).to be false
        expect(pomodoro_set.reload.elapsed_time).to eq(10)
      end
    end
  end

  describe "#complete_session!" do
    context "進行中(in_progress)の場合" do
      it "pomodoro_sessionが1件作成されること" do
        pomodoro_set = create(:pomodoro_set, :in_progress, elapsed_time: 1500)

        expect { pomodoro_set.complete_session! }.to change { pomodoro_set.pomodoro_sessions.count }.by(1)
      end

      it "statusがbreak_pausedに変わり、elapsed_timeとresumed_atがリセットされること" do
        pomodoro_set = create(:pomodoro_set, :in_progress, elapsed_time: 1500)

        pomodoro_set.complete_session!
        pomodoro_set.reload

        expect(pomodoro_set).to be_break_paused
        expect(pomodoro_set.elapsed_time).to eq(0)
        expect(pomodoro_set.resumed_at).to be_nil
      end

      it "作成されたpomodoro_sessionにcompleted_atとdefaultのduration_minutes(25)が保存されること" do
        pomodoro_set = create(:pomodoro_set, :in_progress)
        now = Time.current

        travel_to(now) { pomodoro_set.complete_session! }
        session = pomodoro_set.pomodoro_sessions.last

        expect(session.duration_minutes).to eq(25)
        expect(session.completed_at).to be_within(1.second).of(now)
      end
    end

    context "進行中でない場合" do
      it "falseを返し、pomodoro_sessionが作成されないこと" do
        pomodoro_set = create(:pomodoro_set, :paused)

        result = nil
        expect { result = pomodoro_set.complete_session! }.not_to change { pomodoro_set.pomodoro_sessions.count }
        expect(result).to be false
      end
    end
  end

  describe "#cancel!" do
    it "statusがcanceledに変わること" do
      pomodoro_set = create(:pomodoro_set, :in_progress)

      pomodoro_set.cancel!

      expect(pomodoro_set.reload).to be_canceled
    end
  end
end
