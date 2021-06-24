const months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
function genTbody(tbody, data) {
	const tr = document.createElement('tr');
	Object.keys(data).forEach(function(val) {
		
		if(val !== 'lat' && val !== 'long') {
			td = document.createElement('td');
			if (val === 'mn') {
				td.innerText = months[Number.parseInt(data[val])-1];
			}
			else if(val !== 'st' && val !== 'yr') {
				td.innerText = Number.parseFloat(data[val]).toFixed(3);
			}
			else {
				td.innerText = data[val];
			}
			tr.appendChild(td);
		}

	});
	
	tbody.appendChild(tr);
}


function processWeatherData(data, tbody) {
    parsedData = JSON.parse(data)
	
	Object.keys(parsedData).forEach(function(key) {
		const obj1 = parsedData[key];
		genTbody(tbody, obj1);
	});

}


var getWeatherData = function (url, selectors, postBody, isTest) {

	fetch(url, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(postBody)
    }).then(function (response) {
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject(response);
		}
	}).then(function (data) {
		console.log("nigga");
        
		if(isTest) {
			console.log(Object.keys(JSON.parse(data)))
		}
		else {
			const tbody = selectors['tbody'];
			const loader = selectors['loader'];
			const header = selectors['header'];
			const main = selectors['main'];
			tbody.innerHTML = '';
			processWeatherData(data, tbody);
			header.childNodes[3].innerHTML = `${postBody['st']}, ${postBody['yr']}`;
			main.classList.remove(['hidden']);
			loader.classList.add(['hidden']);
		}

	}).catch(function (error) {
		console.warn(error);
	});

};

function genNDVItable(tbody, obj) {
	const month= ["January","February","March","April","May","June","July",
	"August","September","October","November","December"];

	const tr = document.createElement('tr');
	const arr = []
	arr.push(obj['yr'])
	Object.keys(obj).forEach(function(key) {
		if(month.includes(key)) {
			const monthIdx = month.indexOf(key);
			arr[month.indexOf(key)+1] = obj[key]
		}
	});
	arr.push(obj['AVG'])
	arr.push(obj['STDDEV'])

	console.log(arr)
	var tdStr = "";
	arr.forEach(function(val, idx) {
		if(idx !== 0) {
			tdStr+= `<td>${Number.parseFloat(val).toFixed(4)}</td>`
		} else {
			tdStr+= `<td>${val}</td>`
		}
	})
	tr.innerHTML = tdStr;
	tbody.appendChild(tr);	
}

function processNDVIdata(data, tbody) {
	parsedData = JSON.parse(data)
	
	Object.keys(parsedData).forEach(function(key) {
		const obj1 = parsedData[key];
		genNDVItable(tbody, obj1);
	});
}
var getNDVI = function(url, selectors, isTest, postBody) {
	console.log(JSON.stringify(postBody))
	fetch(url, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(postBody)
    }).then(function (response) {
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject(response);
		}
	}).then(function (data) {
		console.log("nigga");
        
		if(isTest) {
			console.log(JSON.parse(data))
		}
		else {
			const tbody = selectors['tbody'];
			const loader = selectors['loader'];
			const header = selectors['header'];
			const table = selectors['table'];
			const p = selectors['p'];
			p.innerText = `For ${postBody.st} From 2011 to 2019`;
			processNDVIdata(data, tbody);
			loader.classList.add(['hidden']);
			header.classList.remove(['hidden']);
			table.classList.remove(['hidden']);
		}

	}).catch(function (error) {
		console.warn(error);
	});
}


function processPrediction(predData, selectors) {
	data = JSON.parse(predData);

	selectors['loc'].innerText = data['dist'];
	selectors['lat'].innerText = `${data['geo']['lat']} deg`;
	selectors['long'].innerText = `${data['geo']['long']}  deg`;
	selectors['area'].innerText = `${data['land']} hectares`;
	selectors['rtype'].innerText = `${data['type']}`;
	selectors['ndvi'].innerText = `${Number.parseFloat(data['ndvi']).toFixed(4)}`;
	selectors['prod'].innerText = `${(Number.parseFloat(data['prod'])/1000).toFixed(3)} m.ton`;
	selectors['rain'].innerText = `${Number.parseFloat(data['weather']['rain']).toFixed(3) } mm`;
	selectors['rel_hum'].innerText = `${Number.parseFloat(data['weather']['rel_hum']).toFixed(3) } %`;
	selectors['cloud'].innerText = `${Number.parseFloat(data['weather']['cloud']).toFixed(3) } okta`;
	selectors['sun'].innerText = `${Number.parseFloat(data['weather']['avg_sun']).toFixed(3)} hr/day`;
	selectors['temp'].innerText = `${Number.parseFloat(data['weather']['temp']).toFixed(2)} deg`;
}

var getPrediction = function(url, selectors, isTest, postBody) {
	console.log(JSON.stringify(postBody))
	fetch(url, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(postBody)
    }).then(function (response) {
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject(response);
		}
	}).then(function (data) {
		console.log("nigga");
        
		if(isTest) {
			console.log(JSON.parse(data))
		}
		else {
			processPrediction(data, selectors);
			selectors['result'].classList.remove(['hidden']);
			selectors['loader'].classList.add(['hidden']);
		}

	}).catch(function (error) {
		console.warn(error);
	});
}


function populateSelect(sel, data) {
	var opts = "";
	data.forEach(function(val) {
		opts+=`<option value="${val}">${val}</option>`
	});
	sel.innerHTML = opts;
}

