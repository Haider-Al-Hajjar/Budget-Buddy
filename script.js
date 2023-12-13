let expenseName = document.getElementById("expense__name")
let expenseAmount = document.getElementById("expense__amount")
let expenseBtn = document.getElementById("expense__submit")
let expenseContainer = document.getElementById("expense")
let expenseOutput = document.getElementById("expense__Ouput")
let classArray = []
let className = expenseName.value.replace(/ /g, "")
// Previos lines create variables to refer to the divs, inputs, output, and an array to hold class names. This way, they can be sorted.
expenseBtn.addEventListener("click", function addExpense() {
    const newExpenseName = document.createElement("div")
    newExpenseName.classList.add("test", expenseName.value.replace(/ /g, ""))
    if (classArray.indexOf(expenseName.value) == -1) {
        classArray.push(expenseName.value)
    }
    newExpenseName.style.order = classArray.length
    // This checks whether or not the class name is unique, (thus a new class entirely), and if so, adds it to the list of classes.
    // This is for sorting later.
    const newExpenseNameText = document.createTextNode(expenseName.value)
    newExpenseName.appendChild(newExpenseNameText)
    expenseOutput.appendChild(newExpenseName)
    // This creates a div with the text that the person put into the text field and a class of what was put into the text field.
    const newExpenseAmount = document.createElement("div")
    newExpenseAmount.classList.add("test2")
    const newExpenseAmountNumber = document.createTextNode(expenseAmount.value)
    newExpenseAmount.appendChild(newExpenseAmountNumber)
    expenseOutput.appendChild(newExpenseAmount)
    // This creates a div with the text the person put into the number field.

})