let rangeList = [];
class Ranges {
  comparator = (a, b) => {
    if (a[a.length - 1] < b[b.length - 1]) return -1;
    if (a[a.length - 1] > b[b.length - 1]) return 1;
    return 0;
  };

  generateRange = (values, filteredIndexes) => {
    let transitionList = rangeList.filter(
      (r, i) => filteredIndexes.indexOf(i) === -1
    );
    values.forEach(value =>
      transitionList.push([value.minValue, value.maxValue])
    );
    transitionList = transitionList.sort(this.comparator);
    rangeList = transitionList;
  };

  add = (range = [10, 20]) => {
    let minValue = range[0],
      values = [],
      index = [],
      maxValue = range[1];

    rangeList.forEach((r, i) => {
      if (minValue >= r[0] && minValue <= r[1]) {
        minValue = r[0];
        index.push(i);
      } else if (rangeList[i] && minValue === rangeList[i][1] + 1) {
        minValue = rangeList[i][0];
        index.push(i);
      }

      if (maxValue >= r[0] && maxValue <= r[1]) {
        maxValue = r[1];
        index.push(i);
      } else if (rangeList[i] && maxValue === rangeList[i][0] - 1) {
        maxValue = rangeList[i + 1][1];
        index.push(i);
      } else if (rangeList[i] && maxValue === rangeList[i][1] + 1) {
        index.push(i);
      }

      if (minValue < r[0] && r[1] < maxValue) {
        index.push(i);
      }
    });
    values.push({ minValue, maxValue });
    this.generateRange(values, index);
  };

  remove = (range = [5, 6]) => {
    let values = [],
      deletedIndexes = [];

    rangeList.forEach((r, i) => {
      if (range[0] > r[0] && range[0] <= r[1]) {
        values.push({
          minValue: r[0],
          maxValue: range[0] - 1
        });
        deletedIndexes.push(i);
      }

      if (range[1] >= r[0] && range[1] < r[1]) {
        values.push({
          minValue: range[1] + 1,
          maxValue: r[1]
        });
        deletedIndexes.push(i);
      }

      if (range[0] <= r[0] && r[1] <= range[1]) {
        deletedIndexes.push(i);
      }
    });

    this.generateRange(values, deletedIndexes);
  };

  print = () => {
    console.log(rangeList.map(r => `[${r[0]}, ${r[1]}]`).join(" "));
  };
}
