angular.module('app').factory('ListsService', ['Restangular', function(Restangular){ 

  var _lists = [];

  var findList = function(id) {
    return Restangular.one("lists", id).get().then(function(list){
      return list;
    })
  }

  var getLists = function(boardId) {
    return Restangular.one("boards", id).get().then(function(board) {
      console.log(board.lists)
      return angular.copy(board.lists, _lists)
    })
  }

  Restangular.extendModel("lists", function(model) {
    model.edit = function(data) {
      model.patch({list: data});
    };
    return model;
  });

  return {
    getLists: getLists,
    findList: findList
  }


  
 

}]);