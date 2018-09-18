let signup =() => {
    let username = document.getElementById("username").value;
    let email = document.getElementById("signupemail").value;
    let password = document.getElementById("signuppassword").value;
    let url = 'http://127.0.0.1:5000/api/v1/auth/signup';

    let data = {
        username:username,
        email:email,
        password:password
    }

   

    fetch(url,{
        method: 'POST', //post method
            
        body: JSON.stringify(data), // data can be `string` or {object}!

        headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(response => response.json())
        
        .then(data => {
            if(data.message==="user already exists"){
                showAlert("user already exist change credentials")
            }
            
            if(data.error==="invalid username"){
                showAlert("user name must contain atleast a character and be of length 3");
            }

            if(data.error==="invalid email"){
                showAlert("email must be of correct format:exp joe@yahoo.com");
            }

            if(data.error==="invalid password"){
                showAlert("password must be atleast 6 characters long and contain\
                 upper case and lower case letters ");
            }
            if(data.message==="Account created"){
                location.reload();
            }
        }).catch((error) => {
            showAlert("there was an error ",error)
        });
    }


let login =() => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let url = 'http://127.0.0.1:5000/api/v1/auth/login';

    let data = {
        email:email,
        password:password
    }
    console.log(data)

    fetch(url,{
        method: 'POST', //post method
            
        body: JSON.stringify(data), // data can be `string` or {object}!

        headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(response => response.json())
        
        .then(data => {
            if(data.error==="wrong email address"){
                showAlert("wrong email andress")
            }
            
            if(data.error==="invalid login credentials"){
                showAlert("wrong email and password");
            }

            if(data.error==="wrong password"){
                showAlert("wrong password");
            }

            if(data.error==="invalid email"){
                showAlert("email must be of correct format:exp joe@yahoo.com");
            }

            if(data.error==="invalid password:check length"){
                showAlert("password must be atleast 6 characters long and contain\
                 upper case and lower case letters ");
            }

            if(data.message==="login successful"){
                localStorage.clear()
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('user', data.username);
                window.location.replace("./home.html");
            }
        }).catch((error) => {
            showAlert("there was an error")
        });
    }
// logout function
    let logout =() => {
        localStorage.clear();
        window.location.reload(true);
    };
