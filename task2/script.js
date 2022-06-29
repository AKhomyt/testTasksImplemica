"use strict";
let enter2 = document.querySelector('#inputT2');
let result2 = document.querySelector('#resultT2');
// Основной массив городов
const Cities = {
    city1: {
        city2: 50000,
        city3: 78000,
        city4: 49000,
        city5: 59000,
        city6: 50000,
        city7: 45000,
        city8: 45000,
        city9: 15000,
    },
    city2: {
        city1: 50000,
        city3: 59000,
        city9: 35000,
    },
    city3: {
        city1: 78000,
        city2: 59000,
        city4: 64000,
    },
    city4: {
        city1: 49000,
        city3: 64000,
        city5: 49000,
    },
    city5: {
        city1: 59000,
        city4: 49000,
        city6: 45000,
    },
    city6: {
        city1: 50000,
        city5: 45000,
        city7: 40000,
    },
    city7: {
        city1: 45000,
        city6: 40000,
        city8: 42000,
    },
    city8: {
        city1: 45000,
        city7: 42000,
        city9: 37000,
    },
    city9: {
        city1: 15000,
        city2: 35000,
        city8: 37000,
    }
};
// Сalculation of all possible paths from point A to point B
function calculate(path, array) {
    // path => cityA-cityB
    const calcArray = array || [];
    let cities = path.split('-');
    // The input string is split into a working array, the last
    // element is removed in the working array to work with it,
    // when writing to the resulting array or to call recursion,
    // it is returned back to the string
    const finish = cities[cities.length - 1];
    cities.pop();
    // traversal of all neighboring elements relative to the current one
    for (let i in Cities[cities[cities.length - 1]]) {
        let tempArray = cities.slice(0);
        // Checking if the current point is elevated in the
        // already traversed path, if so, then the iteration is reset
        let key = false;
        for (let j of cities) {
            if (i === j) {
                key = true;
                break;
            }
        }
        // If the current point is the end point, then an entry
        // is added to the array and the iteration is restarted
        if (i === finish) {
            tempArray.push(i);
            calcArray.push(tempArray.join('-'));
            key = true;
        }
        if (key)
            continue;
        tempArray.push(i, finish);
        calculate(tempArray.join('-'), calcArray);
    }
    return calcArray;
}
// updating the array considering the cost of each path
function cost(pathSting) {
    const arrStr = pathSting.split('-');
    let cost = 0;
    for (let i = 0; i < arrStr.length - 1; i++) {
        cost += Cities[arrStr[i]][arrStr[i + 1]];
    }
    return cost;
}
function sortByPricecoulck(cityString) {
    const calcArray = [];
    for (let i of calculate(cityString)) {
        calcArray.push([i, cost(i)]);
    }
    for (let i = 0; i < calcArray.length; i++) {
        for (let j = 0; j < calcArray.length; j++) {
            if (calcArray[i][1] < calcArray[j][1]) {
                let temp = calcArray[i];
                calcArray[i] = calcArray[j];
                calcArray[j] = temp;
            }
        }
    }
    return calcArray;
}
function workArea(ev) {
    result2.innerHTML = '';
    let string = ev.target.value.split('-');
    if (string.length < 2 ||
        Cities[string[0]] === undefined ||
        Cities[string[1]] === undefined) {
        return;
    }
    const arrResult = sortByPricecoulck(ev.target.value);
    const tbody = document.createElement('tbody');
    arrResult.map(el => {
        tbody.appendChild(trFunc(el[0], el[1]));
    });
    result2.appendChild(tbody);
}
function trFunc(path, cost) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    td1.innerHTML = path;
    td2.innerHTML = cost + '';
    tr.appendChild(td2);
    tr.appendChild(td1);
    return tr;
}
enter2.addEventListener('input', workArea);
