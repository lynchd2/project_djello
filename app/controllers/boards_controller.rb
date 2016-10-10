class BoardsController < ApplicationController
  #before_action :current_user, only: [:update, :destroy]
  
  def index
    @boards = User.find(current_user.id).boards
    respond_to do |format|
      format.json{render json: @boards}
    end
  end

  def create
    @board = Board.new()
    @board.title = "Default Title"
    @board.users << current_user
    if @board.save
      respond_to do |format|
        puts "IT SAVED"
        format.json{ render json: @board }
      end
    else
      puts "IT FAILED"
      respond_to do |format| 
        format.json{ render json: {error: @board.errors.full_messages.join(', ')} }
      end
    end
  end

  def show
    @board = Board.find(params[:id])
    respond_to do |format|
      format.json{ render json: @board, include: :lists}
    end
  end

  def update
    @board = Board.find(params[:id])
    if @board.update(board_params) 
      respond_to do |format| 
        format.json{ render json: @board}
      end
    else 
      respond_to do |format| 
        format.json{}
      end
    end

  end

  def edit
  end

  def destroy
    @board = Board.find(params[:id])
    @board.destroy
    respond_to do |format| 
        format.json{render json: @board}
    end
  end

  private

  def board_params
    params.require(:board).permit(:title)
  end

end
