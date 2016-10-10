angular.module('app').factory('BoardsService', ['Restangular', "$rootScope", function(Restangular, $rootScope){

  var _boards = [];

  var _board;


  var getBoardsArray = function() {
    return _boards;
  }


  var getBoards = function() {
    return Restangular.all("boards").getList().then(function(allBoards) {
      return angular.copy(allBoards, _boards);
    }) 
  };


  var findBoard = function(id) {
    return Restangular.one("boards", id).get();
  };

  var createBoard = function() {
    return Restangular.all("boards").post().then(function(createdBoard) {
    })
  };

  var deleteBoard = function(board) {
    var index = _boards.indexOf(board);
    $rootScope.$broadcast('board.delete');
    board.remove().then(function() {
      _boards.splice(index, 1);
      return _boards
    })
  }

  Restangular.extendModel("boards", function(model) {
    model.edit = function(data) {
      model.patch({board: data});
      $rootScope.$broadcast('board.changed');
    };
    return model;
  });

  return {
    getBoards: getBoards,
    findBoard: findBoard,
    createBoard: createBoard,
    deleteBoard: deleteBoard,
    getBoardsArray: getBoardsArray

  }

}])