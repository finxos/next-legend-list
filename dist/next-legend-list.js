/*!
 * name: next-legend-list
 * url: https://github.com/afeiship/next-legend-list
 * version: 1.0.0
 * date: 2019-09-11T09:09:19.322Z
 * license: MIT
 */

(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');

  nx.legendList = function(inChartStyle) {
    if (!inChartStyle) return [];
    var seriesList = [];
    var result = [];
    switch (true) {
      case inChartStyle.format === 'raw':
        return [];
      case inChartStyle.verion !== undefined || inChartStyle.format !== undefined:
        seriesList = inChartStyle.series ? inChartStyle.series : inChartStyle.seriesList;
        break;
      default:
        seriesList = inChartStyle.chartOption.seriesList;
        break;
    }

    result = seriesList.map(function(item) {
      return Object.assign({ show: true }, item);
    });

    result = result.filter(function(item) {
      return item.show;
    });

    return result.map(function(item) {
      var type = item.type || item.chartType;
      return {
        color: item.color,
        name: item.name,
        type: type
      };
    });
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.legendList;
  }
})();

//# sourceMappingURL=next-legend-list.js.map
