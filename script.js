const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// Load from localStorage
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Add transaction to DOM
function addTransactionDOM(transaction) {
    const li = document.createElement("li");

    li.classList.add(transaction.amount > 0 ? "plus" : "minus");

    li.innerHTML = `
        ${transaction.text} 
        <span>₹${transaction.amount}</span>
        <button class="delete" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(li);
}

// Update balance, income, expense
function updateValues() {
    const amounts = transactions.map(t => t.amount);

    const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
    const inc = amounts.filter(v => v > 0).reduce((acc, v) => acc + v, 0).toFixed(2);
    const exp = (
        amounts.filter(v => v < 0).reduce((acc, v) => acc + v, 0) * -1
    ).toFixed(2);

    balance.innerText = `₹${total}`;
    income.innerText = `₹${inc}`;
    expense.innerText = `₹${exp}`;
}

// Add new transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please enter valid data");
        return;
    }

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);
    updateLocalStorage();
    init();

    text.value = "";
    amount.value = "";
}

// Remove transaction
function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    init();
}

// Save to localStorage
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Initialize app
function init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener("submit", addTransaction);
