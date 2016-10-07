app.directive("list", ["ListsService", "CardsService", function(ListsService, CardsService) {

  return {
    restrict: "A",
    templateUrl: "templates/directives/list.html",
    scope: {
      list: "=",
    },
    link: function(scope) {

      scope.cards = []

      CardsService.getCards(scope.list.id).then(function(response) {
        return angular.copy(response, scope.cards)
      })

      scope.removeCard = function(card) {
        if(confirm("Are you sure have completed that task? If so, the card will be removed.")) {
          
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

      scope.editCard = function() {
        CardsService.editCard(scope.list)
      }

      scope.card = {title: "Card Title", description: "Card Description"}
    }
  }

}])