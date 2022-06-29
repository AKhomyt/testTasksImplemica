let enter3 = document.querySelector('#inputT3')!
let result3: any = document.querySelector('#resultT3')!

// To solve this problem, long arithmetic is used, numbers are converted
// into an array format, for further work with them (255 => [2, 5, 5]),
// addition and multiplication methods are implemented for this format

enter3.addEventListener('input', (ev: any) => {
  if (isNaN(+ev.target.value) || ev.target.value === '' || ev.target.value < 2) return
  // Creating an Initial Array to Calculate Factorial (1, 2, 3, ...)
  let arrayOfNuber: Array<any> = (() => {
    let result = []
    for (let i = 1; i <= +ev.target.value; i++) {
      if (i > 9) {
        result.push(i.toString().split(''))
      } else result.push([i + ''])
    }
    return result
  })()
  let tempArray = multiplicate(arrayOfNuber[0], arrayOfNuber[1])
  for (let i = 2; i < arrayOfNuber.length; i++) {
    tempArray = multiplicate(tempArray.slice(0), arrayOfNuber[i])
  }
  let resultString = tempArray.reduce((sum, elem) => (sum + elem))
  result3.innerHTML = 'sum of digits: ' + resultString + '</br>' +
    +ev.target.value + '!</br>' +
    tempArray.join('')
}, {})

function sum (arrN1: Array<any>, arrN2: Array<any>) {
  // For correct summation, the first number must be
  // greater than the second, which is what this check does.
  if (arrN1.length < arrN2.length) {
    let temp = arrN1
    arrN1 = arrN2
    arrN2 = temp
  }
  // If the lengths of the arrays are not equal, equalizes them by autocomplete
  if (arrN2.length < arrN1.length) {
    let difference = arrN1.length - arrN2.length
    for (let i = 0; i < difference; i++) {
      arrN2.unshift(0)
    }
  }
  // Since arithmetic calculations start with the least significant
  // digits of numbers, it is necessary to invert the array
  arrN1 = arrN1.slice(0).reverse()
  arrN2 = arrN2.slice(0).reverse()
  let remainder = 0
  let resultArray = []
  for (let i = 0; i < arrN1.length; i++) {
    let number = +arrN1[i] + +arrN2[i] + remainder
    if (number > 9) {
      remainder = 1
      resultArray.unshift(number - 10)
    } else {
      remainder = 0
      resultArray.unshift(number)
    }
    if (i === arrN1.length - 1 && remainder === 1) resultArray.unshift(1)
  }
  return resultArray
}

function multiplicate (arrN1: Array<string | number>, arrN2: Array<string | number>) {
  let resultArray = []
  let tempArray = []
  let remainder = 0
  arrN1 = arrN1.slice(0).reverse()
  arrN2 = arrN2.slice(0).reverse()
  for (let j = 0; j < arrN2.length; j++) {
    remainder = 0
    for (let i = 0; i < arrN1.length; i++) {
      let number = +arrN2[j] * +arrN1[i] + +remainder
      if (number < 10) {
        tempArray.unshift(number)
        remainder = 0
      } else {
        remainder = Math.trunc(number / 10)
        tempArray.unshift(number - remainder * 10)
        if (i === arrN1.length - 1) tempArray.unshift(remainder)
      }
    }
    resultArray.push(tempArray.slice(0))
    tempArray = []
  }
  let coefficient = 0
  let result = resultArray[0]
  resultArray.forEach((elem) => {
    for (let i = 0; i < coefficient; i++) {
      elem.push(0)
    }
    coefficient++
  })
  for (let i = 1; i < resultArray.length; i++) {
    result = sum(result, resultArray[i])
  }
  return result
}