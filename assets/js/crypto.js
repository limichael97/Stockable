var cryptoData = document.querySelector("#cryptoHere")
var addRank = document.querySelector("#rankData")
var addName = document.querySelector("#nameData")
var addPrice = document.querySelector("#priceData")
var addChange = document.querySelector("#changeData")
var addCap = document.querySelector("#capData")
var addVolume = document.querySelector("#volumeData")
var addSupply = document.querySelector("#supplyData")
var addMaxSupply = document.querySelector("#maxSupplyData")
var addImage = document.querySelector("#imageData")
var sortRank = document.getElementById("sortRank")
var sortName = document.getElementById("sortName")
var sortPrice = document.getElementById("sortPrice")
var sortChange = document.getElementById("sortChange")
var sortCap = document.getElementById("sortCap")
var sortVolume = document.getElementById("sortVolume")
var sortSupply = document.getElementById("sortSupply")
var tableData1 =document.getElementById("tableData")
var tableID = document.getElementById("tableHeader")
var array;
var toggleRank = 1; // flag to toggle the sorting order
var toggleName = 1; // flag to toggle the sorting order

// function to get API data from coingecko
var getCrypto = function() {
    var apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    console.log(apiUrl)
    
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data)
                console.log(data.length)

                // Start a loop for each data and pass specific data points that I want displayed 
                for (i =0; i< data.length; i++) {
                    displayCoin(data[i].name, data[i].symbol, data[i].market_cap_rank, data[i].current_price, data[i].price_change_percentage_24h, data[i].market_cap, data[i].max_supply, data[i].circulating_supply, data[i].total_volume, data[i].image) 

                }
                array = data
            });


            

        } else {
            alert("Error");
        }
    });
};

