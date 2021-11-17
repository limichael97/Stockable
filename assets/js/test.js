// global variables
//var companyInput = document.getElementsByName("company").value
var companyInput = "AMRN"
var bioCompanyName = document.getElementById("bio-company-name")
var bioCompanyAd1 = document.getElementsByName("bio-company-address1")
var bioCompanyAd2 = document.getElementsByName("bio-company-address2")
var bioCompanyAd3 = document.getElementsByName("bio-company-cistzi")
var bioCompanyAd4 = document.getElementsByName("bio-company-country")


// get API function
// pass parameter of what was entered into input field

var getAPI = function() {

    //add URL to a var
    var requestURL = "https://yh-finance.p.rapidapi.com/auto-complete?q=tesla&region=US"

    fetch(requestURL, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "yh-finance.p.rapidapi.com",
            "x-rapidapi-key": "da885deccbmshf43da30fdf00ccfp12ed41jsna44199cba64d"
        }
    })
    .then(function(response) {
        response.json().then(function(requestURL) {
            console.log(requestURL)
        })
    })
    .catch(err => {
        console.error(err);
    });

}






/*var getProfileInfo = function(companyInput) {

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
}*/

// append data & add text content
/*var appendProfileInfo = function(profileData) {
    bioCompanyName.textContent = profileData.assetProfile.address1
}*/

//getProfileInfo(companyInput);

getAPI();