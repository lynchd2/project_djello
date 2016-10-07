app.controller("BoardsIndexCtrl", ["$scope", "currentUser", "BoardsService", "boards", "$state", "$rootScope", function($scope, currentUser, BoardsService, boards, $state, $rootScope) {

  $scope.user = currentUser;
  $scope.boards = BoardsService.getBoardsArray();
  $scope.goToBoard = function(id) {
    $state.go("boards.show", {id: id})
  }

  $scope.createBoard = function() {
    BoardsService.createBoard().then(function(cb) {
      $rootScope.$broadcast('board.changed');
    })
  }

  $scope.$on('board.changed', function(){
    BoardsService.getBoards().then(function(nb){
      $scope.boards = nb;
    });
  });

}])