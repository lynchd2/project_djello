var app = angular.module('app', ['ui.router', "restangular", "Devise"]);


app.factory('_' ['$window', function($window) {
  return $window._;
}]);

app.config([
  "$httpProvider",
  function($httpProvider) {
    var token = $('meta[name=csrf-token]').attr('content');
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = token;
  }
]);

// config for restangular
app.config([
  'RestangularProvider',
  function(RestangularProvider) {

    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setDefaultHttpFields({"content-type": "application/json"});
  }
]);

app.config([
  '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/boards")

    $stateProvider

    .state("boards", {
      url: "/boards",
      abstract: true,
      views: {
        "main-content": {
          templateUrl: "templates/maincontent.html"
        }
      }
    })

    .state("boards.index", {
      url: "",
      views: {
        "boards-index" : {
          templateUrl: "templates/boards/index.html",
          controller: "BoardsIndexCtrl"
        }
      }
    })

    .state("boards.show", {
      url:"/:id",
      views: {
        "boards-show": {
          templateUrl: "templates/boards/show.html",
          controller: "BoardsShowCtrl"        
        }
      }
    })
  }])