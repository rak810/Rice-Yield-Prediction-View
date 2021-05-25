const districts = ['Maulvibazar',
 'Chittagong',
 'Kushtia',
 'Jessore',
 'Bagerhat',
 'Manikganj',
 'Comilla',
 'Barguna',
 'Thakurgaon',
 'Rangpur',
 'Panchagarh',
 'Nilphamari',
 'Lalmonirhat',
 'Kurigram',
 'Gaibandha',
 'Dinajpur',
 'Nawabganj',
 'Naogaon',
 'Sylhet',
 'Sunamganj',
 'Habiganj',
 'Satkhira',
 'Narail',
 'Meherpur',
 'Magura',
 'Khulna',
 'Jhenaidah',
 'Chuadanga',
 'Tangail',
 'Sherpur',
 'Shariatpur',
 'Rajbari',
 'Netrakona',
 'Narsingdi',
 'Narayanganj',
 'Mymensingh',
 'Munshiganj',
 'Madaripur',
 'Kishoreganj',
 'Jamalpur',
 'Gopalganj',
 'Gazipur',
 'Faridpur',
 'Patuakhali',
 'Pirojpur',
 'Jhalokati',
 'Bhola',
 'Barisal',
 'Joypurhat',
 'Natore',
 'Rajshahi',
 'Bogra',
 'Pabna',
 'Sirajganj',
 'Brahamanbaria',
 'Lakshmipur',
 'Chandpur',
 'Noakhali',
 'Dhaka',
 'Feni'];
 
 const url = 'https://rice-yield-prediction-api.herokuapp.com/ndvi'
 const selectors = {
	'tbody' : document.querySelector('.table tbody'),
	'loader' : document.querySelector('#loading'),
	'header' : document.querySelector('article .header'),
	'table' : document.querySelector('.table'),
    'p' : document.querySelector('.header p'),
    'select' : document.querySelector('#dist')
};

populateSelect(selectors['select'], districts)


document.querySelector('.btn').addEventListener('click', function() {
    const opt = selectors['select'].options[selectors['select'].selectedIndex].value;
    selectors['table'].classList.add(['hidden']);
    selectors['header'].classList.add(['hidden']);
    selectors['loader'].classList.remove(['hidden']);
    selectors['p'].innerHTML = ""
    selectors['tbody'].innerHTML = ""

    getNDVI(url, selectors, false, {st : opt});
});


// fetch(url, {
//     method: 'post',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({st : districts[0]})
//   }).then(function(response) {
//     return response.json();
//   }).then(function(data) {
//     console.log(data)
//   });