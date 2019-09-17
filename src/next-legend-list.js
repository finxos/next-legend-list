(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');

  nx.legendList = function(inChartStyle) {
    if (!inChartStyle || inChartStyle.format === 'raw') return [];
    var seriesList = [];
    var result = [];
    switch (true) {
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
  console.log('111')
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.legendList;
  }
})();
