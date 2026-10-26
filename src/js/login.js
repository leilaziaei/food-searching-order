
// show notification

function showNotification(message, type = "success") {
  const notification = document.querySelector("#notification");
  console.log("Notification:", notification);

  notification.innerHTML = message;
  notification.className = type === "error" ? "show error" : "show";

  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}




document
  .querySelector("#loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // console.log("SUBMIT CLICKED");

    // get user name and password
    const userName = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    // console.log("username:", userName);
    // console.log("password:", password);

    // get users from local storage ***
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // console.log("users:", users);


    const existUser = users.find(
      (user) => user.userName === userName && user.password === password,
    );

    // console.log("existUser:", existUser);

    // check and notification ***
    if (existUser) {
      const token = btoa(
        JSON.stringify({
          userName,
          exp: Date.now() + 86400000,
        }),
      );
      // console.log("token:", token);

      localStorage.setItem("token", token);
      localStorage.setItem("loggedUser", userName);
      showNotification("ورود با موفقیت انجام شد!");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    
    }else {
      showNotification("نام کاربری یا رمز عبور اشتباه است!", "error");
    }
  });
