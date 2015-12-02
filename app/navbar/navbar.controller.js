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
            {visibleName: 'Home', name: 'home', title: 'Home', css: 'glyphicon-home'},
            {visibleName: 'Eingabe', name: 'input', title: 'Eingabe', css: 'glyphicon-pencil'},
            {visibleName: 'Übersicht', name: 'overview', title: 'Übersicht', css: 'glyphicon-list-alt'},
            {visibleName: 'Details', name: 'details', title: 'Details', css: 'glyphicon-zoom-in'},
            {visibleName: 'Einstellungen', name: 'settings', title: 'Einstellungen', css: 'glyphicon-cog'},
        ];

        function isTabActive(tab) {
          return activeTab === tab ? 'active' : '';
        }
        function setActiveTab(tab) {
          activeTab = tab;
        }
    }
})();
