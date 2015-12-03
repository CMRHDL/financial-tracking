(function() {
  'use strict';
  angular.module('team.app').controller('NavbarCtrl', NavbarCtrl);

  NavbarCtrl.$inject = [ '$location', '$scope' ];
  function NavbarCtrl($location, $scope) {
    var nav = this;

    nav.isActive = isActive;

    var activeTab = getLocation();

    $scope.$on('$locationChangeSuccess', function() {
      activeTab = getLocation();
    });

    nav.tabs = [
      {visibleName: 'Login', name: 'home', title: 'Home', css: 'glyphicon-home'},
      {visibleName: 'Eingabe', name: 'input', title: 'Eingabe', css: 'glyphicon-pencil'},
      {visibleName: 'Übersicht', name: 'overview', title: 'Übersicht', css: 'glyphicon-list-alt'},
      {visibleName: 'Details', name: 'details', title: 'Details', css: 'glyphicon-zoom-in'},
      {visibleName: 'Einstellungen', name: 'settings', title: 'Einstellungen', css: 'glyphicon-cog'},
    ];

    function isActive(tab) {
      return activeTab === tab ? 'active' : '';
    }

    function getLocation() {
      return $location.url().substr(1,$location.url().length) !== '' ? $location.url().substr(1,$location.url().length) : 'home';
    }
  }
})();
