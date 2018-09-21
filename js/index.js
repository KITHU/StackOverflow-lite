let showAlert = msg => {
  let alertDiv = document.getElementById("alert-msg");
  alertDiv.style.display = "block";
  alertDiv.innerHTML = msg; // show error message in alert box
  setTimeout(() => (alertDiv.style.display = "none"), 7000); // remove alert message after a while
};

const logout = () => {
  localStorage.clear();
  window.location.replace("index.html");
};

const signedIn = () => {
  if (localStorage.getItem("token") === null) {
    window.location.replace("index.html");
  }
};

const cancel = () => {
  window.location.reload();
};
