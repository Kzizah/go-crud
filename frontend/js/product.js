const PRODUCT_API_URL = "http://localhost:8080/products"; // Adjust if needed
const CATEGORY_API_URL = "http://localhost:8080/categories"; // For fetching categories
const SUPPLIER_API_URL = "http://localhost:8080/suppliers"; // For fetching suppliers

let currentPage = 1;
let itemsPerPage = 10;

// Fetch and display products
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

// Fetch and display products
async function fetchProducts() {
    try {
        const response = await fetch(PRODUCT_API_URL);
        if (!response.ok) throw new Error("Failed to fetch products");

        const products = await response.json();
        console.log("Fetched Products:", products); // 🔍 Debug API response

        const tableBody = document.getElementById("product-table");
        tableBody.innerHTML = "";

        products.forEach(product => {
            console.log("Product ID:", product.id); // ✅ Ensure `id` exists
            console.log("Product Name:", product.name);

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.stock_quantity}</td>
                <td>${product.category_id ? product.category_id : "N/A"}</td>
                <td>${product.supplier_id ? product.supplier_id : "N/A"}</td>
                <td>
                    <button onclick="openEditProductModal(${product.id})">Edit</button>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}


// Fetch categories and suppliers for dropdowns
async function fetchDropdownData() {
    try {
        const [categoriesResponse, suppliersResponse] = await Promise.all([
            fetch(CATEGORY_API_URL),
            fetch(SUPPLIER_API_URL)
        ]);

        if (!categoriesResponse.ok || !suppliersResponse.ok) throw new Error("Failed to fetch dropdown data");

        const categories = await categoriesResponse.json();
        const suppliers = await suppliersResponse.json();

        populateDropdown("productCategory", categories);
        populateDropdown("productSupplier", suppliers);
        populateDropdown("editProductCategory", categories);
        populateDropdown("editProductSupplier", suppliers);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Populate dropdowns
function populateDropdown(dropdownId, data) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = "";

    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.name;
        dropdown.appendChild(option);
    });
}

// Add a new product
document.getElementById("addProductForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const productData = {
        Name: document.getElementById("productName").value,
        Description: document.getElementById("productDescription").value,
        Price: parseFloat(document.getElementById("productPrice").value),
        StockQuantity: parseInt(document.getElementById("productStockQuantity").value),
        CategoryID: parseInt(document.getElementById("productCategory").value),
        SupplierID: parseInt(document.getElementById("productSupplier").value)
    };

    try {
        const response = await fetch(PRODUCT_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData)
        });

        if (!response.ok) throw new Error("Failed to add product");

        document.getElementById("addProductForm").reset();
        closeModal('addProductModal');
        fetchProducts();
    } catch (error) {
        console.error("Error:", error);
    }
});

// Open edit product modal
async function openEditProductModal(id) {
    try {
        const response = await fetch(`${PRODUCT_API_URL}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");

        const product = await response.json();
        document.getElementById("editProductId").value = product.ID;
        document.getElementById("editProductName").value = product.Name;
        document.getElementById("editProductDescription").value = product.Description;
        document.getElementById("editProductPrice").value = product.Price;
        document.getElementById("editProductStockQuantity").value = product.StockQuantity;
        document.getElementById("editProductCategory").value = product.CategoryID;
        document.getElementById("editProductSupplier").value = product.SupplierID;

        openModal("editProductModal");
    } catch (error) {
        console.error("Error:", error);
    }
}

// Update product
document.getElementById("editProductForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const productData = {
        ID: parseInt(document.getElementById("editProductId").value),
        Name: document.getElementById("editProductName").value,
        Description: document.getElementById("editProductDescription").value,
        Price: parseFloat(document.getElementById("editProductPrice").value),
        StockQuantity: parseInt(document.getElementById("editProductStockQuantity").value),
        CategoryID: parseInt(document.getElementById("editProductCategory").value),
        SupplierID: parseInt(document.getElementById("editProductSupplier").value)
    };

    try {
        const response = await fetch(`${PRODUCT_API_URL}/${productData.ID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData)
        });

        if (!response.ok) throw new Error("Failed to update product");

        closeModal('editProductModal');
        fetchProducts();
    } catch (error) {
        console.error("Error:", error);
    }
});

// Delete product
async function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
        const response = await fetch(`${PRODUCT_API_URL}/${id}`, { method: "DELETE" });

        if (!response.ok) throw new Error("Failed to delete product");

        fetchProducts();
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

// Load products and dropdown data on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    fetchDropdownData();
});