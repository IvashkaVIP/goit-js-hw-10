import './css/styles.css';

//name.official - полное имя страны
//capital - столица
//population - население
//flags.svg - ссылка на изображение флага
//languages - массив языков

//https://restcountries.com/v3.1/all?fields=name,flags`

const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v3.1/all';
const ENDPOINT = '?fields=name,capital,population,flags,languages';

const options = {};

 fetch(`${BASE_URL}${ENDPOINT}`, options)
   .then(resp => resp.json())
   .then(data => console.log(data));

