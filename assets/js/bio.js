// global variables
//var companyInput = document.getElementsByName("company").value
var companyInput = "AMRN"


// pass parameter of what was entered into input field
var getProfileInfo = function(companyInput) {

    console.log(companyInput);

    fetch("https://yh-finance.p.rapidapi.com/stock/v2/get-profile?symbol=AMRN&region=US", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "yh-finance.p.rapidapi.com",
            "x-rapidapi-key": "da885deccbmshf43da30fdf00ccfp12ed41jsna44199cba64d"
        }
    })
    .then(response => {
        response.json().then(function(profileData) {
            console.log(profileData)
            console.log(profileData.assetProfile.address1)
        })
    })
    .catch(err => {
        console.error(err);
    });

}

getProfileInfo(companyInput);


