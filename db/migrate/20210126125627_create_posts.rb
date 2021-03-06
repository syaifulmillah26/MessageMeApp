class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :body
      t.string :slug
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :posts, :slug, unique: true
  end
end
