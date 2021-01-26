class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_one :room
  has_many :messages
  has_many :friends, class_name: "Friends", foreign_key: "friend_id"

  after_create :create_room


  # def create_room
    
  # end
end
