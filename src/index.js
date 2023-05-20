import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

//name.official - полное имя страны
//capital - столица
//population - население
//flags.svg - ссылка на изображение флага
//languages - массив языков

//https://restcountries.com/v3.1/all?fields=name,flags`

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info')
searchBox.addEventListener('input', debounce(inputCountries, DEBOUNCE_DELAY));

//console.log(list);

function inputCountries(evt) {
    //console.log(evt.target.value.trim());

    fetchCountries(evt.target.value.trim())
        .then(data => {
            if (data.length > 10) {
                Notify.failure(
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
      .catch(err => console.error(err));
    }

function creatMarkupCountryInfo(arr) {
    return arr
      .map(
        ({
          name: { common, official },
          flags: { svg },
          capital,
          population,
          languages,
        }) => `
        
        <h4>Capital: <span>${capital}</span></h4>
        <h4>Population: <span>${population}</span></h4>
        <h4>Languages: <span>${Object.values(languages)}</span></h4>
        `
      )
      .join('');

}

//  <div>
//         <img src="${svg}" alt="${common}" width = "35" />
//         <h2>${official}</h2>
//         </div>
//         <h3>Capital: <span>${capital}</span></h3>
//         <h3>Population: <span>${population}</span></h3>
//         <h3>Languages: <span>${Object.values(languages)}</span></h3>




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

function fetchCountries(name = '') {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  const ENDPOINT = '?fields=name,capital,population,flags,languages';

  const options = {};

  return fetch(`${BASE_URL}${name}${ENDPOINT}`, options).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
  
}

