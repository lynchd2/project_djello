angular.module('app').factory('ListsService', ['Restangular', "$rootScope", "$http", function(Restangular, $rootScope, $http){ 

  var _lists = [];

  var findList = function(id) {
    return Restangular.one("lists", id).get().then(function(list){
      return list;
    })
  }

  var createList = function(board) {
    var list = {}
    list.board_id = board.id
    return Restangular.all("lists").post(board.id).then(function(createdList) {
      $rootScope.$broadcast('list.changed');
      _lists.push(createdList);
    })
  };

  var getLists = function(boardId) {
    return Restangular.one("boards", boardId).get().then(function(board) {
      return angular.copy(board.lists.reverse(), _lists)
    })
  }

  var removeList = function(list) {
    return Restangular.one("lists", list.id).get().then(function(list) {
      return list.remove(); 
    })
  }

  var getListArray = function() {
    return _lists
  }

  Restangular.extendModel("lists", function(model) {
    model.edit = function(data) {
      model.patch({list: data});
    };
    return model;
  });

  return {
    getLists: getLists,
    findList: findList,
    createList: createList,
    getListArray: getListArray,
    removeList: removeList
  }


  
 

}]);