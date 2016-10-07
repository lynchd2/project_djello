app.directive("list", ["ListsService", function(ListsService) {

  return {
    restrict: "A",
    templateUrl: "templates/directives/list.html",
    scope: {
      list: "="
    },
    link: function(scope) {
      scope.editListTitle = function(list) {
        ListsService.findList(list.id).then(function(l) {
          l.edit(list);
        })
        
      }

    }
  }

}])