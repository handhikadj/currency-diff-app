import '@styles/main.scss';
import axiosService from '@/services/axiosService';
import { renderToView } from '@/currencyProcess';
import { findPossiblePair, mapResults } from '@/utils';

const getExchangePairs = () => {
  const resPair = findPossiblePair(
    [...document.querySelectorAll('#currencies-select option')].map((itemEl) => itemEl.value),
    document.getElementById('currencies-select').value,
  );

  return {
    pairs: resPair,
    requests: resPair.map((item) => {
      const splitStr = item.split('-');
      return axiosService.get(`/currencies/${splitStr[0]}/${splitStr[1]}.json`);
    }),
  };
};

const getExchangeRates = async () => {
  const tableContainer = document.getElementById('table-currency-container');
  tableContainer.innerHTML = '<p>Loading...</p>';

  const exchangePairs = getExchangePairs();
  const results = await Promise.all(exchangePairs.requests);
  const data = mapResults(exchangePairs.pairs, results);

  renderToView(data);
};

// get data when dom loaded
getExchangeRates();

document.getElementById('currencies-select').onchange = () => {
  getExchangeRates();
};
