class RemoveRoomIdFromRooms < ActiveRecord::Migration[6.1]
  def change
    remove_column :rooms, :room_id, :string
  end
end
