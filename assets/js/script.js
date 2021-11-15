var stockheader = document.getElementsByClassName("stock-header-container");
var companyName = document.getElementById("companyName");
var stock = document.getElementById("company");
var tabData = document.getElementsByClassName("tab-data");
var searchBtn = document.getElementsByClassName("is-info");
var currentPrice = document.getElementById("current-price");
var percentChange = document.getElementById("percent-change");
var postMarketPrice = document.getElementById("post-market-price");
var postMarketChange = document.getElementById("post-market-change");

var previousClose = document.getElementById("previous-close");
var openPrice = document.getElementById("open");
var bid = document.getElementById("bid");
var ask = document.getElementById("ask");
var daysRange = document.getElementById("days-range");
var fiftytwoWeekHigh = document.getElementById("52-week-high");
var volumePrice = document.getElementById("volume");
var avgVolume = document.getElementById("average-volume");

var marketCap = document.getElementById("market-cap");
var beta = document.getElementById("beta");
var peRatio = document.getElementById("pe-ratio");
var eps = document.getElementById("eps");
var earningsDate = document.getElementById("earnings-date");
var forwardDividends = document.getElementById("forward-dividends");
var exDividend = document.getElementById("ex-dividend");
var oneYearTarget = document.getElementById("1y-target");

//API Call to Yahoo Financa
var getStock = function () {
  fetch(
    "https://yh-finance.p.rapidapi.com/stock/v2/get-summary?symbol=AMD&region=US",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "yh-finance.p.rapidapi.com",
        "x-rapidapi-key": "da885deccbmshf43da30fdf00ccfp12ed41jsna44199cba64d",
      },
    }
  )
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert("Error");
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

// Call Get stock function
getStock();

//function to display data on stockheader
var appendStockHeader = function (data) {
  //Append <h3> with company name
  companyName.textContent = data.price.circulatingSupply.longName;

  //Create <div> for at close column

  //Append <span> for Current Price
  currentPrice.textContent = data.financialData.currentPrice.fmt;

  //Append <span> percent change - price at close
  percentChange.textContent = data.price.regularMarketChange.fmt;

  //Append <span> at close text with date

  //Create <div> for at After Hours Colomn

  //Append <span> for Price at after hours
  postMarketPrice.textContent = data.price.postMarketPrice.fmt;

  //Append <span> percent change - after hours
  postMarketChange.textContent = data.price.postMarketChange.fmt;

  //Append <span> after hours text with date

  //function to display data on tabData <div>
  //Create <span> for colomn 1
  //Create <ul> for col left
  //Create <li> : Previous Close
  previousClose.textContent = data.summaryDetail.previousClose.fmt;

  //Create <li> : Open
  openPrice.textContent = data.summaryDetail.open.fmt;

  //Create <li> : Bid
  bid.textContent = data.summaryDetail.bid.fmt;

  //Create <li> : Ask
  ask.textContent = data.summaryDetail.ask.fmt;

  //Create <li> : Day's Range

  //Create <li> : 52-week high
  fiftytwoWeekHigh.textContent = data.summaryDetail.fiftytwoWeekHigh.fmt;

  //Create <li> : Volume
  volumePrice.textContent = data.summaryDetail.volume.fmt;

  //Create <li> :  Average Volume
  avgVolume.textContent = data.summaryDetail.averageVolume.fmt;

  //Create <span> for colomn 2
  //Create <ul> for col right
  //Create <li> : Market Cap
  marketCap.textContent = data.summaryDetail.marketCap.fmt;

  //Create <li> : Beta (5 year Monthly)
  beta.textContent = data.summaryDetail.beta.fmt;

  //Create <li> : PE Ration (TTM)
  peRatio.textContent = data.summaryDetail.trailingPE.fmt;

  //Create <li> : EPS (TTM)

  //Create <li> : Earnings Date

  //Create <li> : Forward Dividend & Yield

  //Create <li> : Ex-Dividend Date
  //Create <li> : 1y Target Est
};

//function to save to local storage
var searchSave = function () {
  localStorage.setItem("Company-Name", stock);
  console.log("click");
};

// event listener for search button
$(".is-info").on("click", function () {
  event.preventDefault();
  stock = $("#company").val().trim();
  searchSave(stock);

  appendStockHeader(stock);
});
