import './css/styles.css';

//name.official - полное имя страны
//capital - столица
//population - население
//flags.svg - ссылка на изображение флага
//languages - массив языков

//https://restcountries.com/v3.1/all?fields=name,flags`



const textInput = document.querySelector('#search-box');
textInput.addEventListener('input', onTextInput);
//console.log(textInput);

function onTextInput(evt) {
    console.log(evt.target.value);
}

console.log(fetchCountries('SWIT'));

function fetchCountries(name) {
    const DEBOUNCE_DELAY = 300;
    const BASE_URL = 'https://restcountries.com/v3.1/name/';
    const ENDPOINT = '?fields=name,capital,population,flag,languages';
    const options = {};

return fetch(`${BASE_URL}${name}${ENDPOINT}`, options)
  .then(resp => {
    if (!resp.ok) {
      throw new Error();
    }
    return resp.json();
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));
    
}
