require "rails_helper"

RSpec.describe "UserSessions", type: :request do
  let!(:user) { create(:user, email: "login@example.com", password: "password123", password_confirmation: "password123") }
  describe "POST /user_sessions" do

    context "正しいemailとpasswordの場合" do
      it "そのuserとしてログイン状態になること" do
        post "/user_sessions", params: { email: "login@example.com", password: "password123" }

        expect(session[:user_id]).to eq(user.id)
      end

      it "root_pathにリダイレクトされること" do
        post "/user_sessions", params: { email: "login@example.com", password: "password123" }

        expect(response).to redirect_to(root_path)
      end
    end

    context "passwordが間違っている場合" do
      before do
        post "/user_sessions", params: { email: "login@example.com", password: "wrong-password" }
      end

      it "そのuserとしてログイン状態にならないこと" do
        expect(session[:user_id]).not_to eq(user.id)
      end

      it "元のページ(またはroot_path)にリダイレクトされること" do
        expect(response).to redirect_to(root_path)
      end
    end

    context "登録されていないemailの場合" do
      before do
        post "/user_sessions", params: { email: "unknown@example.com", password: "password123" }
      end

      it "そのuserとしてログイン状態にならないこと" do
        expect(session[:user_id]).not_to eq(user.id)
      end

      it "元のページ(またはroot_path)にリダイレクトされること" do
        expect(response).to redirect_to(root_path)
      end
    end
  end

  describe "DELETE /user_sessions (ログアウト)" do
    before do
      post "/user_sessions", params: { email: "login@example.com", password: "password123" }
    end

    it "セッションが破棄され、ログアウト状態になること" do
      delete "/user_sessions/#{user.id}"
      
      expect(session[:user_id]).to be_nil
    end

    it "root_pathにリダイレクトされること" do
      delete "/user_sessions/#{user.id}"
      
      expect(response).to redirect_to(root_path)
    end
  end
end
