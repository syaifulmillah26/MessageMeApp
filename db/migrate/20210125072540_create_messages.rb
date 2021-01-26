class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.text :body
      t.belongs_to :user, null: false, foreign_key: true
      t.integer :room

      t.timestamps
    end
  end
end
