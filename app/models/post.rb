class Post < ApplicationRecord
  belongs_to :user
  extend FriendlyId
  friendly_id :title, use: :slugged
  has_one_attached :image
end
