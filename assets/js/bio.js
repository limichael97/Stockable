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
var href = bioCompanyAd6.getAttribute("href")   
var bioDescription = document.getElementById("bio-description")
var bioIndustry = document.getElementById("bio-industry")
var bioEmployees = document.getElementById("bio-employees")


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
    bioCompanyName.textContent = profileData.price.shortName + " (" + profileData.price.symbol + ")"
    bioCompanyAd1.textContent = profileData.assetProfile.address1
    bioCompanyAd2.textContent = profileData.assetProfile.address2
    bioCompanyAd3.textContent = profileData.assetProfile.city //NEED TO ADD STATE & ZIP//
    bioCompanyAd4.textContent = profileData.assetProfile.country
    bioCompanyAd5.textContent = profileData.assetProfile.phone
    bioCompanyAd6.textContent = profileData.assetProfile.website
    bioCompanyAd6.setAttribute("href", profileData.assetProfile.website)
    bioCompanyAd6.setAttribute("target", "_blank")

    tabDataContainer.classList.add("tabDataContainer")  

    bioIndustry.textContent = "Industry: " + profileData.assetProfile.industry
    bioEmployees.textContent = "Total Full-Time Employees: " + profileData.assetProfile.fullTimeEmployees

    bioDescription.textContent = profileData.assetProfile.longBusinessSummary
    
}

getProfileInfo(companyInput);