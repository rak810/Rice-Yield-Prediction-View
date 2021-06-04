const districts = ['Barisal', 'Bhola', 'Bogra', 'Chandpur', 'Chittagong', 'Chuadanga',
'Comilla', 'Dhaka', 'Dinajpur', 'Faridpur', 'Feni', 'Jessore',
'Khulna', 'Madaripur', 'Maulvibazar', 'Mymensingh', 'Nilphamari',
'Noakhali', 'Pabna', 'Patuakhali', 'Rajshahi', 'Rangpur',
'Satkhira', 'Sylhet', 'Tangail'];

const aus = document.querySelector('.aus');
const aman = document.querySelector('.aman');
const boro = document.querySelector('.boro');
const btn = document.querySelector('.btn');
const select = document.querySelector('#dist');
const main = document.querySelector('.grid-item-2');
const tbody = document.querySelector('.tbody');
var ctx = document.querySelector('.graph').getContext('2d');
const loader = document.querySelector('#loading');
var ausObj = {};
var amanObj = {};
var boroObj = {};
var myChart = {};
window.onload = populateSelect(select, districts);

aus.addEventListener('click', function() {
    aman.classList.remove(['change-colors']);
    boro.classList.remove(['change-colors']);
    aus.classList.add(['change-colors']);
    genTable(JSON.parse(ausObj['val']));
    genGraph(JSON.parse(ausObj['prev']), JSON.parse(ausObj['val']));
});

aman.addEventListener('click', function() {
    aus.classList.remove(['change-colors']);
    boro.classList.remove(['change-colors']);
    aman.classList.add(['change-colors']);
    genTable(JSON.parse(amanObj['val']));
    genGraph(JSON.parse(amanObj['prev']), JSON.parse(amanObj['val']));
});

boro.addEventListener('click', function() {
  aman.classList.remove(['change-colors']);
  aus.classList.remove(['change-colors']);
  boro.classList.add(['change-colors']);
  genTable(JSON.parse(boroObj['val']));
  genGraph(JSON.parse(boroObj['prev']), JSON.parse(boroObj['val']));
});


btn.addEventListener('click', function() {
  main.classList.add(['hidden']);
  loader.classList.remove(['hidden']);
  const opt = select.options[select.selectedIndex].value;
  const url = 'https://rice-yield-prediction-api.herokuapp.com/validate';
  getValData(url, { st: opt });
});


function getValData(url, bodyObj) {
  fetch(url, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(bodyObj)
    }).then(function (response) {
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject(response);
		}
	}).then(function (data) {
      const res = JSON.parse(data);
      processValData(res);
      aman.classList.remove(['change-colors']);
      boro.classList.remove(['change-colors']);
      aus.classList.add(['change-colors']);
      genTable(JSON.parse(ausObj['val']));
      genGraph(JSON.parse(ausObj['prev']), JSON.parse(ausObj['val']))
      loader.classList.add(['hidden']);
      main.classList.remove(['hidden']);
      console.log(res);
	  }).catch(function (error) {
		  console.warn(error);
  });

}



function processValData(data) {
  keys = Object.keys(data);
  amanObj = JSON.parse(data[keys[0]]);
  boroObj = JSON.parse(data[keys[1]]);
  ausObj = JSON.parse(data[keys[2]]);
}

function genTable(obj) {
  tbody.innerHTML = "";
  Object.keys(obj).forEach(function(key) {
    const temp = obj[key]
    const tr = document.createElement('tr');
    Object.keys(temp).forEach(function(vkey) {
      const td = document.createElement('td');
      td.innerText = temp[vkey];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}




function genGraph(data, obj) {
    var actArr = [];
    var valArr = [NaN, NaN, NaN, NaN, NaN, NaN];
    Object.keys(data).forEach(function(key) {
      actArr.push(data[key]['prod'])
    });

    Object.keys(obj).forEach(function(key) {
      valArr.push((Number.parseFloat(obj[key]['pred'])*1000));
      actArr.push((Number.parseFloat(obj[key]['prod'])*1000));
    });
    console.log(actArr);
    console.log(valArr);

    if(myChart instanceof Chart) {
      myChart.destroy();
    }

    myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
        datasets: [{ 
            data: actArr,
            label: "Actual",
            borderColor: "#3e95cd",
            fill: false
          }, { 
            data: valArr,
            label: "Predicted",
            borderColor: "#3cba9f",
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'World population per region (in millions)'
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Data'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'value'
                }
            }]
        }
      }
    });
}

function populateSelect(sel, data) {
	var opts = "";
	data.forEach(function(val) {
		opts+=`<option value="${val}">${val}</option>`
	});
	sel.innerHTML = opts;
}
