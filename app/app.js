(function() {

    function config($routeProvider){
      $routeProvider
        .when('/', {
          templateUrl: 'home/home.html',
          controller : 'HomeCtrl',
          controllerAs : 'vm',
        })
        .when('/home', {
          templateUrl: 'home/home.html',
          controller : 'HomeCtrl',
          controllerAs : 'vm',
        })
        .when('/input', {
          templateUrl: 'input/input.html',
          controller : 'InputCtrl',
          controllerAs : 'vm',
        })
        .when('/overview', {
          templateUrl: 'overview/overview.html',
          controller : 'OverviewCtrl',
          controllerAs : 'vm',
        })
        .when('/details', {
          templateUrl: 'details/details.html',
          controller : 'DetailsCtrl',
          controllerAs : 'vm',
        })
        .otherwise({
          redirectTo:'/'
        });
    }

    angular.module('team.app',['ngRoute', 'ui.grid', 'ui.grid.resizeColumns']);
    angular.module('team.app').config(config);

}());