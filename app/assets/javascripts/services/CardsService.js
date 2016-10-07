angular.module('app').factory('CardsService', ['Restangular', "$rootScope", function(Restangular, $rootScope){

  var createCard = function(list) {
    console.log("create card")
  }

  var editCard = function(list) {
    console.log("edit card")
  }


  return {
    createCard: createCard,
    editCard: editCard
  }


}])