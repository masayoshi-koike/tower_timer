FactoryBot.define do
  factory :pomodoro_session do
    pomodoro_set
    duration_minutes { 25 }
    completed_at { Time.current }
  end
end
