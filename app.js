var sectionData = document.getElementById('section-data');

var gnewconfirmed = document.getElementById('newconfirmed');
var gnewdeaths = document.getElementById('newdeaths');
var gnewrecovered = document.getElementById('newrecovered');


function fetchData(){
    var section = document.getElementById('section');
    section.classList.add('section-height');

    var http = new XMLHttpRequest();
    http.onreadystatechange = function(){
        if(this.readyState === 4){
            if(this.status === 200){
                var response = JSON.parse(this.response);
                console.log(response);
                console.log(response.Countries);

                var col = [];
                for (var i = 0; i < 10; i++) {
                    for (var key in response.Countries[i]) {
                        if (col.indexOf(key) === -1) {
                            col.push(key);
                        }
                    }
                }
                console.log(col[1]);
                var table = document.createElement("table");
                table.classList.add('table');
                table.classList.add('table-responsive');
                table.classList.add('hover-table');
                var tr = table.insertRow(-1);
                for (var i = 0; i < col.length; i++) {
                    var th = document.createElement("th");     
                    if(col[i] === "Country" || col[i] === "NewConfirmed"
                    || col[i] === "NewDeaths" || col[i] === "NewRecovered"){    
                        th.innerHTML = col[i];
                        tr.appendChild(th);
                    }
                }
                for (var i = 0; i < response.Countries.length; i++) {
                    tr = table.insertRow(-1);
                    for (var j = 0; j < col.length; j++) {
                        if(col[j] === "Country" || col[j] === "NewConfirmed"
                        || col[j] === "NewDeaths" || col[j] === "NewRecovered"){
                            var tabCell = tr.insertCell(-1);
                            tabCell.innerHTML = response.Countries[i][col[j]];
                        }
                    }
                }
                var divContainer = document.getElementById("show-table-data");
                divContainer.innerHTML = " ";
                divContainer.appendChild(table);

                gnewconfirmed.innerHTML =  `${response.Global.NewConfirmed}`;
                gnewdeaths.innerHTML =  `${response.Global.NewDeaths}`;
                gnewrecovered.innerHTML =  `${response.Global.NewRecovered}`;


            } else {
                console.log("Call Failed");
            }
        }
    }
    http.open('GET', 'https://api.covid19api.com/summary',true);
    http.send();
}