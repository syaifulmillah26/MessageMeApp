class AddDateToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :date, :string
  end
end
