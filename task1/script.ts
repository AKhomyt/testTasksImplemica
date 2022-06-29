let enter = document.querySelector('#inputT1')!
let result: any = document.querySelector('#resultT1')!

// The number of correct bracket sequences corresponds to
// the Catalan numbers 2n!/(n!*(n + 1)!) from which we take the answer
// https://en.wikipedia.org/wiki/Catalan_number#:~:text=In%20combinatorial%20mathematics%2C%20the%20Catalan,Catalan%20(1814%E2%80%931894).
enter.addEventListener('input', (ev: any)=> {
  if (isNaN(+ev.target.value) || ev.target.value === ''){
    result.style.cssText = 'color: red'
  } else {
    result.style.cssText = 'color: #000'
    let n = +ev.target.value
    result.innerHTML = factorial(2*n) / (factorial(n) * factorial(n + 1)) + ' combinations'
  }
}, {})
function factorial (numb: number): number {
  if (numb === 1) return 1
  return numb * factorial(numb - 1)
}