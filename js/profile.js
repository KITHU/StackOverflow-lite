const userQuestions = () => {
  signedIn();
  const token = localStorage.getItem("token");
  currentToken = `Bearer ${token}`;
  fetch(
    "https://stackoverflow-lite-apiv1.herokuapp.com/api/v1/questions/userquestions",
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: currentToken
      }
    }
  )
    .then(response => response.json())
    .then(data => {
      if (data.msg === "Token has expired") {
        localStorage.clear();
        window.location.replace("index.html");
      }
      document.getElementById("userQnCount").innerHTML = data.total_questions;
    })
    .catch(error => {
      console.log("there was an error ", error);
    });
};

let loadRecent = () => {
  signedIn();
  const token = localStorage.getItem("token");
  currentToken = `Bearer ${token}`;
  fetch(
    "https://stackoverflow-lite-apiv1.herokuapp.com/api/v1/questions/userquestions",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: currentToken
      }
    }
  )
    .then(response => response.json())
    .then(data => {
      if (data.msg === "Token has expired") {
        localStorage.clear();
        window.location.replace("index.html");
      }
      question = "";
      if (data.questions.length > 0) {
        for (let counter = data.questions.length - 1; counter >= 0; counter--) {
          let title = data.questions[counter]["title"];
          let qnId = data.questions[counter]["question_id"];
          let description = data.questions[counter]["description"];
          question += `<p>${title}</p>
                        <p>${description}</p>
                        <center><a onclick="deleteQuestion(${qnId})"><i>delete</i></a></center>
                         <hr>`;
        }
        document.getElementById("questionsdashboard").innerHTML = question;
      } else {
        document.getElementById("questionsdashboard").innerHTML =
          "No questions to display";
      }
    })
    .catch(error => {
      console.log("There was an error ", error);
    });
};

let deleteQuestion = id => {
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

let loadMostAnswered = () => {
  document.getElementById("questionsdashboard").innerHTML = "coming soon!";
};
