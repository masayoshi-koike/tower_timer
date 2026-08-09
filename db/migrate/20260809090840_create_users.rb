class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users, id: :uuid, default: "uuidv7()" do |t|
      t.string :name,                    null: false
      t.string :email,                   null: false, index: { unique: true }
      t.string :password_digest,         null: false
      t.integer :status, default: 0, null: false
      t.timestamps
    end
  end
end
