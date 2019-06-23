let rangeList = [];
class Ranges {
  comparator = (a, b) => {
    if (a[a.length - 1] < b[b.length - 1]) return -1;
    if (a[a.length - 1] > b[b.length - 1]) return 1;
    return 0;
  };

  generateRange = (values, filteredIndexes) => {
    
    rangeList.splice(Math.min(...filteredIndexes), filteredIndexes.length)

    values.forEach(value =>
      rangeList.push([value.minValue, value.maxValue])
    );
    rangeList.sort(this.comparator);
  };

  add = (range = [10, 20]) => {
    let minValue = range[0],
      values = [],
      index = [],
      maxValue = range[1];

    rangeList.forEach((r, i) => {
      if (minValue >= r[0] && minValue <= r[1]) {
        minValue = r[0];
      } else if (rangeList[i] && minValue === rangeList[i][1] + 1) {
        minValue = rangeList[i][0];
      }

      if (maxValue >= r[0] && maxValue <= r[1]) {
        maxValue = r[1];
      } else if (rangeList[i] && maxValue === rangeList[i][0] - 1) {
        maxValue = rangeList[i + 1][1];
      } else if (rangeList[i] && maxValue === rangeList[i][1] + 1) {
      }

      if (minValue <= r[0] && r[1] <= maxValue) {
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
