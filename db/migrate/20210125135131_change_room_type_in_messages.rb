class ChangeRoomTypeInMessages < ActiveRecord::Migration[6.1]
  def change
    change_column :messages, :room, :string
  end
end
