class User < ApplicationRecord
  has_many :user_board, dependent: :destroy
  has_many :boards, through: :user_board
  has_many :cards, through: :user_card
  has_many :user_card, dependent: :destroy
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
