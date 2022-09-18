// see: https://collect.js.org/
import { collect } from 'collect.js';
import { findAbsoluteDifference } from './utils';

const mapCurrency = (data) => {
  const firstGroup = collect(data).groupBy((item) => item.rate < 1).all()?.true?.sortBy('rate') ?? [];
  const secondGroup = collect(data).groupBy((item) => item.rate >= 1 && item.rate < 1.5).all()?.true?.sortBy('rate') ?? [];
  const thirdGroup = collect(data).groupBy((item) => item.rate >= 1.5).all()?.true?.sortBy('rate') ?? [];

  return [
    {
      groupId: 1,
      constraint: '< 1',
      items: firstGroup.items,
      count: firstGroup?.items?.length ?? 0,
    },
    {
      groupId: 2,
      constraint: '>= 1 and < 1.5',
      items: secondGroup.items,
      count: secondGroup?.items?.length ?? 0,
    },
    {
      groupId: 3,
      constraint: '>= 1.5',
      items: thirdGroup.items,
      count: thirdGroup?.items?.length ?? 0,
    },
  ];
};

export const renderToView = (data) => {
  const tableContainer = document.getElementById('table-currency-container');

  tableContainer.innerHTML = '';

  let tableStr = '';
  mapCurrency(data).forEach((item) => {
    tableStr += '<div class="">';
    tableStr += `<h4 class="font-bold">Group ${item.groupId} (${item.constraint})</h4>`;

    item?.items?.forEach((tableItem) => {
      tableStr += `<p>${tableItem.name.toUpperCase()}: ${tableItem.rate}</p>`;
    });

    tableStr += `<h4 class="font-bold">Count: ${item.count}</h4>`;
    tableStr += '</div>';
  });

  tableContainer.innerHTML = tableStr;

  document.getElementById('total-difference').innerText = findAbsoluteDifference(data);
};
