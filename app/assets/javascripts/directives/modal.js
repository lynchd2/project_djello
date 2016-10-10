app.directive("modal", ["ListsService", "CardsService", function(ListsService, CardsService) {

  return {
    restrict: "A",
    templateUrl: "templates/directives/modal.html",
    scope: {
      card: "=",
      removeCard: "&",
      editCard: "&"
    },
    link: function(scope, element) {
    }
  }
}]);