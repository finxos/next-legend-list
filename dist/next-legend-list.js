/*!
 * name: next-legend-list
 * url: https://github.com/afeiship/next-legend-list
 * version: 1.0.0
 * date: 2019-09-17T09:58:35.198Z
 * license: MIT
 */

function _getRawLegendList(option) {
  var legendList = [],
    _colorList = '';
  if (!option.hasOwnProperty('legend') || !option.hasOwnProperty('series')) return []; //剔除不含图例的图
  if (option.hasOwnProperty('color') && Array.isArray(option.color)) _colorList = option.color;
  if (Array.isArray(option.legend)) {
    //legend是一个数组，暂时出现在饼图中
    if (option.legend[0] && option.legend[0].hasOwnProperty('data')) {
      legendList = _getRawNameColorList(option.legend[0].data, _colorList);
    }
  } else {
    //legend是一个对象
    if (!option.legend.hasOwnProperty('data')) return [];
    legendList = _getRawNameColorList(option.legend.data, _colorList); //获取nameList
  }
  legendList = _getRawType(option.series, legendList);
  return legendList;
}

function _getMiaotuLegendList(option) {
  if (!option.chartOption) {
    return [];
  }
  var _option = option.chartOption;
  if (!_option.seriesList) return [];
  var seriesList = [];
  _option.seriesList.forEach(function(seriesItem) {
    if (seriesItem.show !== false) {
      seriesList.push({
        type: seriesItem.chartType,
        name: seriesItem.name,
        color: seriesItem.color
      });
    }
  });
  return seriesList;
}

function _getRawNameColorList(legendDataList, colorList) {
  return legendDataList.map(function(legendItem, legendIndex) {
    var _name = '';
    if (typeof legendItem === 'object') {
      _name = legendItem.name;
    } else {
      _name = legendItem;
    }
    return {
      name: _name,
      color: colorList && colorList[legendIndex] ? colorList[legendIndex] : ''
    };
  });
}

function _getRawType(series, legendList) {
  series.forEach(function(seriesItem) {
    if (
      seriesItem.type == 'line' ||
      seriesItem.type == 'bar' ||
      seriesItem.type == 'map' ||
      seriesItem.type == 'scatter'
    ) {
      //适用于line, bar, scatter, map
      legendList.forEach(function(legendItem) {
        if (legendItem.name === seriesItem.name) {
          legendItem.type = seriesItem.type;
          legendItem.color = seriesItem.color
            ? seriesItem.color
            : seriesItem.itemStyle && seriesItem.itemStyle.color
            ? seriesItem.itemStyle.color
            : legendItem.color;
        }
      });
    }
    if (seriesItem.type == 'pie') {
      seriesItem.data.forEach(function(sDataItem) {
        legendList.forEach(function(legendItem) {
          if (sDataItem.name == legendItem.name) {
            legendItem.type = 'pie';
            legendItem.color =
              sDataItem.itemStyle && sDataItem.itemStyle.color
                ? sDataItem.itemStyle.color
                : legendItem.color;
          }
        });
      });
    }
    if (seriesItem.type == 'funnel') {
      //itemStyle.color
    }
    if (seriesItem.type == 'sankey') {
      //itemStyle.color
    }
    if (seriesItem.type == 'lines') {
    }
    if (seriesItem.type == 'parallel') {
    }
    if (seriesItem.type == 'candlestick') {
    }
  });
  return legendList;
}
(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');

  nx.legendList = function(option) {
    legendList = []; //{type, name, color}
    if (option.format === 'raw') {
      legendList = _getRawLegendList(option);
    } else {
      legendList = _getMiaotuLegendList(option);
    }
    console.log(legendList);
    return legendList;
  };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.legendList;
  }
})();

//# sourceMappingURL=next-legend-list.js.map
