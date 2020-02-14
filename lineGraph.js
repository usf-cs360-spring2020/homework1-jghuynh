// configurations from bubbles

const width = 960;
const height = 500;

const margin = {
  top: 10,
  bottom: 35,
  left: 35,
  right: 15
}

// set up svg
const svg = d3.select("body").select("svg#lines");
console.assert(svg.size() == 1);


// set svg size
svg.attr("width", width);
svg.attr("height", height);

// add plot region
const plot = svg.append("g").attr("id", "plot");

// this is just so we can see the transform of the plot
// comment out for final version
// plot.append("rect").attr("width", 10).attr("height", 10);

// transform region by margin
plot.attr("transform", translate(margin.left, margin.top));

/*
 * setup scales with ranges and the domains we set from tableau
 * defined globally for access within other functions
 */

const scales = {
  //x: d3.scaleLinear(),
  x: d3.scaleTime(),
  //var x = d3.scaleTime().range([0, width]);
  y: d3.scaleLinear(),
  // do not linearly scale radius...
  // area = pi * r * r, so use sqrt of r!
  r: d3.scaleSqrt(),
  fill: //d3.scaleDiverging(d3.interpolateRdYlGn)
  d3.scaleDiverging(d3.interpolateSpectral)
  //d3.scaleDiverging(d3.interpolateTurbo) // not exactly diverging

  //d3.scaleDiverging(d3.interpolatePiYG)
}; // end of const scales

// we are going to hardcode the domains, so we can setup our scales now
// that is one benefit of prototyping!

// draws the axes for graph
function drawAxis() {
  // place the xaxis and yaxis in their own groups
  const xGroup = svg.append('g').attr('id', 'x-axis').attr('class', 'axis');
  const yGroup = svg.append('g').attr('id', 'y-axis').attr('class', 'axis');

  // create axis generators
  const xAxis = d3.axisBottom(scales.x).ticks(20); // refers to x-part of scales
  const yAxis = d3.axisLeft(scales.y).ticks(20, "s");

  // https://github.com/d3/d3-format#locale_formatPrefix
  // xAxis.ticks(9, 's').tickSizeOuter(0);
  // yAxis.ticks(6).tickSizeOuter(0);;

  // shift x axis to correct location
  xGroup.attr('transform', translate(margin.left, height - margin.bottom));
  xGroup.call(xAxis);

  // shift y axis to correct location
  yGroup.attr('transform', translate(margin.left, margin.top))
  yGroup.call(yAxis);
}



let parseTime = d3.timeParse("%Y%m");
myTime = parseTime(197912);
console.log("Here it is! ");
console.log(myTime);
//d.date = formatDate.parse(d.date);

function parseData(row, index) {
let out = {};


// this will be the values from each yyyy-mm column
out.values = [];

// loop through all of the columns in our original row
// depending on column name, perform some sort of conversion
// for (let col in row) {
//   // row is literally the whole row.
//   // col = the col name
//   // row[col] = value at column = col, row = row
//   switch (col) {
//     // these are the text columns that do not need conversion
//     case 'Activity Period':
//     // convert column name into the date
//       //d['Activity Period'] = +d['Activity Period'];
//       var date = parseTime(row[col]);
//       //console.log("my date ", date);
//
//       // convert the value to float
//       var value = parseFloat(row[col]);
//
//       // add them to our values
//       out.values.push({
//         'date': date,
//         'value': value
//       });
//     case 'Passenger Count':
//       out[col] = parseInt(row[col]);
//       break;
//
//     default:
//       out[col] = row[col];
//       break;
//
//       // these are the columns that need to be converted to integer
//     //case 'Activity Period':
//   }
// }

// format the data


//console.log(out);
//console.log(out.values[0]); --> the dates
return out;
} // function parseData
airData = d3.csv("Air_Traffic_Passenger_Statistics.csv")
.then(function(data) {
  //console.log("Here is airData: ", airData);
  // parse data
  //var myParsedData = parseData(data)
  // now graph
  // format the data
  data.forEach(function(d) {
      d["Activity Period"] = parseTime(d["Activity Period"]);
      d["Passenger Count"] = +d["Passenger Count"]; // convert into integer
      //d.close = +d.close;
  });

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

//Using ES6 Map object:

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}
let drawLineGraph = function(data) {

  // filtering
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
  console.log("Inside drawLineGraph");
  scales.x.range([0, width - margin.left - margin.right]);
  //  gives the two ends of your date
  console.log(typeof(data));
  console.log(data);
  scales.x.domain(d3.extent(data, function(d) {
    console.log(typeof(d));
    return d["Activity Period"];

  }));
  //scales.x.domain([2005, 2020]);
  // the domain of x axis

  scales.y.range([height - margin.top - margin.bottom, 0]);
  scales.y.domain([0, d3.max(data, function(d) {
    console.log(d["Passenger Count"]);
    return d["Passenger Count"];
  })]);
  //scales.y.domain([0, 5000000]);

  // note we can chain if we want
  scales.r.range([1, 20]).domain([0, 9000]);

  scales.fill.domain([-20, 0, 35]);

  drawAxis();
  //console.log(data);
  //console.log(data[0]); // one specific row in data
  //console.log(data[0]["values"][0]);

  // I want only the top 5 regions
  let numRegions = 5;



  console.log(data);
  console.log("kept", data.length, "rows");

  // so now let's sort

  let sortColumn = "Passenger Count";

  // data = data.sort(function(a, b) {
  //   //console.log(a[sortColumn] - b[sortColumn]);
  //   return a[sortColumn] - b[sortColumn];
  // }); // data

// well anyways set up scales
// know: scale.x.domain(dates)
// scale.y.domain()

  //let regions = data.map(row => row["GEO Region"]);
  // so every row is a region
  //console.log(regions);
  //console.log(data);
  //console.log(data.map); does nothing
  // not the best design, but it works and we're moving on
  //let years = data.map(row => parseTime(row["Activity Period"]));

  // group, with an id  = lines
  const group = plot.append("g").attr("id", "lines");

  // define the line
  var valueline = d3.line()
      .x(function(d) { return scales.x(d["Activity Period"]); })
      .y(function(d) { return scales.y(d["Passenger Count"]); });
  const lines = group.selectAll(".line")
    .data(data)
    .enter()
    .append("path")
    .attr("class", "line")
    .attr("d", valueline);


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


};
function translate(x, y) {
  return 'translate(' + x + ',' + y + ')';
}


/*
Contributions
https://bl.ocks.org/d3noob/ddd7129c4486085937eb28da0d22a240

*/
