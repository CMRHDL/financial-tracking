(function() {
  'use strict';
  angular.module('team.app').constant('resource', {
    help: {
      settings_attribution_add: 'Zuordnung muss mit "+" oder "-" starten. Daraus ergibt sich, ob es eine Einnahme (+) oder Ausgabe (-) ist.',
      settings_attribution_delete: 'Zuordnung anklicken um sie zu löschen. Es wird ein Bestätigungsdialog die Wahl verifizieren.',
      settings_attribution_edit: 'Zuordnung anklicken um sie umzubenennen.',
      settings_attribution_header: 'Ausgaben und Einnahmen können verschiedenen Arten zugeordnet werden.',
    },
    placeholder: {
      settings_attribution_add: 'Name der Zuordnung',
    }
  });
})();
