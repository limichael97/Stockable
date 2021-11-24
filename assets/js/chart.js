var companyInput = document.getElementById("company");
var baseURL =
  "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v8/finance/spark?symbols=";
var monthlyBtnEl = document.getElementById("btn-monthly");
var weeklyBtnEl = document.getElementById("btn-weekly");
var dailyBtnEl = document.getElementById("btn-daily");
var monthlyPrices = [];
var months = [];
let myWeeklyChart = document
  .getElementById("stock-chart-weekly")
  .getContext("2d");
let myDailyChart = document
  .getElementById("stock-chart-daily")
  .getContext("2d");
let myMonthlyChart = document
  .getElementById("stock-chart-monthly")
  .getContext("2d");
let myHourlyChart = document
  .getElementById("stock-chart-hourly")
  .getContext("2d");
let myMinsChart = document.getElementById("stock-chart-min").getContext("2d");
//Tempotrarily hardcoded ticker
var companyName = "TSLA";

//company name form Local storage

var getTickerFromLocalStorage = function () {
  //var companyName = localStorage.getItem("Company-Name")
  console.log(companyName);
  //var companyName  = TSLA;
};

async function getMonthlyData() {
  fetch(
    "https://yh-finance.p.rapidapi.com/market/get-spark?symbols=TSLA&interval=1m&range=1Y",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "yh-finance.p.rapidapi.com",
        "x-rapidapi-key": "6b3ff5ef15msh7a6db3a3fcd5adbp159940jsn4e31dec2a526",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      for (i = 0; i < response.TSLA.close.length; i++) {
        //months = i;
        months.push(i.toString());
        // console.log(months);
      }
      for (i = 0; i < response.TSLA.close.length; i++) {
        //monthlyPrices = response.companyName.close[i];
        monthlyPrices.push(response.TSLA.close[i].toString());
        //console.log(monthlyPrices);
      }
      console.log(monthlyPrices);
      console.log(months);
    })
    .catch((err) => {
      console.error(err);
    });
}

