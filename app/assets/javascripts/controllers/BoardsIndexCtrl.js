app.controller("BoardsIndexCtrl", ["$scope", "currentUser", "BoardsService", function($scope, currentUser, BoardsService) {
  $scope.test = "Hello, Djello!"
  $scope.user = currentUser;

  $scope.boards = BoardsService.getBoards();
}])