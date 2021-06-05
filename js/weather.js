const url = 'https://rice-yield-prediction-api.herokuapp.com/predict/weather';
const districts = ['Barisal', 'Bhola', 'Bogra', 'Chandpur',
'Chittagong (City-Ambagan)', 'Chittagong (IAP-Patenga)',
'Chuadanga', 'Comilla', "Cox's Bazar", 'Dhaka', 'Dinajpur',
'Faridpur', 'Feni', 'Hatiya', 'Ishurdi', 'Jessore', 'Khepupara',
'Khulna', 'Kutubdia', 'Madaripur', 'Maijdee Court', 'Mongla',
'Mymensingh', 'Patuakhali', 'Rajshahi', 'Rangamati', 'Rangpur',
'Sandwip', 'Satkhira', 'Sitakunda', 'Srimangal', 'Syedpur',
'Sylhet', 'Tangail', 'Teknaf'];

const years = [2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003,
	2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992,
	1991, 1990]

const selectors = {
	'tbody' : document.querySelector('.table tbody'),
	'main' : document.querySelector('.grid-item-2'),
	'loader' : document.querySelector('#loading'),
	'header' : document.querySelector('.header'),
	'table' : document.querySelector('.table'),
	'dists' : document.querySelector('#dist'),
	'year' : document.querySelector('#year'),
	'btn' : document.querySelector('.btn')
 };

populateSelect(selectors['dists'], districts);
populateSelect(selectors['year'], years);


 selectors['btn'].addEventListener('click', function() {
	selectors['loader'].classList.remove(['hidden']);
	selectors['main'].classList.add(['hidden']);
	const st = selectors['dists'].options[selectors['dists'].options.selectedIndex].value;
	const yr = selectors['year'].options[selectors['year'].options.selectedIndex].value;
	getWeatherData(url, selectors, {'st' : st, 'yr' : yr}, false);
 });



