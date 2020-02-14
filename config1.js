// // configuration of svg/plot area
// let config = {
//   'svg': {},
//   'margin': {},
//   'plot': {}
// };
//
// config.svg.height = 400;
// config.svg.width = config.svg.height * 1.618; // golden ratio
//
// // the margins
// config.margin.top = 10;
// config.margin.right = 10;
// config.margin.bottom = 20;
// config.margin.left = 80;
//
// // The plot dimensions
// config.plot.x = config.margin.left;
// config.plot.y = config.margin.top;
// config.plot.width = config.svg.width - config.margin.left - config.margin.right;
// config.plot.height = config.svg.height - config.margin.top - config.margin.bottom;
//
// // setup svg
// let svg = d3.select('body').select('svg');
// svg.attr('width', config.svg.width);
// svg.attr('height', config.svg.height);
//
// // setup plot area
// let plot = svg.append('g');
// plot.attr('id', 'plot');
// //plot.attr('transform', translate(config.plot.x, config.plot.y));
//
// // use a rect to illustrate plot area
// let rect = plot.append('rect');
// rect.attr('id', 'background');
//
// rect.attr('x', 0);
// rect.attr('y', 0);
// rect.attr('width', config.plot.width);
// rect.attr('height', config.plot.height);
//
// // scales for data
// let scale = {};
//
// scale.x = d3.scaleContinuous();
// scale.x.range([0, config.plot.width]);
//
// scale.y = d3.scaleContinuous();
// scale.y.range([config.plot.height, 0]);
//
// // https://github.com/d3/d3-scale-chromatic
// scale.color = d3.scaleSequential(d3.interpolateViridis);
//
// let axis = {};  // axes for data
// axis.x = d3.axisBottom(scale.x);
// axis.x.tickPadding(0);
//
// axis.y = d3.axisLeft(scale.y);
// axis.y.tickPadding(0);
//
// // format the tick labels
// axis.x.tickFormat(dateFormatter);
// axis.y.tickFormat(regionFormatter);
