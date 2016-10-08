class ListsController < ApplicationController


  def create
    @list = List.new
    @list.title = "New List Title"
    @list.description = "New List Description"
    @list.board = Board.find(params["_json"]);
    if @list.save
      respond_to do |format|
        format.json{ render json: @list }
      end
    else
      respond_to do |format|
        format.json{ render json: {error: @list.errors.full_messages.join(', ')} }
      end
    end
  end

  def show
    @list = List.find(params[:id])
    respond_to do |format|
      format.json{ render json: @list, include: :cards}
    end
  end

  def update
    @list = List.find(params[:id])
    if @list.update(list_params) 
      respond_to do |format| 
        format.json{ render json: @list}
      end
    else 
      respond_to do |format| 
        format.json{ render json: {error: @list.errors.full_messages.join(', ')} }
      end
    end

  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy
    respond_to do |format| 
        format.json{render json: @list}
    end
  end

  private

  def list_params
    params.require(:list).permit(:title, :description)
  end
end
