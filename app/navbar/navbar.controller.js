(function() {
  'use strict';
  angular.module('team.app').controller('NavbarCtrl', NavbarCtrl);

  NavbarCtrl.$inject = [ '$location' ];
  function NavbarCtrl($location) {
    var nav = this;


    var activeTab = $location.url().substr(1,$location.url().length) !== '' ? $location.url().substr(1,$location.url().length) : 'overview';

    nav.isTabActive = isTabActive;
    nav.setActiveTab = setActiveTab;

    nav.tabs = [
      {visibleName: 'Home', name: 'home', css: ''},
      {visibleName: 'Eingabe', name: 'input', css: ''},
      {visibleName: 'Übersicht', name: 'overview', css: ''},
      {visibleName: 'Details', name: 'details', css: ''},
      {visibleName: 'Einstellungen', name: 'settings', css: ''},
    ];

    function isTabActive(tab) {
      return activeTab === tab ? 'active' : '';
    }
    function setActiveTab(tab) {
      activeTab = tab;
    }
  }
})();
