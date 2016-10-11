app.directive("card", ["ListsService", "CardsService","ModalService", function(ListsService, CardsService, ModalService) {

  return {
    restrict: "A",
    templateUrl: "templates/directives/card.html",
    scope: {
      card: "=",
      members: "="
    },
    link: function(scope) {


      scope.showCard = function(card, members) {
          ModalService.showModal({
            templateUrl: 'templates/directives/modal.html',
            controller: "ModalCtrl",
            inputs: {
              card: card,
              members: members
             }
        }).then(function(modal) {
            modal.element.modal();
            // modal.close.then(function() {
            // });
        });
      }
    }
  }
}]);