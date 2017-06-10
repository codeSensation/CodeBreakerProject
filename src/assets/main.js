let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    if (answer.value === '' || attempt.value === '') {
      setHiddenFields();
    }
    if(!validateInput(input.value)) {
      return false;
    }
    else {
      attempt.value++;
    }

    switch (getResults(input.value)) {
      case true:
        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();
        break;
     case false:
        if(attempt.value >= 10) {
          setMessage('You Lose! :(');
          showAnswer(false);
          showReplay();
          break;
        }
      default:
        setMessage('Incorrect, try again.');
    }
}

function setHiddenFields() {
  answer.value = Math.floor(Math.random()*9999);
  answer.value = answer.value.toString();
  while(answer.value.length < 4) {
    answer.value = '0' + answer.value;
  }
  attempt.value = 0;
}

function setMessage(message) {
  document.getElementById('message').style.visibility = 'visible';
  document.getElementById('message').innerHTML = '<span class="glyphicon glyphicon-info-sign"></span>'+' '+message;
}

function validateInput(input) {
  if(input.length === 4) {
    return true;
  }
  else {
    setMessage('Guesses must be exactly 4 characters long.');
    return false;
  }
}

function getResults(input) {
  document.getElementById('results').style.visibility = 'visible';
  var row = '<div class="row"><span class="col-md-4">'+attempt.value+'.</span><span class="col-md-4">'+input+'</span><div class="col-md-4">';
  var correctCount = 0;
  console.log(answer.value);
  for (var i = 0; i < input.length; i++) {
    if(input[i] === answer.value[i]) {
      row += '<span class="glyphicon glyphicon-ok"></span>'
      correctCount++;
    }
    else if (input[i] === answer.value[0] || input[i] === answer.value[1] || input[i] === answer.value[2] || input[i] === answer.value[3]) {
      row += '<span class="glyphicon glyphicon-transfer"></span>'
    }
    else if (input[i] !== answer.value[0] && input[i] !== answer.value[1] && input[i] !== answer.value[2] && input[i] !== answer.value[3]) {
      row += '<span class="glyphicon glyphicon-remove"></span>'
    }
  }
  document.getElementById('results').innerHTML += row+'</div></div>';
  if(correctCount === 4)  {
    return true;
  }
  else {
    return false;
  }
}

function showAnswer(input) {
  document.getElementById('code').innerHTML = answer.value;
  if(input) {
    document.getElementById('code').innerHTML += ' <span class="glyphicon glyphicon-check"></span>';
    document.getElementById('code').className += ' success';
  }
  else {
    document.getElementById('code').innerHTML += ' <span class="glyphicon glyphicon-remove-sign"></span>';
    document.getElementById('code').className += ' failure';
  }
}

function showReplay() {
  document.getElementById('guessing-div').style.display = 'none';
  document.getElementById('replay-div').style.display = 'block';
}
