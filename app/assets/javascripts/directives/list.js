app.directive("list", ["ListsService", "CardsService", "Restangular", function(ListsService, CardsService, Restangular) {

  return {
    restrict: "A",
    templateUrl: "templates/directives/list.html",
    scope: {
      list: "=",
    },
    link: function(scope) {

      scope.cards = []

      CardsService.getCards(scope.list.id).then(function(response) {
        console.log(response)
        return angular.copy(response, scope.cards)
      })

      scope.removeCard = function(card) {
        var cardToRemove = card
        console.log(card.id)
        if(confirm("Are you sure have completed that task? If so, the card will be removed.")) {
          Restangular.one("cards", card.id).remove().then(function(response) {
            angular.element(".modal-backdrop").remove()
            scope.cards.splice(scope.cards.indexOf(cardToRemove),1);
            return scope.cards;
          })
        }
      }

      scope.editListTitle = function(list) {
        ListsService.findList(scope.list.id).then(function(l) {
          l.edit(list);
        })
      }

      scope.createCard = function() {
        //THINK ABOUT SEPERATING THIS SO IT DOES NOT MAKE AN API CALL     
        // CardsService.getCards(scope.list.id).then(function(response) {
        //   scope.cards = response;
        // })
        /// DONE. NOT API CALL
        CardsService.createCard(scope.list).then(function(createdCard) {
          scope.cards.push(createdCard)
        })
      }

      scope.editCard = function(card) {
        CardsService.findCard(card.id).then(function(oldCard) {
          oldCard.edit(card);
        })
      }
    }
  }

}])