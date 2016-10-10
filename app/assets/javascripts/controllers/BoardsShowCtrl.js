app.controller("BoardsShowCtrl", ["$scope", "BoardsService", "$stateParams", "boards", "$state", "ListsService", "$rootScope", function($scope, BoardsService, $stateParams, boards, $state, ListsService, $rootScope) {
  //REMINDER: NEED TO RESOLVE RESTANGULAR OBJECTS IN CONTROLLER, NOT SERVICE
  

  //Finding the board and adding pagination
  BoardsService.findBoard($stateParams.id).then(function(board) {
    $scope.board = board;
    ListsService.getLists(board.id).then(function(lists) {
      $scope.lists = lists.reverse()
      $scope.pageSize = 4;
      $scope.currentPage = 0;
      $scope.numberOfPages = function() {
        return Math.ceil($scope.lists.length / $scope.pageSize)
      }
    })
  })

  $scope.boards = boards;

  $scope.deleteBoard = function(board) {
    BoardsService.deleteBoard(board)
  }

  
  $scope.goToBoard = function(id) {
    $state.go("boards.show", {id: id})
  }

  $scope.editTitle = function(board) {
    $scope.board.edit($scope.board);
  }

  $scope.createList = function(board) {
    ListsService.createList($scope.board);
    $rootScope.$broadcast('list.changed');
   
  };


  $scope.$on('list.changed', function(){
    $state.go("boards.show", {id: $scope.board.id});
  })
}])

