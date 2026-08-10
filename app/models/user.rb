class User < ApplicationRecord
  has_secure_password

  has_many :pomodoro_sets, dependent: :destroy
  has_many :pomodoro_sessions, through: :pomodoro_sets

  attribute :status, :integer, default: 0
  enum status: { general: 0, guest: 1 }

  validates :name, presence: true, length: { maximum: 20 }, unless: :guest?
  validates :password, length: { minimum: 3 }, if: -> { new_record? || changes[:password_digest] && !guest?}
  validates :email, presence: true, uniqueness: true, unless: :guest?

  def self.create_guest!
    create!(
      status: :guest,
      name: "ゲスト",
      email: "guest_#{SecureRandom.uuid}@example.com", 
      password: SecureRandom.urlsafe_base64 
    )
  end
  
  def total_study_minutes
    pomodoro_sessions.sum(:duration_minutes)
  end

end