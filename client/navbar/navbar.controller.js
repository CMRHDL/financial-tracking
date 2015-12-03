(function() {
  'use strict';
  angular.module('team.app').controller('NavbarCtrl', NavbarCtrl);

  NavbarCtrl.$inject = [ '$location' ];
  function NavbarCtrl($location) {
    var nav = this;

    nav.isActive = isActive;

    nav.tabs = [
      {visibleName: 'Login', name: 'home', title: 'Home', css: 'glyphicon-home'},
      {visibleName: 'Eingabe', name: 'input', title: 'Eingabe', css: 'glyphicon-pencil'},
      {visibleName: 'Übersicht', name: 'overview', title: 'Übersicht', css: 'glyphicon-list-alt'},
      {visibleName: 'Details', name: 'details', title: 'Details', css: 'glyphicon-zoom-in'},
      {visibleName: 'Einstellungen', name: 'settings', title: 'Einstellungen', css: 'glyphicon-cog'},
    ];

    function isActive(tab) {
      return getLocation() === tab ? 'active' : '';
    }

    function getLocation() {
      return $location.path().substring(1) || 'home';
    }
  }
})();
