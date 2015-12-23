(function() {
  'use strict';
  angular.module('team.app').run(function templates($templateCache) {
    $templateCache.put('ui-grid/uiGridFooterCell',
      "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div>{{ col.getAggregationText() + ( col.getAggregationValue() CUSTOM_FILTERS ) }}</div></div>"
    );

    $templateCache.put('hue.html',
"    <div>" +
"        <h3 class=\"modal-title\">Daten übernommen</h3>" +
"    </div>" +
"    <div class=\"modal-footer\">" +
"        <button class=\"btn btn-success\" type=\"button\" ng-click=\"ok()\">OK</button>" +
"        <button class=\"btn btn-success\" type=\"button\" ng-click=\"overview()\">Zur Übersicht wechseln</button>" +
"    </div>"
    );
  });
})();