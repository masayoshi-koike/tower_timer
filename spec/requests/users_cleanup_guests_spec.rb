require 'rails_helper'
require 'rake' 
Rails.application.load_tasks

RSpec.describe 'users:cleanup_guests', type: :task do
  include ActiveSupport::Testing::TimeHelpers

  subject(:run_task) { task.invoke }

  let(:task) { Rake::Task['users:cleanup_guests'] }

  before do
    task.reenable
  end

  around do |example|
    travel_to(Time.zone.local(2026, 8, 19, 12, 0, 0)) { example.run }
  end

  def create_user_with_data(status:, updated_at:, sets: 1, sessions_per_set: 2)
    user = create(:user, status)
    sets.times do
      pomodoro_set = create(:pomodoro_set, user: user)
      create_list(:pomodoro_session, sessions_per_set, pomodoro_set: pomodoro_set)
    end
    user.update_column(:updated_at, updated_at)
    user
  end


  describe '削除対象となる期日（2週間）' do
    context 'updated_at が 2週間前より新しい場合' do
      it '削除されない' do
        guest = create_user_with_data(status: :guest, updated_at: 2.weeks.ago + 1.second)

        expect { run_task }.not_to change(User, :count)
        expect(User).to exist(id: guest.id)
      end
    end

    context 'updated_at が 2週間前ちょうどの場合' do
      it '削除されない（条件が < のため境界は対象外）' do
        guest = create_user_with_data(status: :guest, updated_at: 2.weeks.ago)

        expect { run_task }.not_to change(User, :count)
        expect(User).to exist(id: guest.id)
      end
    end

    context 'updated_at が 2週間前より古い場合' do
      it '削除される' do
        guest = create_user_with_data(status: :guest, updated_at: 2.weeks.ago - 1.second)

        expect { run_task }.to change(User, :count).by(-1)
        expect(User).not_to exist(id: guest.id)
      end
    end

    context '十分に古いゲストの場合' do
      it '削除される' do
        guest = create_user_with_data(status: :guest, updated_at: 3.weeks.ago)

        expect { run_task }.to change(User, :count).by(-1)
        expect(User).not_to exist(id: guest.id)
      end
    end

    context 'created_at のみ古く updated_at が新しいゲストの場合' do
      it '削除されない（判定に使われるのは updated_at）' do
        guest = create_user_with_data(status: :guest, updated_at: 1.day.ago)
        guest.update_column(:created_at, 1.year.ago)

        expect { run_task }.not_to change(User, :count)
        expect(User).to exist(id: guest.id)
      end
    end
  end

  describe '関連データの削除' do
    let!(:guest) do
      create_user_with_data(status: :guest, updated_at: 3.weeks.ago, sets: 2, sessions_per_set: 3)
    end
    let(:set_ids)     { guest.pomodoro_sets.pluck(:id) }
    let(:session_ids) { PomodoroSession.where(pomodoro_set_id: set_ids).pluck(:id) }

    it '紐づく pomodoro_sets が削除される' do
      expect { run_task }.to change { PomodoroSet.where(id: set_ids).count }.from(2).to(0)
    end

    it '紐づく pomodoro_sessions が削除される' do
      expect(session_ids.size).to eq 6

      expect { run_task }.to change { PomodoroSession.where(id: session_ids).count }.from(6).to(0)
    end

    it 'user・pomodoro_set・pomodoro_session が一度にすべて削除される' do
      expect { run_task }
        .to change(User, :count).by(-1)
        .and change(PomodoroSet, :count).by(-2)
        .and change(PomodoroSession, :count).by(-6)
    end

    it '外部キー制約違反を起こさない' do
      expect { run_task }.not_to raise_error
    end
  end

  describe 'ユーザー種別による絞り込み' do
    let!(:old_guest)   { create_user_with_data(status: :guest,   updated_at: 3.weeks.ago) }
    let!(:new_guest)   { create_user_with_data(status: :guest,   updated_at: 1.day.ago) }
    let!(:old_general) { create_user_with_data(status: :general, updated_at: 3.weeks.ago) }
    let!(:new_general) { create_user_with_data(status: :general, updated_at: 1.day.ago) }

    it '古いゲストユーザーのみが削除される' do
      expect { run_task }.to change(User, :count).by(-1)

      expect(User).not_to exist(id: old_guest.id)
      expect(User).to exist(id: new_guest.id)
      expect(User).to exist(id: old_general.id)
      expect(User).to exist(id: new_general.id)
    end

    it '一般ユーザーが古くても削除されない' do
      run_task

      expect(User.general.count).to eq 2
    end

    it '削除対象外ユーザーの関連データは残る' do
      expect { run_task }
        .to change(PomodoroSet, :count).by(-1)
        .and change(PomodoroSession, :count).by(-2)

      expect(old_general.pomodoro_sets.count).to eq 1
      expect(old_general.pomodoro_sessions.count).to eq 2
      expect(new_guest.pomodoro_sets.count).to eq 1
    end
  end

  describe '削除対象が存在しない場合' do
    before { create_user_with_data(status: :general, updated_at: 3.weeks.ago) }

    it 'エラーにならず、何も削除されない' do
      expect { run_task }.not_to raise_error
      expect { task.reenable; task.invoke }.not_to change(User, :count)
    end

    it '0件と出力される' do
      expect { run_task }.to output(/0件の古いゲストユーザーを削除しました。/).to_stdout
    end
  end

  describe '冪等性' do
    before { create_user_with_data(status: :guest, updated_at: 3.weeks.ago) }

    it '2回実行しても2回目は何も削除されずエラーにもならない' do
      expect { run_task }.to change(User, :count).by(-1)

      task.reenable
      expect { task.invoke }.not_to change(User, :count)
    end
  end

  describe '実行結果の出力' do
    before do
      2.times { create_user_with_data(status: :guest, updated_at: 3.weeks.ago) }
      create_user_with_data(status: :guest, updated_at: 1.day.ago)
    end

    it '削除件数が標準出力に表示される' do
      expect { run_task }.to output(/2件の古いゲストユーザーを削除しました。/).to_stdout
    end

    it '削除件数が Rails.logger に記録される' do
      allow(Rails.logger).to receive(:info)

      run_task

      expect(Rails.logger).to have_received(:info).with(/2件の古いゲストユーザーを削除しました。/)
    end
  end

  describe 'バッチ処理（in_batches of: 500）' do
    it '500件を超えるゲストでもすべて削除される', :slow do
      digest = BCrypt::Password.create('password123')
      timestamp = 3.weeks.ago
      rows = Array.new(501) do |i|
        {
          name: "ゲスト#{i}",
          email: "batch_guest_#{i}@example.com",
          password_digest: digest,
          status: User.statuses[:guest],
          created_at: timestamp,
          updated_at: timestamp
        }
      end
      User.insert_all(rows)

      expect { run_task }.to change(User, :count).by(-501)
      expect(User.guest.count).to eq 0
    end
  end
end
