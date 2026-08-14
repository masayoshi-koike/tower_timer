require "rails_helper"

RSpec.describe "Users", type: :request do
  describe "POST /users" do
    let(:valid_params) do
      { user: { name: "テスト太郎", email: "taro@example.com", password: "password123",
                password_confirmation: "password123" } }
    end

    context "有効なデータの場合" do
      it "Userが作成されること" do
        expect { post "/users", params: valid_params }.to change(User, :count).by(1)
      end

      it "root_pathにリダイレクトされること" do
        post "/users", params: valid_params

        expect(response).to redirect_to(root_path)
      end

      it "作成されたuserでログイン状態になること" do
        post "/users", params: valid_params
        created_user = User.find_by(email: "taro@example.com")

        expect(session[:user_id]).to eq(created_user.id)
      end

      it "送信したpasswordで保存されたuserを認証できること" do
        post "/users", params: valid_params
        created_user = User.find_by(email: "taro@example.com")

        expect(created_user.authenticate("password123")).to eq(created_user)
      end
    end

    context "nameが空の場合" do
      let(:invalid_params) { valid_params.deep_merge(user: { name: "" }) }

      it "Userが作成されないこと" do
        expect { post "/users", params: invalid_params }.not_to change(User, :count)
      end

      it "root_pathにリダイレクトされること" do
        post "/users", params: invalid_params

        expect(response).to redirect_to(root_path)
      end

      it "送信したemailのUserは存在しないこと" do
        post "/users", params: invalid_params

        expect(User.find_by(email: "taro@example.com")).to be_nil
      end

      it "エラーメッセージがInertiaのフラッシュデータとして渡されること" do
        post "/users", params: invalid_params

        expect(session[:inertia_errors]).not_to be_nil
      end
    end

    context "emailが既に登録されている場合" do
      let!(:existing_user) { create(:user, email: "taro@example.com") }

      it "Userが作成されないこと" do
        expect { post "/users", params: valid_params }.not_to change(User, :count)
      end

      it "既存userのidではログイン状態にならないこと" do
        post "/users", params: valid_params

        expect(session[:user_id]).not_to eq(existing_user.id)
      end
    end

    context "passwordが2文字以下の場合" do
      let(:invalid_params) { valid_params.deep_merge(user: { password: "ab", password_confirmation: "ab" }) }

      it "Userが作成されないこと" do
        expect { post "/users", params: invalid_params }.not_to change(User, :count)
      end
    end

    context "password_confirmationがpasswordと一致しない場合" do
      let(:invalid_params) { valid_params.deep_merge(user: { password_confirmation: "different-password" }) }

      it "Userが作成されないこと" do
        expect { post "/users", params: invalid_params }.not_to change(User, :count)
      end
    end
  end
end
