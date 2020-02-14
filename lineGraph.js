// configurations from bubbles

const width = 960;
const height = 500;

const margin = {
  top: 10,
  bottom: 35,
  left: 35,
  right: 15
}






let parseTime = d3.timeParse("%Y%m");
myTime = parseTime(197912);
console.log("Here it is! ");
console.log(myTime);
//d.date = formatDate.parse(d.date);

function parseData(row, index) {
//var parseTime = d3.time.format("DATEPARSE('YYYYMM', STR([Activity Period]))")
// this will be our converted output row
let out = {};


// this will be the values from each yyyy-mm column
out.values = [];

// loop through all of the columns in our original row
// depending on column name, perform some sort of conversion
for (let col in row) {
  // row is literally the whole row.
  // col = the col name
  // row[col] = value at column = col, row = row
  switch (col) {
    // these are the text columns that do not need conversion
    case 'Activity Period':
    // convert column name into the date
      //d['Activity Period'] = +d['Activity Period'];
      var date = parseTime(row[col]);
      //console.log("my date ", date);

      // convert the value to float
      var value = parseFloat(row[col]);

      // add them to our values
      out.values.push({
        'date': date,
        'value': value
      });
    case 'Passenger Count':
      out[col] = parseInt(row[col]);
      break;

    default:
      out[col] = row[col];
      break;

      // these are the columns that need to be converted to integer
    //case 'Activity Period':
  }
}
//console.log(out);
//console.log(out.values[0]); --> the dates
return out;
} // function parseData
airData = d3.csv("Air_Traffic_Passenger_Statistics.csv", parseData)
.then(function(data) {
  //console.log("Here is airData: ", airData);
  // parse data
  //var myParsedData = parseData(data)
  // now graph
  drawLineGraph(data);
});
//}
// configuration of svg/plot area
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
// scale.x = d3.scaleLinear();
// scale.x.range([0, config.plot.width]);
//
// scale.y = d3.scaleLinear();
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

let drawLineGraph = function(data) {
  console.log(data);
  console.log("Inside drawLineGraph");
  //console.log(data);
  //console.log(data[0]); // one specific row in data
  //console.log(data[0]["values"][0]);

  // I want only the top 5 regions
  let numRegions = 5;

  data = data.filter(function(row) {
    //return row[]
    //console.log("row is ", row);
    return row["GEO Region"] === "Asia" ||
      row["GEO Region"] === "Europe" ||
      row["GEO Region"] === "Canada" ||
      row["GEO Region"] === "Mexico" ||
      row["GEO Region"] === "Australia/Oceania";
    /*
    and also if region === "Asia", ""
    */
  }); // data

  console.log(data);
  console.log("kept", data.length, "rows");

  // so now let's sort

  let sortColumn = "Passenger Count";

  data = data.sort(function(a, b) {
    //console.log(a[sortColumn] - b[sortColumn]);
    return a[sortColumn] - b[sortColumn];
  }); // data

// well anyways set up scales
// know: scale.x.domain(dates)
// scale.y.domain()

  let regions = data.map(row => row["GEO Region"]);
  // so every row is a region
  //console.log(regions);
  //console.log(data);
  //console.log(data.map); does nothing
  // not the best design, but it works and we're moving on
  let years = data.map(row => parseTime(row["Activity Period"]));
  //console.log("data[0] = ", data[0]);// only 1 row
  // let years = data[0].values.map(value => value.date);
  //console.log(value.date);

  //console.log(years);
  //console.log(years.length);

  // now we have data, set the scales

// modify svg
/*
determine min and max

add in scales
figure what type of scale: category, continuous, linear
define domain, range
*/

// Sophie speaks
// draw the x and y axis
//   let gx = svg.append("g");
//   gx.attr("id", "x-axis");
//   gx.attr("class", "axis");
//   gx.attr("transform", translate(config.plot.x, config.plot.y + config.plot.height));
//   gx.call(axis.x);
//
//   let gy = svg.append("g");
//   gy.attr("id", "y-axis");
//   gy.attr("class", "axis");
//   gy.attr("transform", translate(config.plot.x, config.plot.y));
//   gy.call(axis.y);
//
// // get all of the value objects (with date and value) from the rows
//   let values = data.map(d => d.values);
//   console.log("Here are values: ", values);
//
//   // combine all of the individual object arrays into one
//   let merged = d3.merge(values);


  // only want to show short year in labels
  // https://stackoverflow.com/questions/17306830/how-to-get-2-digit-year-w-javascript
  function dateFormatter(d) {
    if (d.getMonth() < 3) {
      //return "'" + d.getFullYear().toString().substr(-2);
      return d.getFullYear().toString();
    }
  }

  // convert region to more condensed form
  function regionFormatter(d) {
    let text = d;
    let parts = text.split(/[,-]+/);

    if (parts !== null) {
      text = parts[0];

      if (parts.length > 2) {
        text = text + "+";
      }
    }

    return text;
  }

  // helper method to make translating easier
function translate(x, y) {
  return 'translate(' + x + ',' + y + ')';
}

};
