angular.module('app').factory('BoardsService', ['Restangular', function(Restangular){

  var _boards = [];

  var _board;


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
    board.remove().then(function() {
     var index = _boards.indexOf(board);
      if (index > -1) {
        _boards.splice(index, 1);
      }
    })
  }

  Restangular.extendModel("boards", function(model) {
    model.edit = function(data) {
      model.patch({board: data});
    };
    return model;
  });

  return {
    getBoards: getBoards,
    findBoard: findBoard,
    createBoard: createBoard,
    deleteBoard: deleteBoard

  }

}])