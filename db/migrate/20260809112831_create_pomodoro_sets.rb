class CreatePomodoroSets < ActiveRecord::Migration[7.2]
  def change
    create_table :pomodoro_sets do |t|
      t.references :user, type: :uuid, null: false, foreign_key: true
      t.integer :target_sessions, default: 1, null: false
      t.integer :status, default: 0, null: false
      t.integer :elapsed_time, default: 0, null: false
      t.datetime :resumed_at
      t.timestamps
    end
  end
end
