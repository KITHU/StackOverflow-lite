const signup = () => {
  const username = document.getElementById("username").value;
  const email = document.getElementById("signupemail").value;
  const password = document.getElementById("signuppassword").value;
  const url =
    "https://stackoverflow-lite-apiv1.herokuapp.com/api/v1/auth/signup";

  const data = {
    username,
    email,
    password
  };

  fetch(url, {
    method: "POST", // post method

    body: JSON.stringify(data), // data can be `string` or {object}!

    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  })
    .then(response => response.json())

    .then(res => {
      if (res.message === "Account created") {
        window.location.reload();
      }
      if (res.message) {
        showAlert(res.message);
      }

      if (res.error) {
        showAlert(res.error);
      }
    })
    .catch(error => {
      showAlert("there was an error ", error);
    });
};

const login = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const url =
    "https://stackoverflow-lite-apiv1.herokuapp.com/api/v1/auth/login";

  const data = {
    email,
    password
  };

  fetch(url, {
    method: "POST", // post method

    body: JSON.stringify(data), // data can be `string` or {object}!

    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  })
    .then(response => response.json())

    .then(res => {
      if (res.error) {
        showAlert(res.error);
      }

      if (res.message === "login successful") {
        localStorage.clear();
        localStorage.setItem("token", res.access_token);
        localStorage.setItem("userId",res.userid)
        localStorage.setItem("user", res.username);
        window.location.replace("./home.html");
      }
    })
    .catch(error => {
      showAlert("There was an error", error);
    });
};
