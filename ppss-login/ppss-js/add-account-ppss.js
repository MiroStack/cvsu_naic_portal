document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("add_account_form").addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission
    
        const form = event.target; // Correct reference to the form
        const userData = JSON.parse(localStorage.getItem('user')); // Get logged-in user data
        const formData = new FormData(form);
        
        const data = {
            firstname: formData.get("firstname"),
            middlename: formData.get("middlename"),
            lastname: formData.get("lastname"),
            username: formData.get("username"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirm_password"),
            canCreateAccount: formData.get("allowCreateUser"),
        };

       if(data.password === data.confirmPassword){
        const queryParams = new URLSearchParams({
            firstname: data.firstname,
            middlename: data.middlename,
            lastname: data.lastname,
            username: data.username,
            password: data.password,
            canCreateAccount: data.canCreateAccount,
            createdById: userData.id
        });
        console.log(queryParams);

        try {
            const response = await fetch(`http://localhost:8080/cvsu/addAccount?${queryParams}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                form.reset();
                
                // Store the new page in localStorage
                localStorage.setItem("currentPage", "dashboard");

                // 🔥 Send a message to the parent window (main.html)
                window.parent.postMessage({ action: "updateIframe", page: "dashboard" }, "*");

            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (e) {
            alert("Error occured: " + e.message);
        }
       }
       else{
              alert("Password does not match");
       }
    });
});
