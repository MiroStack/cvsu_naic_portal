document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("settingsForm").addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission
    
        const form = event.target; // Correct reference to the form
        const userData = JSON.parse(localStorage.getItem('user')); // Get logged-in user data
        const formData = new FormData(form);
        
        const data = {
            newUsername: formData.get("newUsername"),
            newPassword: formData.get("password"),
            confirmPassword: formData.get("confirmPassword")
        };

        if (data.newPassword !== data.confirmPassword) {
            alert("Passwords do not match.");
        } else if (data.newUsername.length < 5) {
            alert("Username must be at least 5 characters.");
        } else {
            const queryParams = new URLSearchParams({
                username: data.newUsername,
                password: data.newPassword,
                id: userData.id
            });

            try {
                const response = await fetch(`http://localhost:8080/cvsu/editAccount?${queryParams}`, {
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
                    window.parent.postMessage({ action: "updateIframe", page: "logout" }, "*");

                } else {
                    const errorData = await response.json();
                    alert(errorData.message);
                }
            } catch (e) {
                alert("Error updating account: " + e.message);
            }
        }
    });
});
