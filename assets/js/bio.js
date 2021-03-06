// global variables
// grab symbol from local storage
var companyInput = document.getElementById("company");
var searchButton = document.getElementById("search-button");
var tabDataContainer = document.getElementById("tab-data");
var bioCompanyName = document.getElementById("bio-company-name");
var bioCompanyAd1 = document.getElementById("bio-company-address1");
var bioCompanyAd2 = document.getElementById("bio-company-address2");
var bioCompanyAd3 = document.getElementById("bio-company-cistzi");
var bioCompanyAd4 = document.getElementById("bio-company-country");
var bioCompanyAd5 = document.getElementById("bio-company-phone");
var bioCompanyAd6 = document.getElementById("bio-company-website");
var addressSectionBorder = document.getElementById("address-section");
var bioDescriptionHeader = document.getElementById("bio-description-header");
var bioDescription = document.getElementById("bio-description");
var bioDescriptionContainer = document.getElementById("bio-description-container");
var bioIndustry = document.getElementById("bio-industry");
var bioEmployees = document.getElementById("bio-employees");
var bioSector = document.getElementById("bio-sector");
var bioQuarterlyHeader = document.getElementById("bio-quarterly-header");
var bioQuarterlyTable = document.getElementById("bio-quarterly-table");
var bioQuarterlyDateHeader = document.getElementById("bio-quarterly-date-header");
var bioQuarterlyTitleHeader = document.getElementById("bio-quarterly-title-header");
var bioQuarterlyTypeHeader = document.getElementById("bio-quarterly-type-header");
var bioQuarterlyWebsiteHeader = document.getElementById("bio-quarterly-website-header");
var bioQuarterlyContainer = document.getElementById("bio-quarterly-container");
var bioEmployeeHeader = document.getElementById("bio-employee-header");
var bioEmployeeTable = document.getElementById("bio-employee-table");
var bioEmployeeNameHeader = document.getElementById("bio-employee-name-header");
var bioEmployeeAgeHeader = document.getElementById("bio-employee-age-header");
var bioEmployeeTitleHeader = document.getElementById("bio-employee-title-header");
var bioEmployeePayHeader = document.getElementById("bio-employee-pay-header");


// get ticket symbol from local storage
var getFromLocal = function () {
  var companyName = localStorage.getItem("Company-Name");

  companyInput.value = companyName;

  appendStockHeader(companyInput);
  getProfileInfo(companyInput);
};


// get API function for stock-header-container
var appendStockHeader = function (companyInput) {
  queryUrl =
    "https://yh-finance.p.rapidapi.com/stock/v2/get-summary?symbol=" +
    companyInput.value +
    "&region=US";

  $.ajax({
    url: queryUrl,
    method: "GET",
    headers: {
      "x-rapidapi-host": "yh-finance.p.rapidapi.com",
      "x-rapidapi-key": "5fc965876amsh06320411b49674ep1a1b93jsnd274b891d2c5",
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
    currentPrice.textContent = "Current Price: ";
    currentPriceText.textContent = response.financialData.currentPrice.fmt;

    //Append <span> percent change - Price at close
    percentChange.textContent =
      "(" + response.price.regularMarketChange.fmt + ")";

    //Append <span> at close text with date
    atClose.textContent = "[Close: 4:00PM EST]";

    //<div> for at After Hours Colomn
    //Append <span> for Price at after hours
    postMarketPrice.textContent = "Post Market Price: ";
    postMarketPriceText.textContent = response.price.postMarketPrice.fmt;

    //Append <span> percent change - after hours
    postMarketChange.textContent =
      "(" + response.price.postMarketChange.fmt + ")";

    //Append <span> after hours text with date
    afterHours.textContent = "[After hours]";
  });
};

// get API function
// pass parameter of what was entered into input field
var getProfileInfo = function (companyInput) {
  console.log(companyInput.value);

  var profileData =
    "https://yh-finance.p.rapidapi.com/stock/v2/get-profile?symbol=" +
    companyInput.value +
    "&region=US";
  //var profileData = "https://yh-finance.p.rapidapi.com/stock/v2/get-profile?symbol=TSLA&region=US";

  fetch(profileData, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "yh-finance.p.rapidapi.com",
      "x-rapidapi-key": "5fc965876amsh06320411b49674ep1a1b93jsnd274b891d2c5",
    },
  })

  .then(function (response) {
    response.json().then(function (profileData) {
      console.log(profileData);
      console.log(profileData.assetProfile.address1);
      appendProfileInfo(profileData);
    });
  })

    // error handling
    .catch(function (error) {
      console.log("ok");
    });
};

