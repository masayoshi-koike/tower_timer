require "rails_helper"

RSpec.describe "StudyCalendars", type: :request do
  let(:now) { Time.zone.local(2026, 3, 20, 12, 0) }
  let(:user) { travel_to(Time.zone.local(2026, 1, 15, 9, 0)) { create(:user) } }
  let(:pomodoro_set) { create(:pomodoro_set, user: user) }

  def create_study_session(completed_at, set: pomodoro_set)
    create(:pomodoro_session, pomodoro_set: set, completed_at: completed_at)
  end

  describe "GET /study_calendar" do
    context "ログインしていない(ゲスト)場合" do
      it "401を返すこと" do
        get "/study_calendar"

        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "ログインしている場合" do
      before { login_as(user) }

      it "今月の日別の学習時間(分)を日付キーで返すこと" do
        create_study_session(Time.zone.local(2026, 3, 11, 10, 0))
        create_study_session(Time.zone.local(2026, 3, 11, 10, 30))
        create_study_session(Time.zone.local(2026, 3, 12, 0, 5))

        travel_to(now) { get "/study_calendar" }
        json = response.parsed_body

        expect(response).to have_http_status(:ok)
        expect(json["month"]).to eq("2026-03")
        expect(json["today"]).to eq("2026-03-20")
        expect(json["minMonth"]).to eq("2026-01")
        expect(json["days"]).to eq("2026-03-11" => 50, "2026-03-12" => 25)
      end

      it "指定した月の記録のみを返すこと" do
        create_study_session(Time.zone.local(2026, 2, 28, 23, 59))
        create_study_session(Time.zone.local(2026, 3, 1, 0, 0))

        travel_to(now) { get "/study_calendar", params: { month: "2026-02" } }
        json = response.parsed_body

        expect(json["month"]).to eq("2026-02")
        expect(json["days"]).to eq("2026-02-28" => 25)
      end

      it "他のユーザーの記録を含めないこと" do
        other_set = create(:pomodoro_set)
        create_study_session(Time.zone.local(2026, 3, 11, 10, 0), set: other_set)

        travel_to(now) { get "/study_calendar" }

        expect(response.parsed_body["days"]).to eq({})
      end

      it "未来の月を指定した場合は今月に丸めること" do
        travel_to(now) { get "/study_calendar", params: { month: "2026-05" } }

        expect(response.parsed_body["month"]).to eq("2026-03")
      end

      it "登録月より前を指定した場合は登録月に丸めること" do
        travel_to(now) { get "/study_calendar", params: { month: "2025-06" } }

        expect(response.parsed_body["month"]).to eq("2026-01")
      end

      it "不正な月の指定は今月として扱うこと" do
        travel_to(now) { get "/study_calendar", params: { month: "2026-13" } }

        expect(response.parsed_body["month"]).to eq("2026-03")
      end
    end
  end
end
