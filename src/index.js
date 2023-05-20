import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
searchBox.addEventListener('input', debounce(inputCountries, DEBOUNCE_DELAY));

//console.log(list);

function inputCountries(evt) {
  if (!evt.target.value.trim()) {
    Notify.failure('the field cannot be empty!');
    return;
  }
  fetchCountries(evt.target.value.trim())
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        return;
      }
      if (data.length > 1) {
        countryInfo.innerHTML = '';
        countryList.innerHTML = creatMarkupCountriesList(data);
        return;
      }
      countryList.innerHTML = creatMarkupCountriesList(data);
      countryInfo.innerHTML = creatMarkupCountryInfo(data);
    })
    .catch(err => {
        console.log(err);
        if (err.message === '404') {
            Notify.failure('Oops, there is no country whith that name');
        }
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
    });
}

function creatMarkupCountryInfo(arr) {
  return arr
    .map(
      ({ capital, population, languages }) => `
        
        <h4>Capital: <span>${capital}</span></h4>
        <h4>Population: <span>${population}</span></h4>
        <h4>Languages: <span>${Object.values(languages)}</span></h4>
        `
    )
    .join('');
}

function creatMarkupCountriesList(arr) {
  return arr
    .map(
      ({ name: { common, official }, flags: { svg } }) =>
        `<li> 
         <img src="${svg}" alt="${common}" width="35"/>
         <h3>${official}</h3>
         </li>`
    )
    .join('');
}
