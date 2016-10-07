class ListsController < ApplicationController


  def create
    @list = List.new(list_params)
    respond_to do |format|
      if @list.save
        format.json{ render json: @list }
      else
        format.json{ render json: {error: @list.errors.full_messages.join(', ')} }
      end
    end
  end

  def show
    @list = List.find(params[:id])
    respond_to do |format|
      format.json{ render json: @list}
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
        format.json{}
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


  def list_params
    params.require(:list).permit(:title, :description)
  end
end
