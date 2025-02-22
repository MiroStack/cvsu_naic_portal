// 📌 menuHandler.js
export function updateIframe(page) {
    const iframe = document.querySelector("iframe"); // Get iframe from the main page
    if (!iframe) {
        console.log("❌ No iframe found");
        return;
    }

    switch (page) {
        case "dashboard":
            iframe.src = "../ppss-login/dashboard-ppss.html";
            break;
        case "edit":
            iframe.src = "../ppss-login/edit.html";
            break;
        case "add_account":
            iframe.src = "../ppss-login/add_account.html";
            break;
        case "settings":
            iframe.src = "../ppss-login/settings.html";
            break;
        case "logout":
            console.log("🚪 Logging out...");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/ppss-login/ppss-login.html";
            return;
        default:
            console.log("⚠️ Unknown page:", page);
            return;
    }
}

// 🚀 Load stored page from localStorage on page load
export function loadPageFromStorage() {
    const storedPage = localStorage.getItem("currentPage") || "dashboard"; // Default to dashboard
    updateIframe(storedPage); // Call updateIframe
}

// 📌 Function to handle navigation click events
export function handleNavigation() {
    const nav = document.querySelector(".nav");
    if (!nav) {
        console.log("❌ Navigation menu not found");
        return;
    }

    nav.addEventListener("click", (e) => {
        const listItem = e.target.closest(".list"); // Get the closest `.list` element
        if (listItem) {
            console.log(`📌 Clicked: ${listItem.id}`);

            document.querySelectorAll(".list").forEach((item) => {
                item.classList.remove("active-page");
            });

            // 🔄 Store current page in localStorage
            localStorage.setItem("currentPage", listItem.id);

            // 🌟 Update iframe source dynamically
            updateIframe(listItem.id);

            // ✅ Add 'active-page' class to the clicked item
            listItem.classList.add("active-page");
        }
    });
}
