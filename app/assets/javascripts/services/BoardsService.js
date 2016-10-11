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

  var addUser = function(userName, board) {
    Restangular.all('users').customGET("", {param: userName}).then(function(r) {
      var user = r[0]
      var id = r[0].id
      board.edit({user_id: id});
      $rootScope.$broadcast('get.boardUsers', user);
    })
  }

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
    //NOT HERE FOR PATCH 404
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
    getBoardsArray: getBoardsArray,
    addUser, addUser

  }

}])