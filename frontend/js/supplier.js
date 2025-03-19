const API_URL = "http://localhost:8080/suppliers"; // Backend API URL

// ✅ Fetch and display suppliers
document.addEventListener("DOMContentLoaded", async () => {
    await fetchSuppliers();
});

async function fetchSuppliers() {
    console.log("Fetching suppliers..."); // ✅ Debugging Step
    try {
        const response = await fetch("http://localhost:8080/suppliers");
        if (!response.ok) throw new Error("Failed to fetch suppliers");

        const suppliers = await response.json();
        console.log("Suppliers fetched:", suppliers); // ✅ Debugging Step

        const tableBody = document.getElementById("supplier-table");
        tableBody.innerHTML = "";

        suppliers.forEach(supplier => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${supplier.ID}</td>
                <td>${supplier.name}</td>
                <td>${supplier.contact_person}</td>
                <td>${supplier.phone}</td>
                <td>${supplier.email}</td>
                <td>${supplier.website}</td>
                <td>
                    <button onclick="openViewModal(${supplier.ID})">View</button>
                    <button onclick="openEditModal(
                           ${supplier.ID}, 
                          '${supplier.name}', 
                          '${supplier.contact_person}', 
                          '${supplier.phone}', 
                          '${supplier.email}', 
                          '${supplier.address}', 
                          '${supplier.city}', 
                          '${supplier.country}', 
                          '${supplier.website}'
                 )">Edit</button>

                    <button onclick="deleteSupplier(${supplier.ID})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching suppliers:", error);
    }
}

// Open edit supplier modal
function openEditModal(id, name, contactPerson, phone, email, address, city, country, website) {
    document.getElementById("editSupplierId").value = id;
    document.getElementById("editSupplierName").value = name;
    document.getElementById("editContactPerson").value = contactPerson;
    document.getElementById("editPhone").value = phone;
    document.getElementById("editEmail").value = email;
    document.getElementById("editAddress").value = address;
    document.getElementById("editCity").value = city;
    document.getElementById("editCountry").value = country;
    document.getElementById("editWebsite").value = website;
    openModal("editSupplierModal");
}

// Update supplier
document.getElementById("editSupplierForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const id = document.getElementById("editSupplierId").value;

    const updatedSupplier = {
        name: document.getElementById("editSupplierName").value,
        contact_person: document.getElementById("editContactPerson").value,
        phone: document.getElementById("editPhone").value,
        email: document.getElementById("editEmail").value,
        address: document.getElementById("editAddress").value,
        city: document.getElementById("editCity").value,
        country: document.getElementById("editCountry").value,
        website: document.getElementById("editWebsite").value
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedSupplier)
        });

        if (!response.ok) throw new Error("Failed to update supplier");

        closeModal('editSupplierModal');
        fetchSuppliers();
    } catch (error) {
        console.error("Error:", error);
    }
});

// Delete supplier
async function deleteSupplier(id) {
    if (!confirm("Are you sure you want to delete this supplier?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

        if (!response.ok) throw new Error("Failed to delete supplier");

        fetchSuppliers();
    } catch (error) {
        console.error("Error:", error);
    }
}

// Open view supplier modal
async function openViewModal(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch supplier");

        const supplier = await response.json();
        document.getElementById("view-supplier-id").value = supplier.ID;
        document.getElementById("view-supplier-name").value = supplier.name;
        document.getElementById("view-contact-person").value = supplier.contact_person;
        document.getElementById("view-phone").value = supplier.phone;
        document.getElementById("view-email").value = supplier.email;
        document.getElementById("view-address").value = supplier.address;
        document.getElementById("view-city").value = supplier.city;
        document.getElementById("view-country").value = supplier.country;
        document.getElementById("view-website").value = supplier.website;

        openModal("viewSupplierModal");
    } catch (error) {
        console.error("Error:", error);
    }
}
// add supplier
document.getElementById("addSupplierForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get supplier details from the form
    const supplierData = {
        name: document.getElementById("supplierName").value,
        contact_person: document.getElementById("contactPerson").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        country: document.getElementById("country").value,
        website: document.getElementById("website").value
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(supplierData)
        });

        if (!response.ok) throw new Error("Failed to add supplier");

        // Clear input fields
        document.getElementById("addSupplierForm").reset();
        closeModal('addSupplierModal');

        // Refresh supplier list
        fetchSuppliers();
    } catch (error) {
        console.error("Error:", error);
    }
});


// Modal Controls
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}


// ✅ Ensure function runs when the page loads
document.addEventListener("DOMContentLoaded", () => fetchSuppliers());
