let formula = [];
let result = 0;

$('button').click((e) => {
  $('#display').text('');
  let value = e.target.innerText;

  if (value !== 'C') {
    formula.push(value);
  }

  if (value === '.') {
    $('#decimal').prop('disabled', true);
  }

  $('#display').text(formula.join(''));

  if (value === '+' || value === '-' || value === '*' || value === '/' || value === '=') {
    $('#decimal').prop('disabled', false);
    $('#display').text('');
  }

  if (formula.join('').match(/^0{1}/)) {
    $('#zero').prop('disabled', true);
  } else {
    $('#zero').prop('disabled', false);
  }

})

$('#clear').click(() => {
  formula = [];
  result = 0;
  $('#display').text('0');
})


$('#equals').click(() => {
  formula.pop();
  let formulaToEvaluate = formula.join('');
  const operatorSeq = formulaToEvaluate.match(/[+/*-]{2,}/g);
  if (operatorSeq) {
    for (let i = 0; i < operatorSeq.length; i++) {
      if (operatorSeq[i][operatorSeq[i].length - 1] === '-' && operatorSeq[i][operatorSeq[i].length - 2] !== '-') {
        formulaToEvaluate = formulaToEvaluate.replace(operatorSeq[i], operatorSeq[i].slice(operatorSeq[i].length - 2, operatorSeq[i].length));
        console.log(formulaToEvaluate);
      } else {
        formulaToEvaluate = formulaToEvaluate.replace(operatorSeq[i], operatorSeq[i].slice(operatorSeq[i].length - 1));
      }
    }
  }
  if (formulaToEvaluate[0] === '*') {
    formulaToEvaluate = formulaToEvaluate.slice(1);
    result *= eval(formulaToEvaluate);
  } else if (formulaToEvaluate[0] === '/') {
    formulaToEvaluate = formulaToEvaluate.slice(1);
    result /= eval(formulaToEvaluate);
  } else if (formulaToEvaluate[0] === '-') {
    formulaToEvaluate = formulaToEvaluate.slice(1);
    result -= eval(formulaToEvaluate);
  } else {
    result += eval(formulaToEvaluate);
  }
  formula = [];
  $('#display').text(result);
})