/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

// Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  Plotly.d3.event.preventDefault();

  // Select the input value from the form
  var stock = Plotly.d3.select("#stockInput").node().value;
  console.log(stock);

  // clear the input value
  Plotly.d3.select("#stockInput").node().value = "";

  // Build the plot with the new stock
  buildPlot(stock);
}

function buildPlot(stock) {
  var apiKey = "r5yJkHKvJNUZBvXDUqrk";

  var url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;

  Plotly.d3.json(url, function(error, response) {

    if (error) return console.warn(error);

    // Grab values from the response json object to build the plots
    var name = response.dataset.name;
    var stock = response.dataset.dataset_code;
    var startDate = response.dataset.start_date;
    var endDate = response.dataset.end_date;
    var dates = unpack(response.dataset.data, 0);
    var openingPrices = unpack(response.dataset.data, 1);
    var highPrices = unpack(response.dataset.data, 2);
    var lowPrices = unpack(response.dataset.data, 3);
    var closingPrices = unpack(response.dataset.data, 4);

    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: name,
      x: dates,
      y: closingPrices,
      line: {
        color: "#17BECF"
      }
    };

    // Candlestick Trace
    var trace2 = {
      type: "candlestick",
      x: dates,
      high: highPrices,
      low: lowPrices,
      open: openingPrices,
      close: closingPrices
    };

    var data = [trace2];

    var layout = {
      title: `${stock} closing prices`,
      xaxis: {
        range: [startDate, endDate],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("plot", data, layout);
  });
}

// Add event listener for submit button
Plotly.d3.select("#submit").on("click", handleSubmit);
