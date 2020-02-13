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

//}

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
  console.log(regions);
  console.log(data);
  //console.log(data.map); does nothing
  // not the best design, but it works and we're moving on
  let years = data.map(row => parseTime(row["Activity Period"]));
  console.log("data[0] = ", data[0]);// only 1 row
  // let years = data[0].values.map(value => value.date);
  //console.log(value.date);

  console.log(years);
  //console.log(years.length);

  // now we have data, set the scales
  scale.x.domain(years);
  scale.y.domain(regions);


  // draw the x and y axis
 let gx = svg.append("g");
 gx.attr("id", "x-axis");
 gx.attr("class", "axis");
 gx.attr("transform", translate(config.plot.x, config.plot.y + config.plot.height));
 gx.call(axis.x);

 let gy = svg.append("g");
 gy.attr("id", "y-axis");
 gy.attr("class", "axis");
 gy.attr("transform", translate(config.plot.x, config.plot.y));
 gy.call(axis.y);

// modify svg
/*
determine min and max

add in scales
figure what type of scale: category, continuous, linear
define domain, range
*/

};
