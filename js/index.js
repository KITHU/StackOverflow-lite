/**
 * Show alerts to users
 */
let showAlert = msg => {
  let alertDiv = document.getElementById("alert-msg");
  alertDiv.style.display = "block";
  alertDiv.innerHTML = msg; // show error message in alert box
  setTimeout(() => (alertDiv.style.display = "none"), 7000); // remove alert message after a while
};

// /**
//  * Set greeting with first name
//  */
// let setUsername = () => {
//     if(localStorage.getItem('full_name') === null) {
//         document.getElementById('greeting').innerHTML = "";
//         document.getElementById('logout').style.display = "none";
//         // not logged in therefore, go home to login
//         if(!window.location.pathname.includes("index.html"))
//             window.location.replace('index.html');
//     } else {
//         document.getElementById('greeting').innerHTML = "Hello, " + localStorage.getItem('full_name').split(" ")[0];
//     }
// }

const logout = () => {
  localStorage.clear();
  window.location.replace("index.html");
};

const signedIn = () => {
  if (localStorage.getItem("token") === null) {
    window.location.replace("index.html");
  }
};
