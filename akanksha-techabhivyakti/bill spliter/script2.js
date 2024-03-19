window.onload = function() {
    // Display the group name
    const groupName = localStorage.getItem('groupName');
    document.getElementById('displayGroupName').textContent = groupName || 'No group selected';

    // Expense Modal setup
    const expenseModal = document.getElementById("expenseModal");
    const expenseBtn = document.getElementById("resetBtn");
    const expenseCloseBtn = document.querySelector("#expenseModal .close-button");

    expenseBtn.onclick = function() {
        expenseModal.style.display = "block";
    }

    expenseCloseBtn.onclick = function() {
        expenseModal.style.display = "none";
    }

    // Additional Info Modal setup
    const additionalInfoModal = document.getElementById("additionalInfo");
    const additionalInfoCloseBtn = document.querySelector("#additionalInfo .close-button");

    additionalInfoCloseBtn.onclick = function() {
        additionalInfoModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == expenseModal) {
            expenseModal.style.display = "none";
        } else if (event.target == additionalInfoModal) {
            additionalInfoModal.style.display = "none";
        }
    }
}

// Function to handle adding expenses
document.getElementById("saveExpenseBtn").onclick = function() {
    const paidBy = document.getElementById("paidBy").value;
    // Display the name entered in a div box or other logic as needed
    // For demonstration, just displaying additional info modal
    document.getElementById("additionalInfo").style.display = "block";
    // Clear the input field for next entry
    document.getElementById("paidBy").value = "";
}

// Function to handle adding contact details
document.getElementById("saveContactBtn").onclick = function() {
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
    // Logic to handle email and contact info (e.g., saving to a database) can go here
    // For demonstration, clearing the input fields and hiding the modal
    document.getElementById("email").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("additionalInfo").style.display = "none";

// Hide the previous modals
document.getElementById("expenseModal").style.display = "none";
document.getElementById("additionalInfo").style.display = "none";

// Display the expense options div
document.getElementById("expenseOptions").style.display = "block";

// Optionally, clear the input fields if needed
document.getElementById("email").value = "";
document.getElementById("contact").value = "";
}
document.addEventListener('DOMContentLoaded', () => {
    const saveContactBtn = document.getElementById('saveContactBtn');
    const expenseEntryModal = document.getElementById('expenseEntryModal');
    const closeExpenseModal = document.querySelector('.close-expense-modal');

    // Show expense entry modal when save contact button is clicked
    saveContactBtn.addEventListener('click', () => {
        expenseEntryModal.style.display = 'block';
    });

    // Close the modal when the close button is clicked
    closeExpenseModal.addEventListener('click', () => {
        expenseEntryModal.style.display = 'none';
    });

    // Optionally close the modal if the user clicks outside of it
    window.onclick = (event) => {
        if (event.target == expenseEntryModal) {
            expenseEntryModal.style.display = 'none';
        }
    };
});
document.getElementById('addGroup').addEventListener('click', function() {
    // Display a modal or form to add a new group
    // For simplicity, this could be an alert or prompt for now
    var groupName = prompt("Enter the new group name:");
    if (groupName) {
        // Code to add the group to your data store or UI
        console.log("New group added:", groupName);
        // This is where you'd likely call a function to update the UI or backend
    }
});
