let alluestions =() => {
    token = localStorage.getItem('token')
    
    currentoken = "Bearer " + token
    fetch('http://127.0.0.1:5000/api/v1/questions', {

        method: 'GET',
        
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization':currentoken
        }
    }).then(response => response.json())
    .then(data => {
        if(data.msg ==="Token has expired"){
            localStorage.clear()
            window.location.replace("index.html");
        }
        let all_questions = data.All_Questions;
        let questions = '';
        for(let counter = 0; counter< all_questions.length; counter++){
            
            let q_id = all_questions[counter]["question_id"];
            let title = all_questions[counter]["title"];
            let description = all_questions[counter]["description"];
            let date = all_questions[counter]["date posted"];

            let datearray = date.split(".")[0]
            let datepart=datearray.split(" ")[0]
            let timepart = datearray.split(" ")[1] 

            questions += `<p><h2><a onclick="setSingleQuestionId(${q_id})">${title}</a></h2></p>
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
    localStorage.setItem("question_id",id);
    window.location.replace("./answerq.html");
} 

// ---------------------------------------------------------------------------------------------------------
//

let qetSingleQuestion =()=>{
    let id = localStorage.getItem("question_id");
    if (id === null){
        return window.location.replace("./home.html");
    }

    let url='http://127.0.0.1:5000/api/v1/questions/'+id;
    token = localStorage.getItem('token')
    
    currentoken = "Bearer " + token
    fetch(url, {

        method: 'GET',
        
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization':currentoken
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
            document.getElementById("qst_part").innerHTML=question
        }
        let answers = "";
        if (data.answers){
             data.answers.forEach(element => {
                console.log(element['answer'])
                console.log(element['answer_id'])
                console.log(element['preffered'])
                console.log(element['up_vote'])
                console.log(element['down_vote'])

                answers +=`
                <p><i>${element['answer']}</i></p>
            `
            });
            document.getElementById("ans_to_qst").innerHTML=answers
           
        }
    }).catch((error) => {
        console.log("there was an error ",error)
    });



}

