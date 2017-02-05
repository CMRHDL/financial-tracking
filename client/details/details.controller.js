(function() {
  'use strict';

  angular.module('team.app').component('detailsGraph', {
    controller: DetailsCtrl,
    controllerAs: 'vm',
    template: `
      <div>
        <canvas
          class="chart chart-line" 
          chart-data="[vm.data.data]" 
          chart-labels="vm.data.labels" 
          chart-series="['Kontostand']"
        ></canvas>
      </div>
    `,
  });

  function DetailsCtrl($scope, details, recordset) {
    var vm = this;

    const getInitial = (initial) => ({ data: [parseFloat(initial)], labels: ['Initialwert'], });
    const fillData = (obj, v, i) => {
      obj.data.push(obj.data[i] + (v.gains ? parseFloat(v.gains) : parseFloat(v.expenses)*-1));
      obj.labels.push(v.description);
      return obj;
    };
    const updateData = obj => {
      vm.data = obj;
      $scope.$apply();
    };

    const add = obj => obj.gains ? parseFloat(obj.gains) : parseFloat(obj.expenses)*-1;

    vm.data = {
      data: [],
      labels: [],
    };

    // show all with description
    // details.getInitial()
    //   .map(r => r.data.map(a => a.initialAmount))
    //   .map(a => _.max(a))
    //   .subscribe(initial => {
    //     recordset.getRx()
    //       .map(r => r.data)
    //       .map(R.sortBy(R.prop('code')))
    //       .map(array => array.reduce(fillData, getInitial(initial)))
    //       .subscribe(updateData);
    //   });

    // show all with description
    details.getInitial()
      .map(r => r.data.map(a => a.initialAmount))
      .map(a => _.max(a))
      .subscribe(initial => {
        recordset.getRx()
          .map(r => r.data)
          .map(R.sortBy(R.prop('code')))
          .map(array => array.reduce((arr, val) => {
            val.date = moment(val.date).format('MM-YYYY');
            arr.push(val)
            return arr;
          }, []))
          .map(array => array.reduce((obj, val, i) => {
            if (R.prop(val.date, obj)) {
              obj[val.date] += add(val);
            } else {
              obj[val.date] = add(val);
            }
            return obj;
          }, {}))
          .map(obj => ({
            data: R.values(obj),
            labels: R.keys(obj),
          }))
          .map(obj => {
            obj.data.unshift(initial);
            obj.labels.unshift('Initialwert')
            return obj;
          })
          .map(obj => {
            obj.data = obj.data.reduce((arr, val, i) => {
              arr.push(arr[i] + val);
              return arr;
            }, [0]);
            obj.data.shift();
            return obj;
          })
          .subscribe(updateData);
      });



  }
})();
