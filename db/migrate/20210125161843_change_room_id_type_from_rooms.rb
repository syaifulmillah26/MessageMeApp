class ChangeRoomIdTypeFromRooms < ActiveRecord::Migration[6.1]
  def change
    change_column :rooms, :room_id, :string
  end
end
