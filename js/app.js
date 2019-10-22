//query select the input fields to gether data
const budgetInput = document.querySelector('#budgetAmount');
const expenseTitleInput = document.querySelector('#expenseType');
const expenseValueInput = document.querySelector('#expenseAmount');

//query select the buttons to trigger events
const calculateBtn = document.querySelector('#calculate');
const addExpenseBtn = document.querySelector('#addExpense');

//query select the data to display the results
const expensesList = document.querySelector('.expenseCollection');
let budgetValueDisplay = document.querySelector('#budgetValue');
let balanceValueDisplay = document.querySelector('#balanceValue');

let itemId = 0;
let totalFunds = 0;

let myBudget = {
  createBudget: function(event) {
    budgetValueDisplay.innerText = budgetInput.value;
    balanceValueDisplay.innerText = budgetInput.value;
    totalFunds = budgetInput.value;

    budgetInput.value = '';
    event.preventDefault();
  },

  addExpense: function(event) {
    let expense = {
      id: itemId,
      title: expenseTitleInput.value,
      amount: expenseValueInput.value
    };
    console.log(expense);
    totalFunds -= expense.amount;
    balanceValueDisplay.innerText = totalFunds;

    const expenseLi = document.createElement('li');
    expenseLi.className = 'expenseLi';
    expenseLi.innerHTML = `
        <p>${expense.title}</p>
        <p>:</p>
        <p class='expenseAmount' id=${expense.id}>${expense.amount}</p>
      `;
    const removeButton = document.createElement('icon');
    removeButton.className = 'fa fa-trash';
    expenseLi.appendChild(removeButton);

    //remove an added budget item
    removeButton.addEventListener('click', () => {
      const expenseAmount = document.getElementById(`${expense.id}`);
      const amountToAdd = parseInt(expenseAmount.innerText);
      totalFunds += amountToAdd;

      balanceValueDisplay.innerText = totalFunds;

      expensesList.removeChild(expenseLi);
    });

    expensesList.appendChild(expenseLi);

    itemId++;
    expenseTitleInput.value = '';
    expenseValueInput.value = '';
    event.preventDefault();
  },

  loadEventListeners: function() {
    calculateBtn.addEventListener('click', myBudget.createBudget);
    addExpenseBtn.addEventListener('click', myBudget.addExpense);
  }
};

myBudget.loadEventListeners();
