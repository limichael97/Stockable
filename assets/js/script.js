var stockheader = document.getElementsByClassName("stock-header-container");
var companyName = document.getElementById("companyName");
var stock = document.getElementById("company");
var tabData = document.getElementsByClassName("tab-data");
var searchBtn = document.getElementsByClassName("is-info");
var currentPrice = document.getElementById("current-price");
var percentChange = document.getElementById("percent-change");
var postMarketPrice = document.getElementById("post-market-price");
var postMarketChange = document.getElementById("post-market-change");
var atClose = document.getElementById("at-close");
var afterHours = document.getElementById("after-hours");
var subtitle = document.getElementById("subtitle");

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
var forwardDividend = document.getElementById("forward-dividend");
var exDividend = document.getElementById("ex-dividend");
var oneYearTarget = document.getElementById("1y-target");

//function to display data on stockheader
var appendStockHeader = function (data) {
  queryUrl =
    "https://yh-finance.p.rapidapi.com/stock/v2/get-summary?symbol=" +
    stock +
    "&region=US";

  $.ajax({
    url: queryUrl,
    method: "GET",
    headers: {
      "x-rapidapi-host": "yh-finance.p.rapidapi.com",
      "x-rapidapi-key": "2ce7468985msh2300cf13fac2d74p1ebd78jsn379acef727cd",
    },
  }).then(function (response) {
    console.log(response);

    //Append <h3> with company name
    companyName.textContent = response.price.longName;

    //Append <span> for subtitle
    subtitle.textContent =
      "NasdaqGS - NasdaqGS Real Time Price. Currency in USD";

    //<div> for at close column
    //Append <span> for Current Price
    currentPrice.textContent =
      "Current Price: " + response.financialData.currentPrice.fmt;

    //Append <span> percent change - Price at close
    percentChange.textContent =
      "(" + response.price.regularMarketChange.fmt + ")";

    //Append <span> at close text with date
    atClose.textContent = "At close: 4:00PM EST";

    //<div> for at After Hours Colomn
    //Append <span> for Price at after hours
    postMarketPrice.textContent =
      "Post Market Price: " + response.price.postMarketPrice.fmt;

    //Append <span> percent change - after hours
    postMarketChange.textContent =
      "(" + response.price.postMarketChange.fmt + ")";

    //Append <span> after hours text with date
    afterHours.textContent = "After hours";

    //function to display data on tabData <div>
    //<span> for colomn 1
    //<ul> for col left
    //Create <li> : Previous Close
    previousClose.textContent =
      "Previous Close: " + response.summaryDetail.previousClose.fmt;

    //Create <li> : Open
    openPrice.textContent = "Open: " + response.summaryDetail.open.fmt;

    //Create <li> : Bid
    bid.textContent = "Bid: " + response.summaryDetail.bid.fmt;

    //Create <li> : Ask
    ask.textContent = "Ask: " + response.summaryDetail.ask.fmt;

    //Create <li> : Day's Range
    daysRange.textContent =
      "Day's Range: " +
      response.summaryDetail.dayHigh.fmt +
      " - " +
      response.summaryDetail.dayLow.fmt;

    //Create <li> : 52-week high
    fiftytwoWeekHigh.textContent =
      "52-Week High: " + response.summaryDetail.fiftyTwoWeekHigh.fmt;

    //Create <li> : Volume
    volumePrice.textContent =
      "Volume Price: " + response.summaryDetail.volume.fmt;

    //Create <li> :  Average Volume
    avgVolume.textContent =
      "Average Volume: " + response.summaryDetail.averageVolume.fmt;

    //<span> for colomn 2
    //<ul> for col right
    //Create <li> : Market Cap
    marketCap.textContent =
      "Market Cap: " + response.summaryDetail.marketCap.fmt;

    //Create <li> : Beta (5 year Monthly)
    beta.textContent =
      "Beta (5 year Monthly): " + response.summaryDetail.beta.fmt;

    //Create <li> : PE Ration (TTM)
    peRatio.textContent =
      "PE Ration (TTM): " + response.summaryDetail.trailingPE.fmt;

    //Create <li> : EPS (TTM)
    eps.textContent = "EPS (TTM): ";

    //Create <li> : Earnings Date
    earningsDate.textContent =
      "Earnings Date: " +
      response.calendarEvents.earnings.earningsDate[0].fmt +
      " to " +
      response.calendarEvents.earnings.earningsDate[1].fmt;

    //Create <li> : Forward Dividend & Yield
    forwardDividend.textContent =
      "Forward Dividend & Yield: " + response.summaryDetail.dividendYield;

    //Create <li> : Ex-Dividend Date
    exDividend.textContent =
      "Ex-Dividend Date: " + response.summaryDetail.exDividendDate.fmt;

    //Create <li> : 1y Target Est
    oneYearTarget.textContent =
      "1y Target Est: " + response.financialData.targetMeanPrice.fmt;
  });
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
