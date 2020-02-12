// configuration of svg/plot area
let config = {
  'svg': {},
  'margin': {},
  'plot': {}
};

config.svg.height = 300;
config.svg.width = config.svg.height * 1.618; // golden ratio

config.margin.top = 10;
config.margin.right = 10;
config.margin.bottom = 20;
config.margin.left = 80;

config.plot.x = config.margin.left;
config.plot.y = config.margin.top;
config.plot.width = config.svg.width - config.margin.left - config.margin.right;
config.plot.height = config.svg.height - config.margin.top - config.margin.bottom;

// setup svg
let svg = d3.select('body').select('svg');
svg.attr('width', config.svg.width);
svg.attr('height', config.svg.height);

// setup plot area
let plot = svg.append('g');
plot.attr('id', 'plot');
//plot.attr('transform', translate(config.plot.x, config.plot.y));

// use a rect to illustrate plot area
let rect = plot.append('rect');
rect.attr('id', 'background');

rect.attr('x', 0);
rect.attr('y', 0);
rect.attr('width', config.plot.width);
rect.attr('height', config.plot.height);
