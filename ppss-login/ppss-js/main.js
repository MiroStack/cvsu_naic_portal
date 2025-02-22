import { loadPageFromStorage, handleNavigation, updateIframe } from "./menuHandler.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM fully loaded");

    const menuBtn = document.querySelector(".menu-icon");
    const sideMenuCtn = document.querySelector(".custom-container");
    const iframe = document.querySelector("iframe");

    // 🏆 Menu toggle functionality
    if (menuBtn && sideMenuCtn) {
        console.log("✅ Menu button found");

        menuBtn.addEventListener("click", () => {
            const isMenuOpen = menuBtn.classList.contains("open-menu");
            const isSidebarOpen = sideMenuCtn.classList.contains("side-bar-open");

            console.log("🔄 Toggling states -> Menu:", isMenuOpen, "| Sidebar:", isSidebarOpen);

            // Toggle menu button state
            menuBtn.classList.toggle("open-menu", !isMenuOpen);
            menuBtn.classList.toggle("close-menu", isMenuOpen);

            // Toggle sidebar state
            sideMenuCtn.classList.toggle("side-bar-open", !isSidebarOpen);
            sideMenuCtn.classList.toggle("side-bar-close", isSidebarOpen);
        });
    } else {
        console.log("❌ Menu button or sidebar container not found");
    }

    // 🏆 Navigation click event
    const nav = document.querySelector(".nav");
    if (nav) {
        nav.addEventListener("click", (e) => {
            const listItem = e.target.closest(".list"); // Get the closest `.list` element
            if (listItem) {
                console.log(`📌 Clicked: ${listItem.id}`);

                document.querySelectorAll(".list").forEach((item) => {
                    item.classList.remove("active-page");
                });

                // 🔄 Store current page in localStorage
                localStorage.setItem("currentPage", listItem.id);

                // Load the page based on localStorage
                loadPageFromStorage();
                handleNavigation();

                // ✅ Add 'active-page' class to the clicked item
                listItem.classList.add("active-page");
            }
        });
    } else {
        console.log("❌ Navigation menu not found");
    }

    // 🟢 ✅ ADD MESSAGE LISTENER FOR IFRAME UPDATES
    window.addEventListener("message", (event) => {
        if (event.data.action === "updateIframe") {
            console.log("🔄 Updating iframe from settings.js:", event.data.page);

            // ✅ Update Active Page in Navigation
            document.querySelectorAll(".list").forEach((item) => {
                item.classList.remove("active-page");
            });

            const activeItem = document.getElementById(event.data.page);
            if (activeItem) {
                activeItem.classList.add("active-page");
                console.log(`🎯 Set active page: ${event.data.page}`);
            } else {
                console.warn(`⚠️ No navigation item found for: ${event.data.page}`);
            }

            // 🔄 Save in localStorage
            localStorage.setItem("currentPage", event.data.page);

            // ✅ Update iframe source
            if (iframe) {
                updateIframe(event.data.page);
            } else {
                console.error("❌ No iframe found in main.html");
            }
        }
    });

    // Load initial page
    loadPageFromStorage();
});
