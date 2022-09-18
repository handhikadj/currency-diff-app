export const findPossiblePair = (array, anchor) => array.reduce((acc, name) => {
  if (name !== anchor) {
    acc.push(`${anchor}-${name}`);
    acc.push(`${name}-${anchor}`);
  }
  return acc;
}, []);

export const mapResults = (pairs, results) => pairs.map((item, key) => {
  const splitStr = item.split('-');

  return { name: item, rate: results[key].data[splitStr[1]].toString().substr(0, 3) };
});

const predicate = (entry1, entry2) => Math.abs(parseFloat(entry1) - parseFloat(entry2)) <= 0.5;

export const findAbsoluteDifference = (items) => {
  const array = items.map((item) => item.rate);
  let highestYet = 0;

  for (let i = 0; i < array.length; ++i) {
    let matchingEntries = 0;

    for (let j = 0; j < array.length; ++j) {
      if (i === j) {
        continue;
      }

      if (predicate(array[i], array[j])) {
        ++matchingEntries;
      }
    }

    if (matchingEntries > highestYet) {
      highestYet = matchingEntries;
    }
  }

  return highestYet;
};
