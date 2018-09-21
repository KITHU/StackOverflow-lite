const allUserQuestions = () => {
  signedIn();
  token = localStorage.getItem("token");

  currentToken = "Bearer " + token;
  fetch("https://stackoverflow-lite-apiv1.herokuapp.com/api/v1/questions", {
    method: "GET",

    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: currentToken
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.msg === "Token has expired") {
        localStorage.clear();
        window.location.replace("index.html");
      }
      let allQuestions = data.All_Questions;
      let questions = "";
      for (let counter = allQuestions.length - 1; counter >= 0; counter--) {
        let questionId = allQuestions[counter]["question_id"];
        let userId = allQuestions[counter]["user_id"];
        let title = allQuestions[counter]["title"];
        let description = allQuestions[counter]["description"];
        let date = allQuestions[counter]["date posted"];

        let datearray = date.split(".")[0];
        let datepart = datearray.split(" ")[0];
        let timepart = datearray.split(" ")[1];

        questions += `<p><h2><a onclick="setSingleQuestionId(${questionId})">${title}</a></h2></p>
                    <p><b><i>${description}</i></b></p>
                    <p><span>posted on:</span>
                       ${datepart}
                    <span>at</span>
                    ${timepart}
                    <span>by</span>demo
                    <span id="delete" onclick="deleteQuestion(${questionId})">&#9986;</span>
                          <hr>`;
        // if (userId == localStorage.getItem("userId")) {
        //   deleteDev = document.getElementById("delete");
        //   deleteDev.style.display = "block";
        //   document.getElementById("delete").innerHTML = "james";
        // }
      }

      document.getElementById("questionDisplay").innerHTML = questions;
    })
    .catch(error => {
      console.log("there was an error ", error);
    });
};

let deleteQuestion = (id, userid) => {
  signedIn();
  let cm = confirm("Are you sure you want to delete?");
  if (cm) {
    const token = localStorage.getItem("token");
    currentToken = `Bearer ${token}`;
    fetch(
      "https://stackoverflow-lite-apiv1.herokuapp.com/api/v1/questions/" + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: currentToken
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        window.location.reload();
      })
      .catch(error => {
        console.log("there was an error ", error);
      });
  }
};

// ---------------------------------------------------------------------------------------------------------
//

let setSingleQuestionId = id => {
  localStorage.setItem("questionId", id);
  window.location.replace("./answerq.html");
};

// ---------------------------------------------------------------------------------------------------------
// get single question an all answers available

let getSingleQuestion = () => {
  let id = localStorage.getItem("questionId");
  if (id === null) {
    return window.location.replace("./home.html");
  }

  let url =
    "https://stackoverflow-lite-apiv1.herokuapp.com/api/v1/questions/" + id;
  token = localStorage.getItem("token");

  currentToken = "Bearer " + token;
  fetch(url, {
    method: "GET",

    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: currentToken
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.msg === "Token has expired") {
        localStorage.clear();
        window.location.replace("index.html");
      }
      if (data.question) {
        data.question["title"];
        let question = `
                <h3><b>${data.question["title"]}</b></h3>
                <p>${data.question["description"]}</p>
            `;
        document.getElementById("qnPart").innerHTML = question;
      }
      let answers = "";
      if (data.answers) {
        console.log(data);
        data.answers.forEach(element => {
          answers += `
                <p>
                <i>${element["answer"]}</i>
                <br>
                <center><a 
                onclick="modifyAnswer(${element["answer_id"]},
                '${element["answer"]}')">edit</a>
                <span>&#128077:${element["up_vote"]}</span>
                <span>&#x1F44E:${element["down_vote"]}</span>
                <span>Preffered:${element["preffered"]}</span></center>
                </p>
                <div id="modifyAnswer">
                <div id="alert-msg" class="alert"></div>
                <textarea id="answer1" name="subject" placeholder="Type your answer here.." style="height:150px"></textarea>
                </textarea>
                <button type="button" onclick="editAnswer()">Edit</button>
                <button type="button" onclick="acceptAnswer()">Accept</button>
                <button type="button" onclick="cancel()">Cancel</button>
                </div>

            `;
        });
        document.getElementById("answerToQuestion").innerHTML = answers;
      }
    })
    .catch(error => {
      console.log("there was an error ", error);
    });
};