async function drawMonthlyChart() {
  //This function will be called once the ticker is passed an appropriate data is generated.
  //await getMonthlyData();
  //Destroying the canvas and making a new one
  myMonthlyChart = new Chart(myMonthlyChart, {
    type: "line",
    data: {
      //This will be replaced by date array
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Stock Price Monthly Trend ",
          data: 
            [1149, 1139, 1047, 1102, 555, 678, 745, 1173, 1149, 1228, 1228, 1031,
            1002, 1054, 987, 760, 985, 400, 468, 520, 540, 587, 610, 456, 687,
            445, 672, 920, 521, 498, 620, 420, 852,
          ],
          backgroundColor: ["rgba(75, 192, 192, 0.2)"],
          borderColor: ["rgba(75, 192, 192, 1)"],
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

//Creating a chart for Monthly Trend
monthlyBtnEl.addEventListener("click", function () {
  getMonthlyData();
});

// //Getting weekly data
async function getWeeklyData() {
  const settings = {
    async: true,
    crossDomain: true,
    url: baseURL + "TSLA&range=1y&interval=1wk",
    method: "GET",
    headers: {
      "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
      "x-rapidapi-key": "6b3ff5ef15msh7a6db3a3fcd5adbp159940jsn4e31dec2a526",
    },
  };
  $.ajax(settings).done(function (response) {
    console.log(response);

    for (i = 0; i < response.TSLA.close.length; i++) {
      months = i;
      console.log(months);
    }
    for (i = 0; i < response.TSLA.close.length; i++) {
      monthlyPrices = response.TSLA.close[i];
      monthlyPrices.toString().split(",");
      console.log(monthlyPrices);
    }
  });
}
//Creating chart weekly trends
weeklyBtnEl.addEventListener("click", function () {
  getMonthlyData();
  // drawWeeklyChart();//
});

async function drawWeeklyChart() {
  //This function will be called once the ticker is passed an appropriate data is generated.
  //await getWeeklyData();
  myWeeklyChart = new Chart(myWeeklyChart, {
    type: "line",
    data: {
      labels: [
        "week 01",
        "Week 02",
        "Week 03",
        "Week 04",
        "Week 05",
        "Week 06",
        "Week 07",
        "Week 08",
        "Week 09",
        "Week 10",
        "Week 11",
        "Week 12",
        "Week 13",
        "Week 14",
        "Week 15",
        "Week 16",
        "Week 17",
        "Week 18",
        "Week 19",
        "Week 20",
        "Week 21",
        "Week 22",
        "Week 23",
        "Week 24",
        "Week 25",
        "Week 26",
        "Week 27",
        "Week 28",
        "Week 29",
        "Week 30",
        "Week 31",
        "Week 32",
        "Week 33",
      ],
      datasets: [
        {
          label: "Stock Price Weekly Trend",
          data: [
            1149, 1139, 1047, 1102, 555, 678, 745, 1173, 1149, 1228, 1228, 1031,
            1002, 1054, 987, 760, 985, 400, 468, 520, 540, 587, 610, 456, 687,
            445, 672, 920, 521, 498, 620, 420, 852,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

///Draw daily data
async function getDailyData() {
  const settings = {
    async: true,
    crossDomain: true,
    url: baseURL + "TSLA&range=1y&interval=1d",
    method: "GET",
    headers: {
      "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
      "x-rapidapi-key": "5fc965876amsh06320411b49674ep1a1b93jsnd274b891d2c5",
    },
  };
  $.ajax(settings).done(function (response) {
    console.log(response);

    for (i = 0; i < response.TSLA.close.length; i++) {
      months = i;
      //console.log(months);
    }
    for (i = 0; i < response.TSLA.close.length; i++) {
      monthlyPrices = response.TSLA.close[i];
      // console.log(monthlyPrices);
    }
  });
}

//  //Daily trend
dailyBtnEl.addEventListener("click", function () {
  drawDailyChart();
});

// //Creating charts Daily trend
async function drawDailyChart() {
  //This function will be called once the ticker is passed an appropriate data is generated.
  // await getDailyData();
  //Destroying the canvas and making a new one
  myDailyChart = new Chart(myDailyChart, {
    type: "line",
    data: {
      labels: [
        "January 01",
        "February 02",
        "March 03",
        "April 04",
        "May 05",
        "June 06",
        "July 07",
        "August 07",
        "September 09",
        "October 10",
        "November 11",
        "December 12",
      ],
      datasets: [
        {
          label: "Stock Price Daily Trend",
          data: [
            1003, 1017, 1047, 1102, 1173, 1149, 1228, 1228, 1031, 1002, 1054,
            987,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
// //Creating charts Daily trend
async function drawHourlyChart() {
  //This function will be called once the ticker is passed an appropriate data is generated.
  // await getHourlyData();
  //Destroying the canvas and making a new one

  myHourlyChart = new Chart(myHourlyChart, {
    type: "bar",
    data: {
      labels: [
        "January 01",
        "February 02",
        "March 03",
        "April 04",
        "May 05",
        "June 06",
        "July 07",
        "August 07",
        "September 09",
        "October 10",
        "November 11",
        "December 12",
      ],
      datasets: [
        {
          label: "Stock Price Hourly Trend",
          data: [
            1003, 1017, 1047, 1102, 1173, 1149, 1228, 1228, 1031, 1002, 1054,
            987,
          ],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
// //Creating charts 15 mins  trend
async function drawMinsChart() {
  //This function will be called once the ticker is passed an appropriate data is generated.
  // await getData();
  //Destroying the canvas and making a new one
  myMinsChart = new Chart(myMinsChart, {
    type: "line",
    data: {
      labels: [
        "January 01",
        "February 02",
        "March 03",
        "April 04",
        "May 05",
        "June 06",
        "July 07",
        "August 07",
        "September 09",
        "October 10",
        "November 11",
        "December 12",
      ],
      datasets: [
        {
          label: "Stock Price 15 mins Trend",
          data: [
            1003, 1017, 1047, 1102, 1173, 1149, 1228, 1228, 1031, 1002, 1054,
            987,
          ],
          backgroundColor: "rgba(255, 159, 64, 1)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

drawMonthlyChart();
drawWeeklyChart();
drawDailyChart();
drawHourlyChart();
drawMinsChart();
