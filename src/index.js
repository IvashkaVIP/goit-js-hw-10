import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

//name.official - полное имя страны
//capital - столица
//population - население
//flags.svg - ссылка на изображение флага
//languages - массив языков

//https://restcountries.com/v3.1/all?fields=name,flags`

const textInput = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
textInput.addEventListener('input', debounce(inputCountries, DEBOUNCE_DELAY));

//console.log(list);

function inputCountries(evt) {
    //console.log(evt.target.value.trim());

    fetchCountries(evt.target.value.trim())
        .then(data => {
            if (data.length > 10) {
                console.log('Too many matches found. Please enter a more specific name.');
                return;
            }
            // return data;
            //console.log(data);
            //list.innerHTML = creatShortMarkup(data);
            list.innerHTML = creatMarkup(data);
        })
      .catch(err => console.error(err));
    }

function creatMarkup(arr) {
    
    
    return arr
      .map(
        ({ name: { common, official }, flags: { svg } }) =>
          `<li> 
         <img src="${svg}" text="${common}" width="35"/>
         <h3>${official}</h3>
         </li>`
      )
      .join('');
    
    // return arr.map(({ name, flag }) => 
    //     `<li> 
    //     <img src="${flag}" text="${name}">
    //     <h2>${name}</h2>
    //     </li>`).json('');
    
}

//console.log(fetchCountries('SWIT'));

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
  //   .then(data => console.log(data))
  //   .catch(err => console.log(err));
}
