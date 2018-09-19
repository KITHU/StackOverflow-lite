const userQuestions = () => {
  const token = localStorage.getItem('token');

  currentToken = `Bearer ${token}`;
  fetch('https://stackoverflow-lite-apiv1.herokuapp.com/api/v1/questions/userquestions', {

    method: 'GET',

    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: currentToken,
    },
  }).then(response => response.json())
    .then((data) => {
      if (data.msg === 'Token has expired') {
        localStorage.clear();
        window.location.replace('index.html');
      }
     document.getElementById("userQnCount").innerHTML=data.total_questions
    }).catch((error) => {
      console.log('there was an error ', error)
    });
};

function loadRecent(){
  const token = localStorage.getItem('token');
  currentToken = `Bearer ${token}`;
  fetch('https://stackoverflow-lite-apiv1.herokuapp.com/api/v1/questions/userquestions', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: currentToken,
    },
  }).then(response => response.json())
    .then((data) => {
      if (data.msg === 'Token has expired') {
        localStorage.clear();
        window.location.replace('index.html');
      }
    question = '';
    console.log(typeof(data.questions.length))
    for (let counter=(data.questions.length)-1;counter>=0;counter--){
           let  title = data.questions[counter]["title"];
           let  qnId = data.questions[counter]["question_id"];
           let  description = data.questions[counter]["description"];
           question += `<p>${title}</p>
                         <p>${description}</p><hr>`;
        }
        document.getElementById("questionsdashboard").innerHTML=question
    }).catch((error) => {
      console.log('there was an error ', error)
    });
}

function loadMostAnswered(){
    console.log('james');
}


