const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.querySelector("#register");
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const username = document.getElementById("username");
const password = document.getElementById("password");

// Redirect if already logged in
if (localStorage.getItem("token") !== null) {
    window.location.href = "/ppss-login/ppss_main.html";
}

// Initial form state
document.addEventListener("DOMContentLoaded", () => {
    loginForm.style.left = "50%";
    loginForm.style.opacity = 1;
    registerForm.style.left = "-50%";
    registerForm.style.opacity = 0;
});


loginBtn.addEventListener("click", () => {
    loginBtn.style.backgroundColor = "#0a5d00";
    registerBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    loginForm.style.left = "50%";
    registerForm.style.left = "-50%";
    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;
});

// **Login Handler**
document.getElementById("loginBtn").addEventListener("click", async () => {
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue === "" || passwordValue === "") {
        alert("Please fill in all fields");
        return;
    }

    console.log(typeof jQuery !== "undefined" ? "jQuery is loaded" : "jQuery is not loaded");

    try {
        const response = await fetch(`http://localhost:8080/cvsu/login?username=${usernameValue}&password=${passwordValue}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            const data = await response.text();
            console.log("Login Successful:", data);
            localStorage.setItem("token", JSON.stringify(data));
            localStorage.setItem("currentPage", "dashboard");
            window.location.href = "/ppss-login/ppss_main.html";
       
        } else {
            alert("Invalid username or password");
        }
    } catch (error) {
        console.error("Login failed:", error);
        alert("Something went wrong. Try again later.");
    }
});

// Prevent back navigation after login
document.addEventListener("DOMContentLoaded", function () {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.pushState(null, null, location.href);
    };
});
