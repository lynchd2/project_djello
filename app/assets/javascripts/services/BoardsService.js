angular.module('app').factory('BoardsService', ['Restangular', function(Restangular){

  var getBoards = function() {
    return Restangular.all("boards").getList().$object;
  }


  return {
    getBoards: getBoards
  }

}])