// Helper function to select stock data, returns an array of values
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

// Grab monthly data from Quandl
function getMonthlyData() {
  var apiKey = "r5yJkHKvJNUZBvXDUqrk";
  var queryUrl = `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2016-10-01&end_date=2017-10-01&collapse=monthly&api_key=${apiKey}`;
  Plotly.d3.json(queryUrl, function(error, response) {
    var dates = unpack(response.dataset.data, 0);
    var openPrices = unpack(response.dataset.data, 1);
    var highPrices = unpack(response.dataset.data, 2);
    var lowPrices = unpack(response.dataset.data, 3);
    var closingPrices = unpack(response.dataset.data, 4);
    var volume = unpack(response.dataset.data, 5);
    buildTable(dates, openPrices, highPrices, lowPrices, closingPrices, volume);
  });
}

// Display monthly data in table
function buildTable(dates, openPrices, highPrices, lowPrices, closingPrices, volume) {
  var table = Plotly.d3.select("#summary-table");
  var tbody = table.select("tbody");
  var trow;
  for (var i = 0; i < 12; i++) {
    trow = tbody.append("tr");
    trow.append("td").text(dates[i]);
    trow.append("td").text(openPrices[i]);
    trow.append("td").text(highPrices[i]);
    trow.append("td").text(lowPrices[i]);
    trow.append("td").text(closingPrices[i]);
    trow.append("td").text(volume[i]);
  }
}

// Calculate a rolling average for an array
function rollingAverage(arr, windowPeriod = 10) {
  // rolling averages array to return
  var averages = [];
  // Loop through all of the data
  for (var i = 0; i < arr.length - windowPeriod; i++) {
    // calculate the average for a window of data
    var sum = 0;
    for (var j = 0; j < windowPeriod; j++) {
      sum += arr[i + j];
    }
    // calculate the average and push it to the averages array
    averages.push(sum / windowPeriod);
  }
  return averages;
}

// Returns an array with the color for each bar of the volume chart
function getVolumeColors(closingPrices) {
  var colors = [];
  for (i = 0; i < closingPrices.length; i++) {
    if (i != 0) {
      if (closingPrices[i] > closingPrices[i-1]) {
        colors.push("green")
      }
      else {
        colors.push("red")
      }
    }
    else {
      colors.push("red")
    }
  }
  return colors;
}

// Build the candlestick chart of the Quandl data
function buildPlot() {
  var apiKey = "r5yJkHKvJNUZBvXDUqrk";
  var url = `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;

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
    var volume = unpack(response.dataset.data, 5);
    var rollingPeriod = 30;
    var rollingAvgClosing = rollingAverage(closingPrices, rollingPeriod);
    var colors = getVolumeColors(closingPrices);

    getMonthlyData();

    // Candlestick Trace
    var candle = {
      type: "candlestick",
      x: dates,
      high: highPrices,
      low: lowPrices,
      open: openingPrices,
      close: closingPrices,
      yaxis: 'y2',
      showlegend: false
    };

    // Rolling Averages Trace
    var rolling_avg = {
      type: "scatter",
      mode: "lines",
      name: "Rolling",
      x: dates.slice(0,dates.length - rollingPeriod),
      y: rollingAvgClosing,
      marker: {
        color: "#17BECF"
      },
      yaxis: 'y2',
      line: {width: 1}
    };

    // Volume Trace
    var volume = {
      type: 'bar',
      x: dates,
      y: volume,
      marker: { color: colors },
      yaxis: 'y',
      name: 'Volume'
    };

    var data = [candle, rolling_avg, volume];

    var layout = {
      type: "date",
      title: `${stock} closing prices`,
      xaxis: {
        range: [startDate, endDate],
        rangeselector: {
          visibe: true,
          x: 0,
          y: 0.9,
          bgcolor: 'rgba(150, 200, 250, 0.4)',
          font: {size: 13},
          buttons: [
            {
              count: 1,
              label: 'reset',
              step: 'all'
            },
            {
              count: 1,
              label: '1 mo',
              step: 'month',
              stepmode: 'backward'
            },
            {
              count: 3,
              label: '3 mo',
              step: 'month',
              stepmode: 'backward'
            },
            {
              count: 1,
              label: '1yr',
              step: 'year',
              stepmode: 'backward'
            },
            {
              step: 'all'
            }
          ]
        },
        rangeslider: {visible: false},
      },
      yaxis: {
        domain: [0, 0.2],
        showticklabels: false
      },
      yaxis2: {
        domain: [0.2, 0.8]
      },
      legend: {
        orientation: 'h',
        y: 0.9,
        x: 0.95,
        yanchor: 'bottom',
        xanchor: 'right'
      }
    };

    Plotly.newPlot("plot", data, layout);

  });
}

buildPlot();

// Dynamically add the current date to the report header
var monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var today = new Date();
var date = `${monthNames[today.getMonth()]} ${today.getFullYear().toString()}`;

Plotly.d3.select("#report-date").text(date);
