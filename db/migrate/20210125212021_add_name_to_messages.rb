class AddNameToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :sender, :string
    rename_column :messages, :room, :room_id
  end
end
