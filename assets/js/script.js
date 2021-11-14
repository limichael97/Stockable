var stockheader = document.getElementsByClassName("stock-header-container");
var companyName = document.getElementById("companyName");
var stock = document.getElementById("company");
var tabData = document.getElementsByClassName("tab-data");
var searchBtn = document.getElementsByClassName("is-info");

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
var appendStockHeader = function () {
  //Append <h3> with company name
  //Append <p> with Current Price
  //Create <div> for at close column
  //Append <span> for Price at close
  //Append <span> percent change - price at close
  //Append <span> at close text with date
  //Create <div> for at After Hours Colomn
  //Append <span> for Price at after hours
  //Append <span> percent change - after hours
  //Append <span> after hours text with date
  //function to display data on tabData <div>
  //Create <span> for colomn 1
  //Create <ul> for col left
  //Create <li> : Previous Close
  //Create <li> : Open
  //Create <li> : Bid
  //Create <li> : Ask
  //Create <li> : Day's Range
  //Create <li> : 52-week high
  //Create <li> : Volume
  //Create <li> :  Average Volume
  //Create <span> for colomn 2
  //Create <ul> for col right
  //Create <li> : Market Cap
  //Create <li> : Beta (5 year Monthly)
  //Create <li> : PE Ration (TTM)
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
  stock = $("#company").val().trim();
  console.log(stock);
  searchSave(stock);
  appendStockHeader(stock);
  event.preventDefault();
});
