app.controller("BoardsCtrl", ["$scope", "currentUser", "BoardsService", "boards", "$state", "$rootScope", function($scope, currentUser, BoardsService, boards, $state, $rootScope) {

  $scope.boards = boards;

   $scope.$on('board.delete', function(){
    $scope.boards = BoardsService.getBoardsArray();
    $state.go("boards.index")
  });

}]);