class Board < ApplicationRecord
  has_many :lists
  has_many :user_board, dependent: :destroy
  has_many :users, through: :user_board
end
