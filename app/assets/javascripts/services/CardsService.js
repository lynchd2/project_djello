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
      return createdCard;
    })
  };

  var addUser = function(card, member) {
    Restangular.one("cards", card.id).get().then(function(responseCard) {
      responseCard.edit({id: member});
    });
  }

  var removeCard = function(card) {
      if(confirm("Are you sure have completed that task? If so, the card will be removed.")) {
        return Restangular.one("cards", card.id).remove().then(function(response) {
          angular.element(".modal-backdrop").remove()
          $rootScope.$broadcast("removed.card", response)
          return response;
          // scope.cards.splice(scope.cards.indexOf(cardToRemove),1);
          // return scope.cards;
        })
      }
    }


  var getMembers = function(card) {
    return Restangular.one("cards", card.id).get()
  }



  Restangular.extendModel("cards", function(model) {
    model.edit = function(data) {
      model.patch({card: data});
    };
    return model;
  });


  return {
    createCard: createCard,
    getCards: getCards,
    findCard: findCard,
    removeCard: removeCard,
    addUser: addUser,
    getMembers: getMembers
  }


}])