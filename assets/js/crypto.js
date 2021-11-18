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
var togglePrice = 1; 
var toggleChange = 1; 
var toggleCap = 1; 
var toggleVolume = 1; 
var toggleSupply = 1; 
var i = 0;


var getCrypto = function() {
    var apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    console.log(apiUrl)
    
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data)
                console.log(data.length)
                for (i =0; i< data.length; i++) {
                    
                    displayCoin(data[i].name, data[i].symbol, data[i].market_cap_rank, data[i].current_price, data[i].price_change_percentage_24h, data[i].market_cap, data[i].max_supply, data[i].circulating_supply, data[i].total_volume, data[i].image) 
                }
                array = data

                array.sort(comparePrice)

                console.log(array)
            });
        } else {
            alert("Error");
        }
    });
};



function numToComma(num) {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

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

    cryptoName.classList.add("my-3", "py-2", "has-text-centered")
    cryptoRank.classList.add("my-3", "py-2", "has-text-centered")
    cryptoPrice.classList.add("my-3", "py-2")
    cryptoChange.classList.add("my-3", "py-2")
    cryptoCap.classList.add("my-3", "py-2")
    cryptoVolume.classList.add("my-3", "py-2")
    cryptoSupply.classList.add("my-3", "py-2")
    tr.classList.add("borderLine")

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

    tr.appendChild(cryptoRank)
    tr.appendChild(cryptoName)
    tr.appendChild(cryptoPrice)
    tr.appendChild(cryptoChange)
    tr.appendChild(cryptoCap)
    tr.appendChild(cryptoVolume)
    tr.appendChild(cryptoSupply)

    table.appendChild(tr)

}

getCrypto()

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
$("#sortChange").click(function(){
    toggleChange *= -1; // toggle the sorting order
    var d = $(this).prevAll().length;
    sortTable(toggleChange,d);
});
$("#sortCap").click(function(){
    toggleRank *= -1; // toggle the sorting order
    var d = $(this).prevAll().length;
    sortTable(toggleRank,d);
});
$("#sortVolume").click(function(){
    toggleVolume *= -1; // toggle the sorting order
    var d = $(this).prevAll().length;
    sortTable(toggleVolume,d);
});
$("#sortSupply").click(function(){
    toggleSupply *= -1; // toggle the sorting order
    var d = $(this).prevAll().length;
    sortTable(toggleSupply,d);
});

sortPrice.addEventListener("click", priceSort)

function priceSort() {
    i=0
    function comparePrice(a,b) {

        if (a.current_price < b.current_price) {
            if (a.current_price < b.current_price) {
                return -1 
            }
    
            if (a.current_price > b.current_price) {
                return 1
            }
    
            return 0

        }

        else if (a.current_price > b.current_price) {
            if (a.current_price < b.current_price) {
                return 1 
            }
    
            if (a.current_price > b.current_price) {
                return -1
            }
    
            return 0
        }

    }
    array.sort(comparePrice)
    console.log(array)

    tableData1.innerHTML = ""

    for (i =0; i< array.length; i++) {               
        displayCoin(array[i].name, array[i].symbol, array[i].market_cap_rank, array[i].current_price, array[i].price_change_percentage_24h, array[i].market_cap, array[i].max_supply, array[i].circulating_supply, array[i].total_volume, array[i].image) 
    }
}

function comparePrice(a,b) {
    if (a.current_price < b.current_price) {
        return -1 
    }

    if (a.current_price > b.current_price) {
        return 1
    }

    return 0
}

// sortCap.addEventListener("click", changeCap)

// function changeCap() {
//     function compareCap(a,b) {

//         if (a.market_cap < b.market_cap) {
//             if (a.market_cap < b.market_cap) {
//                 return -1 
//             }
    
//             if (a.market_cap > b.market_cap) {
//                 return 1
//             }
    
//             return 0

//         }

//         else if (a.market_cap > b.market_cap) {
//             if (a.market_cap < b.market_cap) {
//                 return 1 
//             }
    
//             if (a.market_cap > b.market_cap) {
//                 return -1
//             }
    
//             return 0
//         }

//     }
//     array.sort(compareCap)
//     console.log(array)

//     tableData1.innerHTML = ""

//     for (i =0; i< array.length; i++) {
                    
//         displayCoin(array[i].name, array[i].symbol, array[i].market_cap_rank, array[i].current_price, array[i].price_change_percentage_24h, array[i].market_cap, array[i].max_supply, array[i].circulating_supply, array[i].total_volume, array[i].image) 
//     }
// }


// function compareCap(a,b) {
//     if (a.market_cap < b.market_cap) {
//         return -1 
//     }

//     if (a.market_cap > b.market_cap) {
//         return 1
//     }

//     return 0
// }