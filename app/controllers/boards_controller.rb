class BoardsController < ApplicationController
  
  def index
    @boards = Board.all.where(user_id: current_user.id)
    respond_to do |format|
      format.json{render json: @boards}
    end
  end

  def show
  end

end
