class CardsController < ApplicationController
  def create
    @card = Card.new
    @card.title = "New Card Title"
    @card.description = "New Card Description"
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
      format.json{ render json: @card}
    end
  end

  def update
    @card = Card.find(params[:id])
    if @card.update(card_params) 
      respond_to do |format| 
        format.json{ render json: @card}
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
end
