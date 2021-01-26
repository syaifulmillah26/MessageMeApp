class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_one :room
  has_many :messages
  has_many :friends, class_name: "Friends", foreign_key: "friend_id"
  has_many :posts

  extend FriendlyId
  friendly_id :name, use: :slugged

  after_create :create_username

  def create_username
    user = User.find_by(id: self.id)
    user.update(username: self.name.gsub!(/\s+/, ''))
  end

end
