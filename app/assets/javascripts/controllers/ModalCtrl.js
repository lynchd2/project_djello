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
    var memberObject = JSON.parse(member)
    CardsService.addUser($scope.card, memberObject.id)
    $scope.members.push(memberObject)
  }

  $scope.getMembers = function(card) {
    CardsService.getMembers(card).then(function(response) {
      $scope.members = response.users;
    })
  }

  $scope.members = $scope.getMembers($scope.card)
}]);