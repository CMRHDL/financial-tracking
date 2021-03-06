(function() {
  'use strict';
  angular.module('team.app').constant('resource', {
    help: {
      code_explain_id: 'Die ID identifiziert eindeutig einen Datensatz. Der Aufbau ergibt sich aus:\nJahr, Nummer, Blatt, Position\n2015|001|01|01',
      settings_attribution_add: 'Zuordnung muss mit "+" oder "-" starten. Daraus ergibt sich, ob es eine Einnahme (+) oder Ausgabe (-) ist.',
      settings_attribution_delete: 'Zuordnung anklicken um sie zu löschen. Es wird ein Bestätigungsdialog die Wahl verifizieren.',
      settings_attribution_edit: 'Zuordnung anklicken um sie umzubenennen.',
      settings_attribution_header: 'Ausgaben und Einnahmen können verschiedenen Arten zugeordnet werden.',
      settings_attribution_new: 'Neue Zuordnung hinzufügen.',
    },
    placeholder: {
      settings_attribution_add: 'Name der Zuordnung',
    },
    templates: {
      table_cell_currency: '<div class="grid-cell currency">{{grid.appScope.formatCurrency(row.entity[col.field])}}</div>',
      table_cell_date: '<div class="grid-cell date">{{row.entity[col.field] | date : "dd.MM.yyyy" : "CET"}}</div>',
      table_cell_attributin_picker: '<select class="dropdown" ng-options="entry.displayName group by entry.group for entry in col.colDef.editableCellValues" ng-model="selectedAtrribution" ng-change="grid.appScope.selectedAttribution(selectedAtrribution, row.entity)"></select>',
    }
  });
})();
