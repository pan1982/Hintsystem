let rangeList = [];
class Ranges {
    
    comparator = (a, b) => {
        if (a[a.length-1] < b[b.length-1]) return -1;
        if (a[a.length-1] > b[b.length-1]) return 1;
        return 0;
      }
    
    generateRange = (range = [10, 20]) => {
        const newRange = [];
        for (let i = range[0]; i <= range[1]; i++)
        {
            newRange.push(i);
        }
        return newRange;
    }

    add = (range = [10, 20]) => {
        let 
        minValue = range[0], 
        index = [],
        maxValue = range[1];

        rangeList.forEach((r, i)=> {
            if (r.indexOf(minValue) !== -1 ||  minValue - r[r.length - 1] === 1) {
                minValue = r[0];
                index.push(i);
            } 
            
            if (r.indexOf(range[r.length > 0 ? 1 : 0]) !== -1 || r[0] - maxValue === 1) {
                maxValue = r[r.length - 1];
                index.push(i);
            }

            if (minValue < r[0] && r[r.length-1] < maxValue) {
                index.push(i);
            }
        }
        );

        let transitionList = rangeList.filter((r, i) => index.indexOf(i) === -1);
        transitionList.push(this.generateRange([minValue, maxValue]));
        transitionList = transitionList.sort(this.comparator);
        rangeList = transitionList;
    }

    remove = (range = [5,6]) => {
        let 
        values = [],
        minIndex = -1,
        maxIndex = -1,
        index,
        upperIndex;

        rangeList.forEach((r, i)=> {
            index = r.indexOf(range[0]);
            if (index !== -1) {
                (r.length > 1 && index !== 0) && values.push({
                    minValue: r[0], 
                    maxValue: r[index-1],
                });
                minIndex = i;
            }
            upperIndex = r.indexOf(range[r.length > 0 ? 1 : 0])
            if (upperIndex !== -1) {
                (r.length > 1 && upperIndex !== r.length-1) && values.push({
                    minValue: r[upperIndex + 1], 
                    maxValue: r[r.length - 1],
                });
                maxIndex = i;
            }
        });

        minIndex = minIndex !== -1 ? minIndex: maxIndex !== -1 ? maxIndex : rangeList.length;

        maxIndex = maxIndex > minIndex ? maxIndex : minIndex;

        let transitionList = rangeList.filter((r, i) => i < minIndex || i > maxIndex);
        values.forEach(value => transitionList.push(this.generateRange([value.minValue, value.maxValue])));
        transitionList = transitionList.sort(this.comparator);
        rangeList = transitionList;
    }

    print = () => {
        console.log(rangeList.map(r=> `[${r[0]}, ${r[r.length-1]}]`).join(' '));
    }
}