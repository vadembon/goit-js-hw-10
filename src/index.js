import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputData, DEBOUNCE_DELAY));

function onInputData(evt) {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  const searchInput = evt.target.value.trim();
  if (searchInput !== '') {
    fetchCountries(searchInput)
      .then(conditionsCountries)
      .catch(err =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
  }
}
function conditionsCountries(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length >= 2 && data.length <= 10) {
    createMarkUpCountryList(data);
  } else if (data.length === 1) {
    createMarkUpCountryInfo(data);
  }
  console.log(data);
}

function createMarkUpCountryList(obj) {
  const markup = obj
    .map(item => {
      return `<li class="item">
      <img src="${item.flags.png}" alt="flag" width=30px; height=20px>
   <h2 class='title'>${item.name.common}</h2>
    </li>`;
    })
    .join('');

  countryList.innerHTML = markup;
}
function createMarkUpCountryInfo(obj) {
  const markup = obj
    .map(item => {
      return `<div class="header">
           <img src="${item.flags.png}" alt="flag" width=30px; height=20px>
   <h2 class='title'> ${item.name.common}</h2>
      </div>
   
   <p><b>Capital</b>: ${item.capital}</p>
   <p><b>Population</b>: ${item.population}</p>
       <p><b>Languages</b>: ${Object.values(item.languages)} </p>
    `;
    })
    .join('');

  countryInfo.innerHTML = markup;
}
