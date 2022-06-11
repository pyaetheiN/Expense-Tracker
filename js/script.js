// selectors
const form = document.querySelector('.form');
const inputName = document.querySelector('.input__name');
const inputDate = document.querySelector('.input__date');
const inputAmount = document.querySelector('.input__amount');
const tableBody = document.querySelector('tbody');

// event listners
form.addEventListener('submit', addExpense);
tableBody.addEventListener('click', removeExpense);
inputAmount.addEventListener('change', quantityChanged);
document.addEventListener('DOMContentLoaded', getLocalExpenses);

// functions
function addExpense(e){
  e.preventDefault();
  
  const desc = inputName.value;
  const date = inputDate.value;
  const amount = inputAmount.value;

  if(desc === '' || date === '' || amount === ''){
    return;
  }

  const expenses = {desc, date, amount};
  saveLocalExpense(expenses);

  clearFields();

  tableBody.innerHTML += `
    <tr>
      <td>${desc}</td>
      <td>${date}</td>
      <td>${amount}</td>
      <td><button class="remove-btn">&#10540;</button></td>
    </tr>
  `
}

function clearFields(){
  inputName.value = '';
  inputDate.value = '';
  inputAmount.value = '';
}

function removeExpense(e){
  let item = e.target;
  let itemParent = item.parentElement;

  if(item.classList.contains('remove-btn')){
    itemParent.parentElement.remove();
    // match desc
    removeLocalExpense(itemParent.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
    // console.log(itemParent.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
  }
}

function saveLocalExpense(expense){
  let expenses;
  
  if(localStorage.getItem('expenses') === null){
    expenses = [];
  } else{
    expenses = JSON.parse(localStorage.getItem('expenses'));
  }

  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function removeLocalExpense(desc){
  let expenses;
  
  if(localStorage.getItem('expenses') === null){
    expenses = [];
  } else{
    expenses = JSON.parse(localStorage.getItem('expenses'));
  }

  expenses.forEach(expense => {
    if(expense.desc === desc) {
      expenses.splice(expenses.indexOf(expense), 1);
    }
  });

  // expenses.forEach(function(expense, index)){
  //   if(expense.desc === desc) {
  //     expenses.splice(index, 1);
  //   }
  // }

  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function getLocalExpenses(){
  let expenses;
  
  if(localStorage.getItem('expenses') === null){
    expenses = [];
  } else{
    expenses = JSON.parse(localStorage.getItem('expenses'));
  }

  expenses.forEach(expense => {
    tableBody.innerHTML += `
      <tr>
        <td>${expense.desc}</td>
        <td>${expense.date}</td>
        <td>${expense.amount}</td>
        <td><button class="remove-btn">&#10540;</button></td>
      </tr>
    `
  })
}

function quantityChanged(e){
  const input = e.target;
  if(isNaN(input.value) || input.value <= 0){
    input.value = 1;
  }
}