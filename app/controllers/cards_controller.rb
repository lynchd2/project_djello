class CardsController < ApplicationController

  def create
    @card = Card.new
    @card.title = "New Card Title work!"
    @card.description = "New Card Description work!"
    @card.list = List.find(params["_json"]);
    if @card.save
      respond_to do |format|
        format.json{ render json: @card }
      end
    else
      respond_to do |format|
        format.json{ render json: {error: @card.errors.full_messages.join(', ')} }
      end
    end
  end

  def show
    @card = Card.find(params[:id])
    respond_to do |format|
      format.json{ render json: @card, include: :users}
    end
  end

  def update
    @card = Card.find(params[:id])
    @user = User.find_by_id(params[:card][:id])
    if @card.update(card_params) 
      @card.users << @user if @user && !@card.users.to_a.include?(@user)
      respond_to do |format| 
        format.json{ render json: {error: @card.errors.full_messages.join(', ')} }
      end
    else 
      respond_to do |format| 
        format.json{}
      end
    end

  end

  def destroy
    @card = Card.find(params[:id])
    @card.destroy
    respond_to do |format| 
        format.json{render json: @card}
    end
  end

  private

  def card_params
    params.require(:card).permit(:title, :description, :list_id, :member_id)
  end

end
