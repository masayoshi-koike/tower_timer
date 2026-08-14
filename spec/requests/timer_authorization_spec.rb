require "rails_helper"

RSpec.describe "Timer authorization", type: :request do
  let(:owner) { create(:user) }
  let!(:owners_set) { create(:pomodoro_set, :in_progress, user: owner, elapsed_time: 100, resumed_at: 10.seconds.ago) }

  shared_examples "他人のPomodoroSetを操作できない" do
    it "POST /timer/start しても他人のPomodoroSetは変更されず、自分専用のPomodoroSetが作成されること" do
      original_attributes = owners_set.attributes

      expect { post "/timer/start" }.to change { PomodoroSet.where.not(user: owner).count }.by(1)
      expect(owners_set.reload.attributes).to eq(original_attributes)

      json = response.parsed_body
      expect(json["activeSet"]["id"]).not_to eq(owners_set.id)
    end

    it "POST /timer/stop しても他人のPomodoroSetのstatus/elapsed_timeは変化しないこと" do
      original_attributes = owners_set.attributes

      post "/timer/stop"

      expect(owners_set.reload.attributes).to eq(original_attributes)
    end

    it "POST /timer/complete しても他人のPomodoroSetにPomodoroSessionが作成されないこと" do
      expect { post "/timer/complete" }.not_to change { owners_set.pomodoro_sessions.count }
    end

    it "POST /timer/reset しても他人のPomodoroSetはcanceledにならないこと" do
      post "/timer/reset"

      expect(owners_set.reload.status).not_to eq("canceled")
    end
  end

  context "別のuserとしてログインしている場合" do
    let(:other_user) { create(:user) }

    before { login_as(other_user) }

    include_examples "他人のPomodoroSetを操作できない"

    it "自分自身のPomodoroSetに対してはstart操作が行えること" do
      expect { post "/timer/start" }.to change { other_user.pomodoro_sets.count }.by(1)
      expect(other_user.pomodoro_sets.last).to be_in_progress
    end
  end

  context "ログインしていない(ゲストとして扱われる)場合" do
    include_examples "他人のPomodoroSetを操作できない"

    it "ゲスト自身のPomodoroSetは作成され、owner分とは別レコードであること" do
      post "/timer/start"

      json = response.parsed_body
      expect(json["activeSet"]["id"]).not_to eq(owners_set.id)
      expect(PomodoroSet.where.not(user: owner).count).to eq(1)
    end
  end
end
