namespace :users do
  RETENTION_PERIOD = 2.weeks

  desc "#{RETENTION_PERIOD.inspect}以上経過したゲストユーザーと関連データを削除する"
  task cleanup_guests: :environment do
    Timeout.timeout(600) do
      old_guests = User.guest.where('updated_at < ?', RETENTION_PERIOD.ago)

      deleted_count = 0

      old_guests.in_batches(of: 500) do |relation|
        deleted_count += relation.destroy_all.count(&:destroyed?)
      end

      Rails.logger.info("[#{Time.current}] #{deleted_count}件の古いゲストユーザーを削除しました。")
      puts "#{deleted_count}件の古いゲストユーザーを削除しました。"
    end
  end
end
