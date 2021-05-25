const dists = ['Barisal', 'Bhola', 'Bogra', 'Chandpur', 'Chittagong', 'Chuadanga',
'Comilla', 'Dhaka', 'Dinajpur', 'Faridpur', 'Feni', 'Pabna',
'Jessore', 'Khulna', 'Madaripur', 'Noakhali', 'Mymensingh',
'Patuakhali', 'Rajshahi', 'Rangpur', 'Satkhira', 'Maulavibazar',
'Nilphamari', 'Sylhet', 'Tangail'];

const url = 'https://rice-yield-prediction-api.herokuapp.com/predict/yield'
const selectors = {
    'result' : document.querySelector('.grid-item-2'),
    'dist' : document.querySelector('#dist'),
    'yr' : document.querySelector('#year'),
    'land' : document.querySelector('#land'),
    'btn' : document.querySelector('.btn'),
    'type' : document.querySelector('#type'),
    'loc' : document.querySelector('.location'),
    'lat' : document.querySelector('.lat'),
    'long' : document.querySelector('.long'),
    'rain' : document.querySelector('.rain'),
    'rel_hum' : document.querySelector('.rel-hum'),
    'cloud' : document.querySelector('.cloud'),
    'sun' : document.querySelector('.sun'),
    'temp' : document.querySelector('.temp'),
    'ndvi' : document.querySelector('.ndvi'),
    'area' : document.querySelector('.area'),
    'rtype' : document.querySelector('.type'),
    'prod' : document.querySelector('.pred'),
    'loader' : document.querySelector('#loading')
};

populateSelect(selectors['dist'], dists);


selectors['btn'].addEventListener('click', function() {
    selectors['loader'].classList.remove(['hidden']);
    selectors['result'].classList.add(['hidden']);
    const stOpt = selectors['dist'].options[selectors['dist'].selectedIndex].value;
    const typeOpt =  selectors['type'].options[selectors['type'].selectedIndex].value;

    const postBody = {
        st : stOpt,
        yr : parseInt(selectors['yr'].value),
        type : typeOpt,
        land : parseFloat(selectors['land'].value)
    }

    console.log(postBody);
    getPrediction(url, selectors, false, postBody);
});
