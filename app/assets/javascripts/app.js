var app = angular.module('app', ['ui.router', "restangular", "Devise", "xeditable", "angularModalService"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

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
  '$urlRouterProvider', '$stateProvider',  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/boards")

    $stateProvider

    .state("boards", {
      url: "/boards",
      abstract: true,
      views: {
        "main-content": {
          templateUrl: "templates/maincontent.html",
          controller: "BoardsCtrl"
        }
      },
      resolve: {
        currentUser: ['Auth', function(Auth){
          return Auth.currentUser()
          .then(function(user){
            return user;
          });
        }],
        boards: ["BoardsService", function(BoardsService) {
          return BoardsService.getBoards();
        }]
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
      // ,
      // resolve: {
      //   board: ["BoardsService", "$stateParams", function(BoardsService, $stateParams) {
      //     return BoardsService.findBoard($stateParams.id)
      //   }]
      // }
    })
  }])

