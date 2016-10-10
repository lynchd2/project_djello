app.directive("card", ["ListsService", "CardsService","ModalService", function(ListsService, CardsService, ModalService) {

  return {
    restrict: "A",
    templateUrl: "templates/directives/card.html",
    scope: {
      card: "=",
      removeCard: "&",
      editCard: "&"
    },
    link: function(scope, element) {

      scope.seeCard = false;

      scope.showCard = function(card, element) {
        $(element).on("click", function(el) {
          console.log(card)
        })
      }

      scope.open = function() {
        console.log("DS")
      }
    }
  }
}]);