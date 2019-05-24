const url = document.getElementById("site-url").content;

const formUser = document.getElementById("form_create_user")
const inputName = document.getElementById("user-create-name");
const inputLastName = document.getElementById("user-create-lastname");
const inputCity = document.getElementById("user-create-city");
const inputEmail = document.getElementById("user-create-email");
const inputPassword = document.getElementById("user-create-password");

function sendUserToBDD(e) {
  console.log(e);
  e.preventDefault();
  axios
    .post(url + "/dashboard/user/register", {
      name: inputName.value,
      lastname: inputLastName.value,
      email: inputEmail.value,
      city: inputCity.value,
      password: inputPassword.value
    })
    .then(res => {
      console.log(res);
      if (res.data.status === "success") window.location.replace(url + "/login");
    })
    .catch(err => console.log(err));
}

console.log("hello", formUser);

formUser.onsubmit = sendUserToBDD;
