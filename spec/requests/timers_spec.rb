require "rails_helper"

RSpec.describe "Timers", type: :request do
  let(:user) { create(:user) }

  describe "POST /timer/start" do
    context "進行中/一時停止中のPomodoroSetが存在しない場合" do
      it "userに紐づく新しいPomodoroSetが作成されること" do
        login_as(user)

        expect { post "/timer/start" }.to change { user.pomodoro_sets.count }.by(1)
      end

      it "作成されたPomodoroSetのstatusがin_progressになること" do
        login_as(user)

        post "/timer/start"

        expect(user.pomodoro_sets.last).to be_in_progress
      end

      it "レスポンスのactiveSetに作成されたPomodoroSetの情報が含まれること" do
        login_as(user)

        post "/timer/start"
        created_set = user.pomodoro_sets.last
        json = response.parsed_body

        expect(json["activeSet"]["id"]).to eq(created_set.id)
        expect(json["activeSet"]["status"]).to eq("in_progress")
      end
    end

    context "一時停止中(paused)のPomodoroSetが既に存在する場合" do
      it "新規作成せず、既存のPomodoroSetをin_progressで再開すること" do
        login_as(user)
        existing_set = create(:pomodoro_set, :paused, user: user, elapsed_time: 60)

        expect { post "/timer/start" }.not_to change(PomodoroSet, :count)

        expect(existing_set.reload).to be_in_progress
        expect(existing_set.elapsed_time).to eq(60)
      end
    end

    context "休憩一時停止中(break_paused)のPomodoroSetが既に存在する場合" do
      it "既存のPomodoroSetをbreak_timeで再開すること" do
        login_as(user)
        existing_set = create(:pomodoro_set, :break_paused, user: user)

        post "/timer/start"

        expect(existing_set.reload).to be_break_time
      end
    end
  end

  describe "POST /timer/stop" do
    context "進行中(in_progress)のPomodoroSetが存在する場合" do
      it "経過時間がelapsed_timeに加算され、statusがpausedになること" do
        login_as(user)
        
        base_time = Time.current.change(usec: 0)
        
        pomodoro_set = create(:pomodoro_set, :in_progress, user: user, elapsed_time: 10, resumed_at: base_time)

        travel_to(base_time + 50.seconds) do
          post "/timer/stop"
        end

        pomodoro_set.reload

        expect(pomodoro_set).to be_paused
        expect(pomodoro_set.elapsed_time).to eq(60)
        expect(pomodoro_set.resumed_at).to be_nil
      end
    end

    context "進行中/休憩中のPomodoroSetが存在しない場合" do
      it "エラーにならず、activeSetがnullのレスポンスを返すこと" do
        login_as(user)

        post "/timer/stop"

        expect(response).to have_http_status(:ok)
        expect(response.parsed_body["activeSet"]).to be_nil
      end
    end

    context "休憩中(break_time)のPomodoroSetが存在する場合" do
      it "ステータスがbreak_pausedになること" do
        login_as(user)
        
        base_time = Time.current.change(usec: 0)
        
        pomodoro_set = create(:pomodoro_set, :break_time, user: user, elapsed_time: 0, resumed_at: base_time)

        travel_to(base_time + 10.seconds) do
          post "/timer/stop"
        end

        pomodoro_set.reload

        expect(pomodoro_set).to be_break_paused
        expect(pomodoro_set.elapsed_time).to eq(10)
        expect(pomodoro_set.resumed_at).to be_nil
      end
    end
  end

  describe "POST /timer/complete" do
    context "進行中(in_progress)のPomodoroSetが存在する場合" do
      it "PomodoroSessionが1件作成されること" do
        login_as(user)
        pomodoro_set = create(:pomodoro_set, :in_progress, user: user, elapsed_time: 1500)

        expect { post "/timer/complete" }.to change { pomodoro_set.pomodoro_sessions.count }.by(1)
      end

      it "statusがbreak_pausedになり、elapsed_timeが0にリセットされること" do
        login_as(user)
        pomodoro_set = create(:pomodoro_set, :in_progress, user: user, elapsed_time: 1500)

        post "/timer/complete"
        pomodoro_set.reload

        expect(pomodoro_set).to be_break_paused
        expect(pomodoro_set.elapsed_time).to eq(0)
      end

      it "レスポンスのis_completedがtrueになること" do
        login_as(user)
        create(:pomodoro_set, :in_progress, user: user)

        post "/timer/complete"

        expect(response.parsed_body["activeSet"]["is_completed"]).to be true
      end
    end

    context "進行中のPomodoroSetが存在しない場合" do
      it "エラーにならず、activeSetがnullのレスポンスを返すこと" do
        login_as(user)

        post "/timer/complete"

        expect(response).to have_http_status(:ok)
        expect(response.parsed_body["activeSet"]).to be_nil
      end
    end
  end

  describe "POST /timer/reset" do
    it "statusがcanceledになり、レスポンスのactiveSetがnullになること" do
      login_as(user)
      pomodoro_set = create(:pomodoro_set, :in_progress, user: user)

      post "/timer/reset"

      expect(pomodoro_set.reload).to be_canceled
      expect(response.parsed_body["activeSet"]).to be_nil
    end
  end
end
