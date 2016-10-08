angular.module('app').factory('CardsService', ['Restangular', "$rootScope", function(Restangular, $rootScope){

  var _cards = [];

  var getCards = function(listId) {
    return Restangular.one("lists", listId).get().then(function(list) {
      return list.cards
    })
  }

  var findCard = function(id) {
    return Restangular.one("cards", id).get().then(function(card){
      return card;
    })
  }


  var createCard = function(list) {
    var card = {}
    card.list_id = list.id
    return Restangular.all("cards").post(list.id).then(function(createdCard) {
      //$rootScope.$broadcast('card.created');
      _cards.push(createCard);
      return createdCard;
    })
  };


  Restangular.extendModel("cards", function(model) {
    model.edit = function(data) {
      model.patch({card: data});
    };
    return model;
  });


  return {
    createCard: createCard,
    getCards: getCards,
    findCard: findCard
  }


}])