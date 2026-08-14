require "rails_helper"

RSpec.describe User, type: :model do
  describe "バリデーション" do
    it "name, email, passwordが有効な値であれば有効であること" do
      user = build(:user)
      expect(user).to be_valid
    end

    describe "name" do
      it "空欄の場合は無効であること" do
        user = build(:user, name: "")
        expect(user).to be_invalid
        expect(user.errors[:name]).to be_present
      end

      it "20文字であれば有効であること" do
        user = build(:user, name: "あ" * 20)
        expect(user).to be_valid
      end

      it "21文字以上の場合は無効であること" do
        user = build(:user, name: "あ" * 21)
        expect(user).to be_invalid
        expect(user.errors[:name]).to be_present
      end
    end

    describe "email" do
      it "空欄の場合は無効であること" do
        user = build(:user, email: "")
        expect(user).to be_invalid
        expect(user.errors[:email]).to be_present
      end

      it "既に登録されているemailと同じ場合は無効であること" do
        create(:user, email: "duplicate@example.com")
        user = build(:user, email: "duplicate@example.com")
        expect(user).to be_invalid
        expect(user.errors[:email]).to be_present
      end

      it "他のuserと異なるemailであれば有効であること" do
        create(:user, email: "existing@example.com")
        user = build(:user, email: "another@example.com")
        expect(user).to be_valid
      end
    end

    describe "password" do
      it "空欄の場合は無効であること" do
        user = build(:user, password: "", password_confirmation: "")
        expect(user).to be_invalid
        expect(user.errors[:password]).to be_present
      end

      it "2文字以下の場合は無効であること" do
        user = build(:user, password: "ab", password_confirmation: "ab")
        expect(user).to be_invalid
        expect(user.errors[:password]).to be_present
      end

      it "3文字以上であれば有効であること" do
        user = build(:user, password: "abc", password_confirmation: "abc")
        expect(user).to be_valid
      end

      it "password_confirmationが一致しない場合は無効であること" do
        user = build(:user, password: "password123", password_confirmation: "different")
        expect(user).to be_invalid
        expect(user.errors[:password_confirmation]).to be_present
      end
    end

    describe "ゲストユーザー(status: guest)の場合" do
      it "初期値（name, email）が設定されていれば有効であること" do
        guest = build(:user, :guest) 
        expect(guest).to be_valid
      end

      it "passwordが短すぎる場合は一般ユーザーと同様に無効であること" do
        guest = build(:user, :guest, password: "ab", password_confirmation: "ab")
        expect(guest).to be_invalid
        expect(guest.errors[:password]).to be_present
      end
    end
  end

  describe "#authenticate" do
    let(:user) { create(:user, password: "password123", password_confirmation: "password123") }

    it "正しいパスワードの場合はuser自身を返すこと" do
      expect(user.authenticate("password123")).to eq(user)
    end

    it "誤ったパスワードの場合はfalseを返すこと" do
      expect(user.authenticate("wrong-password")).to be false
    end
  end

  describe ".create_guest!" do
    it "Userが新規作成されること" do
      expect { described_class.create_guest! }.to change(described_class, :count).by(1)
    end

    it "statusがguestであること" do
      guest = described_class.create_guest!
      expect(guest).to be_guest
    end

    it "呼び出すたびに一意なemailが採番され、有効なレコードとして保存されること" do
      guest1 = described_class.create_guest!
      guest2 = described_class.create_guest!
      expect(guest1.email).not_to eq(guest2.email)
      expect(guest1).to be_persisted
      expect(guest2).to be_persisted
    end
  end

  describe "#total_study_minutes" do
    let(:user) { create(:user) }

    it "完了済みのpomodoro_sessionが無ければ0を返すこと" do
      expect(user.total_study_minutes).to eq(0)
    end

    it "紐づく全pomodoro_sessionのduration_minutesの合計を返すこと" do
      set = create(:pomodoro_set, user: user)
      create(:pomodoro_session, pomodoro_set: set, duration_minutes: 25)
      create(:pomodoro_session, pomodoro_set: set, duration_minutes: 15)

      expect(user.total_study_minutes).to eq(40)
    end

    it "他のuserのpomodoro_sessionは合計に含まれないこと" do
      other_user = create(:user)
      other_set = create(:pomodoro_set, user: other_user)
      create(:pomodoro_session, pomodoro_set: other_set, duration_minutes: 25)

      expect(user.total_study_minutes).to eq(0)
    end
  end
end
