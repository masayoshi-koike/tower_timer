FactoryBot.define do
  factory :pomodoro_set do
    user
    target_sessions { 1 }
    status { :paused }
    elapsed_time { 0 }
    resumed_at { nil }

    trait :in_progress do
      status { :in_progress }
      resumed_at { Time.current }
    end

    trait :paused do
      status { :paused }
    end

    trait :break_time do
      status { :break_time }
      resumed_at { Time.current }
    end

    trait :break_paused do
      status { :break_paused }
    end

    trait :canceled do
      status { :canceled }
    end
  end
end
