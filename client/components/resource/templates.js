(function() {
  'use strict';
  angular.module('team.app').run(function templates($templateCache) {
    $templateCache.put('ui-grid/uiGridFooterCell',
      "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div>{{ col.getAggregationText() + ( col.getAggregationValue() CUSTOM_FILTERS ) }}</div></div>"
    );
  });
})();