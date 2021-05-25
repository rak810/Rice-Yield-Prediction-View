const url = 'https://rice-yield-prediction-api.herokuapp.com/predict/weather';

const selectors = {
	'tbody' : document.querySelector('.table tbody'),
	'loader' : document.querySelector('#loading'),
	'header' : document.querySelector('.header'),
	'table' : document.querySelector('.table')
};

getWeatherData(url, selectors, false);
