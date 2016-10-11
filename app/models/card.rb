class Card < ApplicationRecord
  belongs_to :list
  has_many :users, through: :user_card
  has_many :user_card, dependent: :destroy
end
