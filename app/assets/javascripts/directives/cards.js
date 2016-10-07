app.directive("card", ["ListsService", "CardsService", function(ListsService, CardsService) {

  return {
    restrict: "A",
    templateUrl: "templates/directives/card.html",
    scope: {
      card: "=",
      removeCard: "&",
      editCard: "&"
    },
    link: function(scope) {
    }
  }
}]);