app.controller("BoardsShowCtrl", ["$scope", "BoardsService", "$stateParams", "boards", "$state", "ListsService", "$rootScope", function($scope, BoardsService, $stateParams, boards, $state, ListsService, $rootScope) {
  //REMINDER: NEED TO RESOLVE RESTANGULAR OBJECTS IN CONTROLLER, NOT SERVICE
  

  //Finding the board and adding pagination
  BoardsService.findBoard($stateParams.id).then(function(board) {
    $scope.board = board;
    $scope.members = $scope.board.users
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

  $scope.$on('get.boardUsers', function(event, data){
    console.log("DSA")
  });

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


  $scope.removeList = function(list) {
    ListsService.removeList(list).then(function() {
      var index = $scope.lists.indexOf(list)
      $scope.lists.splice(index,1)
    })
  }


  $scope.findUser = function(userName, board) {
    BoardsService.addUser(userName, board).then(function(userAdded) {
      var found = false;
        for(var i = 0; i < $scope.members.length; i++) {
          if ($scope.members[i].id == userAdded.id) {
          found = true;
          break;
        }
      }
      if(!found) {
        $scope.members.push(userAdded)
      }
    })
  }


  $scope.$on('list.changed', function(){
    $state.go("boards.show", {id: $scope.board.id});
  })
}])

