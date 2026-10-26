
// show notification
function showNotification(massage, type = "success") {
  const notification = document.querySelector("#notification");
  console.log("Notification:", notification);

  notification.innerHTML = massage;
  notification.className = type === "error" ? "show error" : "show";

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// register
document
  .querySelector("#registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // console.log("SUBMIT CLICKED");

    // get user name and password***
    let userName = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    // console.log("username:", userName);
    // console.log("password:", password);


    // get users from local storage ***

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // console.log("users:", users);


    const existUser = users.find((user) => user.userName === userName);

    // console.log("existUser:", existUser);

    // check and notification***
    if (existUser) {
      showNotification("این نام کاربری قبلا ثبت شده است", "error");
      return;
    }

    users.push({ userName, password });
    localStorage.setItem("users", JSON.stringify(users));

    showNotification("ثبت نام با موفقیت انجام شد");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 3000);
  });
