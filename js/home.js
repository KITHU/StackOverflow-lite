let allQuestions =() => {
    token = localStorage.getItem('token')
    
    currentToken = "Bearer " + token
    fetch('https://stackoverflow-lite-apiv1.herokuapp.com/api/v1/questions', {

        method: 'GET',
        
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization':currentToken
        }
    }).then(response => response.json())
    .then(data => {
        if(data.msg ==="Token has expired"){
            localStorage.clear()
            window.location.replace("index.html");
        }
        let allQuestions = data.All_Questions;
        console.log(allQuestions);
        let questions = '';
        for(let counter = (allQuestions.length)-1; counter>=0; counter--){
            let questionId = allQuestions[counter]["question_id"];
            let title = allQuestions[counter]["title"];
            let description = allQuestions[counter]["description"];
            let date = allQuestions[counter]["date posted"];

            let datearray = date.split(".")[0]
            let datepart=datearray.split(" ")[0]
            let timepart = datearray.split(" ")[1] 

            questions += `<p><h2><a onclick="setSingleQuestionId(${questionId})">${title}</a></h2></p>
                    <p><b><i>  ${description}</i></b></p>
                    <p> <span>posted on:</span>
                       ${datepart}
                    <span>at</span>
                    ${timepart}
                    <span>by</span>
                          demo <hr>`;
        }

        document.getElementById("questionDisplay").innerHTML = questions;

    }).catch((error) => {
        console.log("there was an error ",error)
    });

}

// ---------------------------------------------------------------------------------------------------------
//

let setSingleQuestionId=(id)=>{
    localStorage.setItem("questionId",id);
    window.location.replace("./answerq.html");
} 

// ---------------------------------------------------------------------------------------------------------
// get single question an all answers available

let getSingleQuestion =()=>{
    let id = localStorage.getItem("questionId");
    if (id === null){
        return window.location.replace("./home.html");
    }

    let url='https://stackoverflow-lite-apiv1.herokuapp.com/api/v1/questions/'+id;
    token = localStorage.getItem('token')
    
    currentToken = "Bearer " + token
    fetch(url, {

        method: 'GET',
        
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization':currentToken
        }
    }).then(response => response.json())
    .then(data => {
        if(data.msg ==="Token has expired"){
            localStorage.clear()
            window.location.replace("index.html");
        }
        if (data.question){
            data.question["title"]
            let question =`
                <h3><b>${data.question["title"]}</b></h3>
                <p>${data.question["description"]}</p>
            `
            document.getElementById("qnPart").innerHTML=question
        }
        let answers = "";
        if (data.answers){
             data.answers.forEach(element => {
                answers +=`
                <p><i>${element['answer']}</i></p>
            `
            });
            document.getElementById("answerToQuestion").innerHTML=answers
        }
    }).catch((error) => {
        console.log("there was an error ",error)
    });
}

//-----------------------------------------------------------------------------------------------------
//post an answer

const postAnswer = () => {
    const answer = document.getElementById('answer').value;
    let id = localStorage.getItem("questionId");
    if (id === null){
        return window.location.replace("./home.html");
    }
    const url = 'https://stackoverflow-lite-apiv1.herokuapp.com/api/v1/questions/'+id+'/answers';
    token = localStorage.getItem('token');
    currentToken = "Bearer " + token
  
    const data = {
      answer:answer
    };
  
  
    fetch(url, {
      method: 'POST', // post method
  
      body: JSON.stringify(data), // data can be `string` or {object}!
  
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization':currentToken
      },
    }).then(response => response.json())
  
      .then((data) => {
        if (data.message==="Your answer was posted successfully") {
            window.location.reload();
        } 
        if(data.message){
            console.log(data.message)
        }
        
      }).catch((error) => {
        console.log('there was an error ', error);
      });
  };
// ---------------------------------------------------------------------------------------------------
//  navigator to askquestion page

const goToAskaQuestion = () =>{
    window.location.replace("askquestion.html")
    return false;
}

// ---------------------------------------------------------------------------------------------------
// post a question

const postQuestion = () => {
    let title = document.getElementById('topic').value;
    let description = document.getElementById('subject').value;
    let id = localStorage.getItem("questionId");
    if (id === null){
        return window.location.replace("./home.html");
    }
    const url = 'https://stackoverflow-lite-apiv1.herokuapp.com/api/v1/questions';
    token = localStorage.getItem('token');
    currentToken = "Bearer " + token
  
    const data = {
      title:title,
      description:description
    };
  
  
    fetch(url, {
      method: 'POST', // post method
  
      body: JSON.stringify(data), // data can be `string` or {object}!
  
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization':currentToken
      },
    }).then(response => response.json())
  
      .then((data) => {
        if (data.message==="Question created successfully") {
            window.location.replace("home.html");
        } 
        if(data.message){
            console.log(data.message)
        }
        if(data.error){
            console.log(data.error)
        }
        
      }).catch((error) => {
        console.log('there was an error ', error);
      });
  };

  

