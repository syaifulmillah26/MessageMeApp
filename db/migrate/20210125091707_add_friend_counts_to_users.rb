class AddFriendCountsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :friend_counts, :integer
  end
end
