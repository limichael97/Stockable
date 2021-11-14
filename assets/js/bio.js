// global variables
//var companyInput = document.getElementsByName("company").value
var companyInput = "AMRN"
var tabDataContainer = document.getElementById("tab-data")
var bioCompanyName = document.getElementById("bio-company-name")
var bioCompanyAd1 = document.getElementById("bio-company-address1")
var bioCompanyAd2 = document.getElementById("bio-company-address2")
var bioCompanyAd3 = document.getElementById("bio-company-cistzi")
var bioCompanyAd4 = document.getElementById("bio-company-country")
var bioCompanyAd5 = document.getElementById("bio-company-phone")
var bioCompanyAd6 = document.getElementById("bio-company-website")
var bioDescription = document.getElementById("bio-description")
var bioIndustry = document.getElementById("bio-industry")
var bioEmployees = document.getElementById("bio-employees")
var bioSector = document.getElementById("bio-sector")
var bioQuarterlyDateData0 = document.getElementById("bio-quarterly-date-data-0")
var bioQuarterlyTitleData0 = document.getElementById("bio-quarterly-title-data-0")
var bioQuarterlyTypeData0 = document.getElementById("bio-quarterly-type-data-0")
var bioQuarterlyWebsiteData0 = document.getElementById("bio-quarterly-website-data-0")
var bioQuarterlyWebsiteDataLink0 = document.getElementById("bio-quarterly-website-data-link-0")
var bioEmployeeTableBody = document.getElementById("bio-employee-table-body")
var bioEmployeeRowBody = document.getElementById("bio-employee-row-body")





// get API function
// pass parameter of what was entered into input field
var getProfileInfo = function(companyInput) {

    console.log(companyInput);

    var profileData = "https://yh-finance.p.rapidapi.com/stock/v2/get-profile?symbol=AMRN&region=US";

    fetch(profileData, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "yh-finance.p.rapidapi.com",
            "x-rapidapi-key": "da885deccbmshf43da30fdf00ccfp12ed41jsna44199cba64d"
        }
    })
    .then(function(response) {
        response.json().then(function(profileData) {
            console.log(profileData)
            console.log(profileData.assetProfile.address1)
            appendProfileInfo(profileData);
        })
        
    })
    .catch(err => { 
        console.error(err);
    });
}

// append data & add text content
var appendProfileInfo = function(profileData) {
    // name and address section
    bioCompanyName.textContent = profileData.price.shortName + " (" + profileData.price.symbol + ")"
    bioCompanyAd1.textContent = profileData.assetProfile.address1
    bioCompanyAd2.textContent = profileData.assetProfile.address2
    bioCompanyAd3.textContent = profileData.assetProfile.city //NEED TO ADD STATE & ZIP//
    bioCompanyAd4.textContent = profileData.assetProfile.country
    bioCompanyAd5.textContent = profileData.assetProfile.phone
    bioCompanyAd6.textContent = profileData.assetProfile.website
    bioCompanyAd6.setAttribute("href", profileData.assetProfile.website)
    bioCompanyAd6.setAttribute("target", "_blank")

    // industry section
    bioSector.textContent = "Sector: " + profileData.assetProfile.sector
    bioIndustry.textContent = "Industry: " + profileData.assetProfile.industry
    bioEmployees.textContent = "Total Full-Time Employees: " + profileData.assetProfile.fullTimeEmployees

    // description section
    bioDescription.textContent = profileData.assetProfile.longBusinessSummary

    // quarterly reports section
    /*bioQuarterlyDateData0.textContent = profileData.secFilings.filings[0].date
    bioQuarterlyTitleData0.textContent = profileData.secFilings.filings[0].title
    bioQuarterlyTypeData0.textContent = profileData.secFilings.filings[0].type
    bioQuarterlyWebsiteDataLink0.textContent = profileData.secFilings.filings[0].edgarUrl
    bioQuarterlyWebsiteDataLink0.setAttribute("href", profileData.secFilings.filings[0].edgarUrl)
    bioQuarterlyWebsiteDataLink0.setAttribute("target", "_blank")*/

    // call the function
    getQuarterlyReports(profileData)
    getCompanyOfficers(profileData)

    // top employee section

    
}

var getQuarterlyReports = function(profileData) {
    for (i=0; i < profileData.secFilings.filings.length; i++) {
        if (profileData.secFilings.filings[i].title === "Quarterly Report") {
            bioQuarterlyDateData0.textContent = profileData.secFilings.filings[i].date
            bioQuarterlyTitleData0.textContent = profileData.secFilings.filings[i].title
            bioQuarterlyTypeData0.textContent = profileData.secFilings.filings[i].type
            bioQuarterlyWebsiteDataLink0.textContent = profileData.secFilings.filings[i].edgarUrl
            bioQuarterlyWebsiteDataLink0.setAttribute("href", profileData.secFilings.filings[i].edgarUrl)
            bioQuarterlyWebsiteDataLink0.setAttribute("target", "_blank")
        } else break;
    }
}

/*var getCompanyOfficers = function(profileData) {
    for (i=0; i < profileData.assetProfile.companyOfficers.length; i++) {
        var bioEmployeeNameData0 = document.createElement("td")
        var bioEmployeeAgeData0 = document.createElement("td")
        var bioEmployeeTitleData0 = document.createElement("td")
        bioEmployeeNameData0.textContent = profileData.assetProfile.companyOfficers[i].name
        bioEmployeeAgeData0.textContent = profileData.assetProfile.companyOfficers[i].age
        bioEmployeeTitleData0.textContent = profileData.assetProfile.companyOfficers[i].title
        bioEmployeeDataContainer0.appendChild(bioEmployeeNameData0)
        bioEmployeeDataContainer0.appendChild(bioEmployeeAgeData0)
        bioEmployeeDataContainer0.appendChild(bioEmployeeTitleData0)
    }
}*/

var getCompanyOfficers = function(profileData) {
    var bioEmployeeNameData0 = document.createElement("td")
    bioEmployeeNameData0.textContent = profileData.assetProfile.companyOfficers[0].name
    bioEmployeeRowBody.appendChild(bioEmployeeNameData0)

    var bioEmployeeAgeData0 = document.createElement("td")
    bioEmployeeAgeData0.textContent = profileData.assetProfile.companyOfficers[0].age
    bioEmployeeRowBody.appendChild(bioEmployeeAgeData0)

    var bioEmployeeTitleData0 = document.createElement("td")
    bioEmployeeTitleData0.textContent = profileData.assetProfile.companyOfficers[0].title
    bioEmployeeRowBody.appendChild(bioEmployeeTitleData0)

    var bioEmployeePayData0 = document.createElement("td")
    bioEmployeePayData0.textContent = "$" + profileData.assetProfile.companyOfficers[0].totalPay.longFmt
    bioEmployeeRowBody.appendChild(bioEmployeePayData0)
}

getProfileInfo(companyInput)