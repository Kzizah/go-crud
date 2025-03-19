const API_URL = "http://localhost:8080/categories"; // Adjust if needed

let currentPage = 1;
let itemsPerPage = 10;

// Fetch and display categories
async function fetchCategories() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch categories");

        const categories = await response.json();
        const tableBody = document.getElementById("category-table");
        tableBody.innerHTML = "";

        categories.forEach(category => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${category.ID}</td>
                <td>${category.name}</td>
                <td>
                    <button onclick="openViewModal(${category.ID})">View</button>
                    <button onclick="openEditModal(${category.ID}, '${category.name}')">Edit</button>
                    <button onclick="deleteCategory(${category.ID})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

// Add a new category
document.getElementById("addCategoryForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const name = document.getElementById("categoryName").value;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        });

        if (!response.ok) throw new Error("Failed to add category");

        document.getElementById("categoryName").value = "";
        closeModal('addCategoryModal');
        fetchCategories(currentPage, itemsPerPage);
    } catch (error) {
        console.error("Error:", error);
    }
});

// Open edit category modal
function openEditModal(id, name) {
    document.getElementById("editCategoryId").value = id;
    document.getElementById("editCategoryName").value = name;
    openModal("editCategoryModal");
}

// Update category
document.getElementById("editCategoryForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const id = document.getElementById("editCategoryId").value;
    const name = document.getElementById("editCategoryName").value;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        });

        if (!response.ok) throw new Error("Failed to update category");

        closeModal('editCategoryModal');
        fetchCategories(currentPage, itemsPerPage);
    } catch (error) {
        console.error("Error:", error);
    }
});

// Delete category
async function deleteCategory(id) {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

        if (!response.ok) throw new Error("Failed to delete category");

        fetchCategories(currentPage, itemsPerPage);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Open view category modal
async function openViewModal(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch category");

        const category = await response.json();
        document.getElementById("view-category-id").value = category.ID;
        document.getElementById("view-category-name").value = category.name;
        openModal("viewCategoryModal");
    } catch (error) {
        console.error("Error:", error);
    }
}

// Modal Controls
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Load categories on page load
document.addEventListener("DOMContentLoaded", () => fetchCategories());
