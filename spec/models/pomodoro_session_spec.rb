require "rails_helper"

RSpec.describe PomodoroSession, type: :model do
  it "有効な属性であれば有効であること" do
    pomodoro_session = build(:pomodoro_session)
    expect(pomodoro_session).to be_valid
  end

  it "pomodoro_setが紐付いていない場合は無効であること" do
    pomodoro_session = build(:pomodoro_session, pomodoro_set: nil)
    expect(pomodoro_session).to be_invalid
  end

  describe "duration_minutes" do
    it "未設定(nil)の場合は無効であること" do
      pomodoro_session = build(:pomodoro_session, duration_minutes: nil)
      expect(pomodoro_session).to be_invalid
    end

    it "0の場合は無効であること" do
      pomodoro_session = build(:pomodoro_session, duration_minutes: 0)
      expect(pomodoro_session).to be_invalid
    end

    it "負の数の場合は無効であること" do
      pomodoro_session = build(:pomodoro_session, duration_minutes: -1)
      expect(pomodoro_session).to be_invalid
    end

    it "整数でない場合は無効であること" do
      pomodoro_session = build(:pomodoro_session, duration_minutes: 1.5)
      expect(pomodoro_session).to be_invalid
    end

    it "正の整数であれば有効であること" do
      pomodoro_session = build(:pomodoro_session, duration_minutes: 25)
      expect(pomodoro_session).to be_valid
    end
  end

  describe "completed_at" do
    it "未設定(nil)の場合は無効であること" do
      pomodoro_session = build(:pomodoro_session, completed_at: nil)
      expect(pomodoro_session).to be_invalid
    end
  end
end
