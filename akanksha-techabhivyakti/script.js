const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const totalIncomeField = document.getElementById('total-income');
const budgetField = document.getElementById('budget');
const balanceField = document.getElementById('history-balance');

let totalIncome = 0;
let expenses = [];
let expensesChart;

function updateBudget() {
  const totalIncomeValue = parseFloat(totalIncomeField.value);
  const budget = totalIncomeValue * 0.3; // Setting budget as 30% of total income
  budgetField.value = budget.toFixed(2);
}

function addTransaction() {
  const date = document.getElementById('date').value;
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;

  if (!totalIncomeField.value) {
    alert('Please enter your total income first.');
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount.');
    return;
  }

  const income = parseFloat(totalIncomeField.value);
  const budget = parseFloat(budgetField.value); // Ensure this is a number for accurate comparison
  const potentialTotalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0) + amount;

  // Check if adding this transaction would exceed the budget
  if (potentialTotalExpenses > budget) {
    displayWarningPopup('Expenses exceed budget!');
    return;
  }

  const transaction = {
    date,
    description,
    amount,
    category,
  };

  expenses.push(transaction);

  const listItem = document.createElement('li');
  listItem.textContent = `${date} - ₹${amount} - ${description} - ${category}`;
  transactionList.appendChild(listItem);

  // Reset form fields
  document.getElementById('date').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('category').value = 'Food'; // Resetting to default value
  document.getElementById('description').value = '';

  updateGraph();
  calculateBalance();
}

function calculateBalance() {
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingBalance = budgetField.value - totalExpenses;

  balanceField.value = remainingBalance.toFixed(2);

  // Check if expenses exceed budget
  if (totalExpenses > budgetField.value) {
    displayWarningPopup('Expenses exceed budget adding transaction failed!!');
  }
}

function displayWarningPopup(message) {
  const warningPopup = document.createElement('div');
  warningPopup.classList.add('warning-popup');
  warningPopup.textContent = message;
  document.body.appendChild(warningPopup);

  // Remove popup after 5 seconds
  setTimeout(() => {
    warningPopup.remove();
  }, 5000);
}

function clearHistory() {
  transactionList.innerHTML = '';
  expenses = [];
  balanceField.value = '';
}

function updateGraph() {
  const ctx = document.getElementById('expensesChart').getContext('2d');
  const categories = [...new Set(expenses.map(expense => expense.category))];
  const expenseData = categories.map(category => {
    return expenses
      .filter(expense => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
  });

  if (expensesChart) {
    expensesChart.destroy(); // Destroy the old chart instance before creating a new one
  }

  expensesChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [{
        label: 'Expenses by Category',
        data: expenseData,
        backgroundColor: [
          '#DAA520', // Dark Golden Rod (Dark Yellow)
          '#008000', // Green
          '#FF0000', // Red
          '#0000FF', // Blue
        ],
        borderColor: [
          '#DAA520', 
          '#008000',
          '#FF0000',
          '#0000FF',
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Expenses by Category'
      }
    }
  });
}
