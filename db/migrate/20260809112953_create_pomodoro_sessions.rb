class CreatePomodoroSessions < ActiveRecord::Migration[7.2]
  def change
    create_table :pomodoro_sessions do |t|
      t.references :pomodoro_set, null: false, foreign_key: true
      t.integer :duration_minutes, default: 25, null: false
      t.datetime :completed_at, null: false
      t.timestamps
    end
  end
end
