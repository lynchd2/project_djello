angular.module('app').factory('CardsService', ['Restangular', "$rootScope", function(Restangular, $rootScope){

  var _cards = [];

  var getCards = function(listId) {
    return Restangular.one("lists", listId).get().then(function(list) {
      return list.cards
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

  var editCard = function(list) {
    console.log("edit card")
  }


  return {
    createCard: createCard,
    editCard: editCard,
    getCards: getCards
  }


}])