// this makes a number a string and adds commas. Cleaner looking numbers when displayed
function numToComma(num) {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// function takes in the data, creates a row of data and appeneds to page
var displayCoin = function(name, symbol, rank, price, change, cap, maxsupply, supply, volume, image) {
    var tr = document.createElement("tr")
    var table = document.getElementById("tableData")
    var cryptoName = document.createElement("td")
    var cryptoRank = document.createElement("td")
    var cryptoPrice = document.createElement("td")
    var cryptoChange = document.createElement("td")
    var cryptoCap = document.createElement("td")
    var cryptoVolume = document.createElement("td")
    var cryptoSupply = document.createElement("td")
    var span = document.createElement("span")
    var upperSymbol = symbol.toUpperCase()
    span.innerHTML = `<img class = "imageSize" src = ${image}> </img> ${name} (${upperSymbol})` 
    cryptoName.appendChild(span) 
    var decimalPrice = (Math.round(price * 100) / 100).toFixed(2) 
    var cryptoPriceUsd = numToComma(decimalPrice)
    var decimalChange = (Math.round(change * 100) / 100).toFixed(2) 
    var commaChange = numToComma(decimalChange)
    var decimalCap = (Math.round(cap))
    var commaCap = numToComma(decimalCap)
    var decimalSupply = (Math.round(supply))
    var commaSupply = numToComma(decimalSupply)
    var decimalVolume = (Math.round(volume))
    var commaVolume = numToComma(decimalVolume)

    // Adding classes to each column
    cryptoName.classList.add("my-3", "py-2", "has-text-centered")
    cryptoRank.classList.add("my-3", "py-2", "has-text-centered")
    cryptoPrice.classList.add("my-3", "py-2")
    cryptoChange.classList.add("my-3", "py-2")
    cryptoCap.classList.add("my-3", "py-2")
    cryptoVolume.classList.add("my-3", "py-2")
    cryptoSupply.classList.add("my-3", "py-2")
    tr.classList.add("borderLine")

    // adding color to the percentage depending if positive or negative
    if (commaChange >= 0 ) {
        cryptoChange.classList.add("positiveChange")
        cryptoChange.textContent= "+"
    } else if (commaChange < 0 ) {
        cryptoChange.classList.add("negativeChange")
    }
    
    cryptoRank.textContent = rank
    cryptoPrice.textContent = "$" + cryptoPriceUsd + " USD"
    cryptoChange.textContent = commaChange + "%"
    cryptoCap.textContent = "$" + commaCap
    cryptoVolume.textContent = commaVolume
    cryptoSupply.textContent = commaSupply + " " + upperSymbol

    // appends data to one row
    tr.appendChild(cryptoRank)
    tr.appendChild(cryptoName)
    tr.appendChild(cryptoPrice)
    tr.appendChild(cryptoChange)
    tr.appendChild(cryptoCap)
    tr.appendChild(cryptoVolume)
    tr.appendChild(cryptoSupply)

    // append row to table of data
    table.appendChild(tr)

}

// function to sort rank and name

function sortTable(c,d){
    var rows = $('#table tbody  tr').get();

    rows.sort(function(a, b) {

        var A = getVal(a);
        var B = getVal(b);

        if(A < B) {
            return -1*c;
        }
        if(A > B) {
            return 1*c;
        }
        return 0;
    });

    function getVal(elm){
        var v = $(elm).children('td').eq(d).text().toUpperCase();
        if($.isNumeric(v)){
            v = parseInt(v,10);
        }
        return v;
    }

    $.each(rows, function(index, row) {
        $('#table').children('tbody').append(row);
    });
}

$("#sortRank").click(function(){
    toggleRank *= -1; // toggle the sorting order
    var d = $(this).prevAll().length;
    console.log(this)
    console.log(d)
    console.log(length)
    sortTable(toggleRank,d);
});
$("#sortName").click(function(){
    toggleName *= -1; // toggle the sorting order
    var d = $(this).prevAll().length;
    sortTable(toggleName,d);
});


var counter1 = 0;
var counter2 = 0;
var counter3 = 0;
var counter4 = 0;
var counter5 = 0;


sortPrice.addEventListener("click", priceSort)
sortCap.addEventListener("click", changeCap)
sortChange.addEventListener("click", changePercent)
sortVolume.addEventListener("click", changeVolume)
sortSupply.addEventListener("click", changeSupply)

// function to sort price

function priceSort(event) {
    console.log(event.target.innerText)
    
    if (counter1 == 0) {
        array.sort(comparePrice)
        counter1++
    }
    
    else if (counter1 ==1) {
        array.sort(comparePrice2)
        counter1= 0
    }

    tableData1.innerHTML = ""
    for (i =0; i< array.length; i++) {               
        displayCoin(array[i].name, array[i].symbol, array[i].market_cap_rank, array[i].current_price, array[i].price_change_percentage_24h, array[i].market_cap, array[i].max_supply, array[i].circulating_supply, array[i].total_volume, array[i].image) 
    }
    

}

function comparePrice(a,b) {
    console.log(a)
    if (a.current_price < b.current_price) {
        return -1 
    }

    if (a.current_price > b.current_price) {
        return 1
    }

    return 0
}

function comparePrice2(a,b) {
    if (a.current_price < b.current_price) {
        return 1 
    }

    if (a.current_price > b.current_price) {
        return -1
    }

    return 0
}

// function to sort Market cap

function changeCap() {

    if (counter2 == 0) {
        array.sort(compareCap)
        counter2++
    }

    else if (counter2 == 1) {
        array.sort(compareCap2)
        counter2 = 0
    }

    tableData1.innerHTML = ""
    for (i =0; i< array.length; i++) {
                    
        displayCoin(array[i].name, array[i].symbol, array[i].market_cap_rank, array[i].current_price, array[i].price_change_percentage_24h, array[i].market_cap, array[i].max_supply, array[i].circulating_supply, array[i].total_volume, array[i].image) 
    }
}


function compareCap(a,b) {
    if (a.market_cap < b.market_cap) {
        return -1 
    }

    if (a.market_cap > b.market_cap) {
        return 1
    }

    return 0
}

function compareCap2(a,b) {
    if (a.market_cap < b.market_cap) {
        return 1 
    }

    if (a.market_cap > b.market_cap) {
        return -1
    }

    return 0
}

// function to sort percent change

function changePercent() {

    if (counter3 ==0 ) {
        array.sort(comparePercent)
        counter3++
    }

    else if (counter3 ==1) {
        array.sort(comparePercent2)
        counter3 = 0
    }

    console.log(array)

    tableData1.innerHTML = ""

    for (i =0; i< array.length; i++) {
                    
        displayCoin(array[i].name, array[i].symbol, array[i].market_cap_rank, array[i].current_price, array[i].price_change_percentage_24h, array[i].market_cap, array[i].max_supply, array[i].circulating_supply, array[i].total_volume, array[i].image) 
    }
}

function comparePercent(a,b) {
    if (a.price_change_percentage_24h < b.price_change_percentage_24h) {
        return -1 
    }

    if (a.price_change_percentage_24h > b.price_change_percentage_24h) {
        return 1
    }

    return 0
}

function comparePercent2(a,b) {
    if (a.price_change_percentage_24h < b.price_change_percentage_24h) {
        return 1 
    }

    if (a.price_change_percentage_24h > b.price_change_percentage_24h) {
        return -1
    }

    return 0
}

// function to sort volume

function changeVolume() {

    if (counter4 == 0) {
        array.sort(compareVolume)
        counter4++
    }

    else if ( counter4 == 1) {
        array.sort(compareVolume2)
        counter4 = 0
    }

    tableData1.innerHTML = ""

    for (i =0; i< array.length; i++) {
                    
        displayCoin(array[i].name, array[i].symbol, array[i].market_cap_rank, array[i].current_price, array[i].price_change_percentage_24h, array[i].market_cap, array[i].max_supply, array[i].circulating_supply, array[i].total_volume, array[i].image) 
    }
}

function compareVolume(a,b) {
    if (a.total_volume < b.total_volume) {
        return -1 
    }

    if (a.total_volume > b.total_volume) {
        return 1
    }

    return 0
}

function compareVolume2(a,b) {
    if (a.total_volume < b.total_volume) {
        return 1 
    }

    if (a.total_volume > b.total_volume) {
        return -1
    }

    return 0
}

// function to sort supply

function changeSupply() {

    if (counter5 == 0) {
        array.sort(compareSupply)
        counter5++
    }

    else if (counter5 == 1) {
        array.sort(compareSupply2)
        counter5=0
    }

    tableData1.innerHTML = ""

    for (i =0; i< array.length; i++) {
                    
        displayCoin(array[i].name, array[i].symbol, array[i].market_cap_rank, array[i].current_price, array[i].price_change_percentage_24h, array[i].market_cap, array[i].max_supply, array[i].circulating_supply, array[i].total_volume, array[i].image) 
    }
}

function compareSupply(a,b) {
    if (a.circulating_supply < b.circulating_supply) {
        return -1 
    }

    if (a.circulating_supply > b.circulating_supply) {
        return 1
    }

    return 0
}

function compareSupply2(a,b) {
    if (a.circulating_supply < b.circulating_supply) {
        return 1 
    }

    if (a.circulating_supply > b.circulating_supply) {
        return -1
    }

    return 0
}

// once page runs, API function starts
getCrypto()

