app.directive("list", ["ListsService", "CardsService", function(ListsService, CardsService) {

  return {
    restrict: "A",
    templateUrl: "templates/directives/list.html",
    scope: {
      list: "=",
    },
    link: function(scope) {
      scope.editListTitle = function(list) {
        ListsService.findList(list.id).then(function(l) {
          l.edit(list);
        })
      }
      scope.createCard = function() {
        CardsService.createCard(scope.list);
      }

      scope.editCard = function() {
        CardsService.editCard(scope.list)
      }

      scope.card = {title: "Card Title", description: "Card Description"}

    }
  }

}])