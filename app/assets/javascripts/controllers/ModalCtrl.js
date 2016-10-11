app.controller('ModalCtrl', ['$scope', "CardsService" ,'close', "card", "members",
                     function($scope, CardsService, close,   card,   members) {

  $scope.close = function(result) {
    close(result, 500)
  };

  $scope.card = card;
  $scope.memberChoices = members

  $scope.editCard = function(card) {
    CardsService.findCard(card.id).then(function(oldCard) {
      oldCard.edit(card);
    })
  }

  $scope.removeCard = function(card) {
    close(card, 300)
    CardsService.removeCard(card)
  }

  $scope.submitMember = function(member) {
    CardsService.addUser($scope.card, member)
  }

  $scope.getMembers = function(card) {
    CardsService.getMembers(card).then(function(response) {
      console.log(response)
      $scope.members = response.users;
    })
  }

  $scope.getMembers($scope.card)

}]);