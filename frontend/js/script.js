document.addEventListener("DOMContentLoaded", function () {
    fetch("sidebar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("sidebar-container").innerHTML = data;

            // Ensure event listeners and links work after sidebar loads
            setTimeout(() => {
                initSidebar();
                activateLinks(); // Initialize sidebar links
            }, 100);
        })
        .catch(error => console.error("Error loading sidebar:", error));

    function initSidebar() {
        let sidebar = document.querySelector(".sidebar");
        let closeBtn = document.querySelector("#btn");
        let searchBtn = document.querySelector(".bx-search");
        let tableContainer = document.querySelector(".table-container");

        if (!sidebar || !closeBtn || !searchBtn) {
            console.error("Sidebar elements not found after loading!");
            return;
        }

        closeBtn.addEventListener("click", () => {
            sidebar.classList.toggle("open");
            menuBtnChange();
            adjustTableWidth();
        });

        searchBtn.addEventListener("click", () => {
            sidebar.classList.toggle("open");
            menuBtnChange();
            adjustTableWidth();
        });

        function menuBtnChange() {
            if (sidebar.classList.contains("open")) {
                closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
            } else {
                closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
            }
        }

        function adjustTableWidth() {
            if (tableContainer) {
                if (sidebar.classList.contains("open")) {
                    tableContainer.style.marginLeft = "250px"; // Expanded sidebar
                    tableContainer.style.width = "calc(100% - 250px)";
                } else {
                    tableContainer.style.marginLeft = "78px"; // Collapsed sidebar
                    tableContainer.style.width = "calc(100% - 78px)";
                }
            }
        }

        adjustTableWidth(); // Ensure correct initial width
        menuBtnChange();
    }

    function activateLinks() {
        const links = document.querySelectorAll(".nav-list a");
        if (links.length === 0) {
            console.error("Sidebar links not found!");
            return;
        }

        links.forEach(link => {
            link.addEventListener("click", (event) => {
                console.log("Navigating to:", link.href);
            });
        });
    }
});
