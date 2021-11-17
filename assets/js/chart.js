

var baseURL ="https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v8/finance/spark?symbols=";
var tickerSymbol = "AMZN";
var monthlyBtnEl = document.getElementById("btn-monthly");
var weeklyBtnEl = document.getElementById("btn-weekly");
var dailyBtnEl = document.getElementById("btn-daily");
var monthlyPrices = [];
var months = [];



async function getMonthlyData(){
    const settings = {
      async: true,
      crossDomain: true,
      url: baseURL+"TSLA&range=1y&interval=1mo",
      method: "GET",
      headers: {
        "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
        "x-rapidapi-key": "bcf226c698msh087777986892404p16f1dejsn892bbb810e0b",
      },
    };
    $.ajax(settings).done(function (response) {
      console.log(response);
    
      for (i = 0; i < response.TSLA.close.length; i++) {
          months=i;
        //console.log(months);
      }
      for (i = 0; i < response.TSLA.close.length; i++) {
        monthlyPrices = response.TSLA.close[i];
       // console.log(monthlyPrices);
    
      }
    });
}
  
async function drawMonthlyChart(){
//This function will be called once the ticker is passed an appropriate data is generated.
  // await getMonthlyData();
    const ctx = document.getElementById('stock-chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January 01', 'February 02', 'March 03', 'April 04', 
            'May 05', 'June 06','July 07', 
            'August 08','September 09','October 10','November 11','December 12'],
            datasets: [{
                label: 'Stock Price Monthly Trend ',
                data: [1003, 1017, 1102,
                 562, 617, 787,987,1228,1047,1031,1002,1054,],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

//Getting weekly data
async function getWeeklyData(){
    const settings = {
      async: true,
      crossDomain: true,
      url: baseURL+"TSLA&range=1y&interval=1wk",
      method: "GET",
      headers: {
        "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
        "x-rapidapi-key": "bcf226c698msh087777986892404p16f1dejsn892bbb810e0b",
      },
    };
    $.ajax(settings).done(function (response) {
      console.log(response);
    
      for (i = 0; i < response.TSLA.close.length; i++) {
          months=i;
        //console.log(months);
      }
      for (i = 0; i < response.TSLA.close.length; i++) {
        monthlyPrices = response.TSLA.close[i];
       // console.log(monthlyPrices);
    
      }
    });
}
  
async function drawWeeklyChart(){
//This function will be called once the ticker is passed an appropriate data is generated.
  // await getWeeklyData();
    const ctx = document.getElementById('stock-chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['week 01', 'Week 02', 'Week 03', 'Week 04','Week 05', 'Week 06','Week 07', 
            'Week 08','Week 09','Week 10','Week 11','Week 12','Week 13','Week 14','Week 15','Week 16',
            'Week 17','Week 18','Week 19','Week 20','Week 21','Week 22','Week 23','Week 24','Week 25',
            'Week 26','Week 27','Week 28','Week 29','Week 30','Week 31','Week 32','Week 33'],
            datasets: [{
                label: 'Stock Price Weekly Trend',
                data: [1149, 1139, 1047, 1102,555, 678,745,
                       1173, 1149, 1228,1228,1031,1002,1054,
                       987,760,985,400,468,520,540,587,610,
                       456,687,445,672,920,521,498,620,420,852],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

///Draw daily data
async function getDailyData(){
    const settings = {
      async: true,
      crossDomain: true,
      url: baseURL+"TSLA&range=1y&interval=1d",
      method: "GET",
      headers: {
        "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
        "x-rapidapi-key": "bcf226c698msh087777986892404p16f1dejsn892bbb810e0b",
      },
    };
    $.ajax(settings).done(function (response) {
      console.log(response);
    
      for (i = 0; i < response.TSLA.close.length; i++) {
          months=i;
        //console.log(months);
      }
      for (i = 0; i < response.TSLA.close.length; i++) {
        monthlyPrices = response.TSLA.close[i];
       // console.log(monthlyPrices);
    
      }
    });
}
  //Creating charts Daily trend
async function drawDailyChart(){
//This function will be called once the ticker is passed an appropriate data is generated.
   // await getDailyData();
    const ctx = document.getElementById('stock-chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January 01', 'February 02', 'March 03', 'April 04', 
            'May 05', 'June 06','July 07', 
            'August 07','September 09','October 10','November 11','December 12'],
            datasets: [{
                label: 'Stock Price Daily Trend',
                data: [1003, 1017, 1047, 1102,
                 1173, 1149, 1228,1228,1031,1002,1054,987],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
drawWeeklyChart();
//Creating a chart for Monthly Trend

monthlyBtnEl.addEventListener("click", function () {
  drawMonthlyChart();
});

//Creating chart weekly trends
weeklyBtnEl.addEventListener("click", function () {
  drawWeeklyChart();
});
//Daily trend
dailyBtnEl.addEventListener("click", function () {
  drawDailyChart();
});