// append data & add text content
var appendProfileInfo = function (profileData) {
  // name and address section
  bioCompanyName.textContent =
    profileData.price.shortName + " (" + profileData.price.symbol + ")";
  bioCompanyAd1.textContent = profileData.assetProfile.address1;
  // my attempt to insert a blank line so that industry will stay aligned
  // didn't work
  if ("addrress2" in profileData.assetProfile) {
    bioCompanyAd2.textContent = profileData.assetProfile.address2;
  } else {
    bioSector.classList.add("bio-sector-no-address2");
  }
  bioCompanyAd3.textContent =
    profileData.assetProfile.city +
    " " +
    profileData.assetProfile.state +
    ", " +
    profileData.assetProfile.zip;
  bioCompanyAd4.textContent = profileData.assetProfile.country;
  bioCompanyAd5.textContent = profileData.assetProfile.phone;
  bioCompanyAd6.textContent = profileData.assetProfile.website;
  bioCompanyAd6.setAttribute("href", profileData.assetProfile.website);
  bioCompanyAd6.setAttribute("target", "_blank");

  // industry section
  bioSector.textContent = "Sector: " + profileData.assetProfile.sector;
  bioIndustry.textContent = "Industry: " + profileData.assetProfile.industry;
  bioEmployees.textContent =
    "Total Full-Time Employees: " + profileData.assetProfile.fullTimeEmployees;

  addressSectionBorder.classList.add("address-section");

  // description section
  bioDescriptionHeader.textContent = "Description";
  bioDescription.textContent = profileData.assetProfile.longBusinessSummary;
  bioDescriptionContainer.classList.add("bio-description-container");

  // call the function
  getQuarterlyReports(profileData);
  getCompanyOfficers(profileData);

  // top employee section
};

var getQuarterlyReports = function (profileData) {
  bioQuarterlyContainer.classList.add("bio-quarterly-container");
  bioQuarterlyHeader.textContent = "Quarterly Reports";
  bioQuarterlyDateHeader.textContent = "Date";
  bioQuarterlyTitleHeader.textContent = "Title";
  bioQuarterlyTypeHeader.textContent = "Type";
  bioQuarterlyWebsiteHeader.textContent = "Website";
  // add logic, if you cannot find filings in secFilings, N/A
  // plug in NIO to check this

  for (i = 0; i < profileData.secFilings.filings.length; i++) {
    if (profileData.secFilings.filings[i].title === "Quarterly Report") {
      var bioQuarterlyTr = document.createElement("tr");
      var bioQuarterlyDateData0 = document.createElement("td");
      var bioQuarterlyTitleData0 = document.createElement("td");
      var bioQuarterlyTypeData0 = document.createElement("td");
      var bioQuarterlyWebsiteData0 = document.createElement("td");
      var bioQuarterlyWebsiteDataLink0 = document.createElement("a");

      bioQuarterlyDateData0.textContent =
        profileData.secFilings.filings[i].date;
      bioQuarterlyTitleData0.textContent =
        profileData.secFilings.filings[i].title;
      bioQuarterlyTypeData0.textContent =
        profileData.secFilings.filings[i].type;
      bioQuarterlyWebsiteDataLink0.textContent =
        profileData.secFilings.filings[i].edgarUrl;
      bioQuarterlyWebsiteDataLink0.setAttribute("href",profileData.secFilings.filings[i].edgarUrl);
      bioQuarterlyWebsiteDataLink0.setAttribute("target", "_blank");

      // a is appended to td
      bioQuarterlyWebsiteData0.appendChild(bioQuarterlyWebsiteDataLink0);

      // td is appended to tr
      bioQuarterlyTr.appendChild(bioQuarterlyDateData0);
      bioQuarterlyTr.appendChild(bioQuarterlyTitleData0);
      bioQuarterlyTr.appendChild(bioQuarterlyTypeData0);
      bioQuarterlyTr.appendChild(bioQuarterlyWebsiteData0);

      // tr is appended to table
      bioQuarterlyTable.appendChild(bioQuarterlyTr);
    }
  }
};

var getCompanyOfficers = function (profileData) {
  bioEmployeeHeader.textContent = "Company Officers";
  bioEmployeeNameHeader.textContent = "Name";
  bioEmployeeAgeHeader.textContent = "Age";
  bioEmployeeTitleHeader.textContent = "Title";
  bioEmployeePayHeader.textContent = "Pay";

  for (i = 0; i < profileData.assetProfile.companyOfficers.length; i++) {
    var bioEmployeeTr = document.createElement("tr");
    var bioEmployeeNameData0 = document.createElement("td");
    var bioEmployeeAgeData0 = document.createElement("td");
    var bioEmployeeTitleData0 = document.createElement("td");
    var bioEmployeePayData0 = document.createElement("td");
    bioEmployeeNameData0.textContent =
      profileData.assetProfile.companyOfficers[i].name;
    if (typeof profileData.assetProfile.companyOfficers[i].age == "number") {
      bioEmployeeAgeData0.textContent =
        profileData.assetProfile.companyOfficers[i].age;
    } else {
      bioEmployeeAgeData0.textContent = "N/A";
    }
    bioEmployeeTitleData0.textContent =
      profileData.assetProfile.companyOfficers[i].title;
    if ("totalPay" in profileData.assetProfile.companyOfficers[i]) {
      bioEmployeePayData0.textContent =
        "$" + profileData.assetProfile.companyOfficers[i].totalPay.longFmt;
    } else {
      bioEmployeePayData0.textContent = "N/A";
    }

    bioEmployeeTr.appendChild(bioEmployeeNameData0);
    bioEmployeeTr.appendChild(bioEmployeeAgeData0);
    bioEmployeeTr.appendChild(bioEmployeeTitleData0);
    bioEmployeeTr.appendChild(bioEmployeePayData0);
    // tr is appended to table
    bioEmployeeTable.appendChild(bioEmployeeTr);
  }
};

getFromLocal();