//-----------------------------------------------------------------------------------------------------
//post an answer

const postAnswer = () => {
  const answer = document.getElementById("answer").value;
  let id = localStorage.getItem("questionId");
  console.log(id, answer);
  if (id == null) {
    return window.location.replace("./home.html");
  }
  const url =
    "https://stackoverflow-lite-apiv1.herokuapp.com/api/v1/questions/" +
    id +
    "/answers";
  token = localStorage.getItem("token");
  currentToken = "Bearer " + token;

  const data = {
    answer: answer
  };

  fetch(url, {
    method: "POST", // post method

    body: JSON.stringify(data), // data can be `string` or {object}!

    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: currentToken
    }
  })
    .then(response => response.json())

    .then(data => {
      if (data.message === "Your answer was posted successfully") {
        window.location.reload();
      }
      if (data.message) {
        showAlert(data.message);
      }
    })
    .catch(error => {
      console.log("there was an error ", error);
    });
};
// ---------------------------------------------------------------------------------------------------
//  navigator to askquestion page

const goToAskaQuestion = () => {
  window.location.replace("askquestion.html");
  return false;
};

// ---------------------------------------------------------------------------------------------------
// post a question

const postQuestion = () => {
  let title = document.getElementById("topic").value;
  let description = document.getElementById("subject").value;
  let id = localStorage.getItem("questionId");

  const url = "https://stackoverflow-lite-apiv1.herokuapp.com/api/v1/questions";
  token = localStorage.getItem("token");
  currentToken = "Bearer " + token;

  const data = {
    title: title,
    description: description
  };
  console.log(data);
  fetch(url, {
    method: "POST", // post method

    body: JSON.stringify(data), // data can be `string` or {object}!

    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: currentToken
    }
  })
    .then(response => response.json())

    .then(data => {
      if (data.message === "Question created successfully") {
        window.location.replace("home.html");
      }
      if (data.message) {
        showAlert(data.message);
      }
      if (data.error) {
        showAlert(data.error);
      }
    })
    .catch(error => {
      console.log("there was an error ", error);
    });
};

const modifyAnswer = (id, answer) => {
  localStorage.setItem("ansId", id);
  let div = document.getElementById("modifyAnswer");
  document.getElementById("answer1").innerHTML = answer;
  div.style.display = "block";
};
const editAnswer = () => {
  ansId = localStorage.getItem("ansId");
  qnId = localStorage.getItem("questionId");
  let token = localStorage.getItem("token");
  let currentToken = "Bearer " + token;
  modified = document.getElementById("answer1").value;

  const url = `https://stackoverflow-lite-apiv1.herokuapp.com/api/v1/questions/${qnId}/answers/${ansId}`;
  const data = {
    answer: modified
  };

  fetch(url, {
    method: "PUT", // post method

    body: JSON.stringify(data), // data can be `string` or {object}!

    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: currentToken
    }
  })
    .then(response => response.json())

    .then(data => {
      if (data.message === "answer updated sucessfully") {
        window.location.reload();
      }
      if (data.message) {
        showAlert(data.message);
      }
      if (data.error) {
        showAlert(data.error);
      }
    })
    .catch(error => {
      console.log("there was an error ", error);
    });
};

const acceptAnswer = () => {
  ansId = localStorage.getItem("ansId");
  qnId = localStorage.getItem("questionId");
  let token = localStorage.getItem("token");
  let currentToken = "Bearer " + token;

  const url = `https://stackoverflow-lite-apiv1.herokuapp.com/api/v1/questions/${qnId}/answers/${ansId}`;
  const data = {
    preffered: "True"
  };

  fetch(url, {
    method: "PUT", // post method

    body: JSON.stringify(data), // data can be `string` or {object}!

    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: currentToken
    }
  })
    .then(response => response.json())

    .then(data => {
      if (data.message === "answer updated sucessfully") {
        window.location.reload();
      }
      if (data.message) {
        showAlert(data.message);
      }
      if (data.error) {
        showAlert(data.error);
      }
    })
    .catch(error => {
      console.log("there was an error ", error);
    });
};
