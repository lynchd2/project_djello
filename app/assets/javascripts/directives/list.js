app.directive("list", ["ListsService", "CardsService", "Restangular", function(ListsService, CardsService, Restangular) {

  return {
    restrict: "A",
    templateUrl: "templates/directives/list.html",
    scope: {
      list: "=",
      members: "="
    },
    link: function(scope) {

      scope.cards = []

      CardsService.getCards(scope.list.id).then(function(response) {
        return angular.copy(response, scope.cards)
      })

      scope.editListTitle = function(list) {
        ListsService.findList(scope.list.id).then(function(l) {
          l.edit(list);
        })
      }

      scope.$on("removed.card", function(event, data) {
        for(var i = 0; i < scope.cards.length; i ++) {
          if (scope.cards[i].id === data.id) {
            scope.cards.splice(i,1);
          }
        }
      })

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
    }
  }

}])