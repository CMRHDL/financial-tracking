(function() {

  'use strict';
  function config($mdDateLocaleProvider, $routeProvider){

    moment.locale('de');

    $mdDateLocaleProvider.parseDate = function(dateString) {
      var m = moment(dateString, 'L', true);
      return m.isValid() ? m.toDate() : new Date(NaN);
    };

    $mdDateLocaleProvider.formatDate = function(date) {
      var m = moment(date);
      return m.isValid() ? m.format('L') : '';
    };

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
      template: '<details-graph></details-graph>',
    })
    .when('/settings', {
      templateUrl: 'settings/settings.html',
      controller : 'SettingsCtrl',
      controllerAs : 'vm',
    })
    .otherwise({
      redirectTo:'/'
    });
  }

  angular.module('team.app',[
    'chart.js',
    'ngMaterial',
    'ngRoute',
    'ui.bootstrap',
    'ui.grid',
    'ui.grid.cellNav',
    'ui.grid.edit',
    'ui.grid.exporter',
    'ui.grid.moveColumns',
    'ui.grid.saveState',
    'ui.grid.resizeColumns',
    'ui.grid.rowEdit',
  ]);
  angular.module('team.app').config(config);

}());
