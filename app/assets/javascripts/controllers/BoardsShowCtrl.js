app.controller("BoardsShowCtrl", ["$scope", "BoardsService", "$stateParams", "boards", "$state", "$rootScope", function($scope, BoardsService, $stateParams, boards, $state, $rootScope) {
  //REMINDER: NEED TO RESOLVE RESTANGULAR OBJECTS IN CONTROLLER, NOT SERVICE
  

  //Finding the board and adding pagination
  BoardsService.findBoard($stateParams.id).then(function(board) {
    $scope.board = board;
    $scope.lists = board.lists;
    $scope.pageSize = 4;
    $scope.currentPage = 1;
    $scope.numberOfPages = function() {
      return Math.ceil($scope.lists.length / $scope.pageSize)
    }
  })

  $scope.boards = boards;

  $scope.deleteBoard = function(board) {
    BoardsService.deleteBoard(board);
    $rootScope.$broadcast('board.changed');
    $state.go("boards.index");
  }

  
  $scope.goToBoard = function(id) {
    $state.go("boards.show", {id: id})
  }

  $scope.editTitle = function(board) {
    $scope.board.edit($scope.board);
    $rootScope.$broadcast('board.changed');
  }

  $scope.createList = function(board) {
    ListService.createList();
  }

  $scope.$on('board.changed', function(){
    BoardsService.getBoards();
  });

}])

