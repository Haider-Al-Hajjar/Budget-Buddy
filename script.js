// The following lines are about the addExpense function.

let expenseName = document.getElementById("expense__name")
let expenseAmount = document.getElementById("expense__amount")
let expenseBtn = document.getElementById("expense__submit")
let expenseContainer = document.getElementById("expense")
let expenseOutput = document.getElementById("expense__output")
let classArray = []
let idArray = []

// Remember to reorganize
function checkBudget() {
    everyExpense = document.getElementsByClassName("expense__newExpense")
    let expenseTotal = 0
    for (i = 0; i < everyExpense.length; i++) {
        let currentExpense = everyExpense[i].childNodes[1].innerHTML.replace("$", "")
        expenseTotal += parseInt(currentExpense)
        console.log("Budget total is " + expenseTotal)
        // console.log(everyExpense[i].childNodes[1].innerHTML)
    }
}
// Remeber to reorganize 

// Previos lines create variables to refer to the divs, inputs, output, and an array to hold class names. This way, they can be sorted.
expenseBtn.addEventListener("click", function addExpense() {

    console.log("Budget max is " + budgetMax.value)


    if (budgetMax.value < expenseTotal) {
        return -1
    }
    if (checkBudget() == -1) {
        alert("Problem")
    }

    expenseOutput.style.visibility = "visible"
    const newExpense = document.createElement("div")
    const newExpenseName = document.createElement("div")
    const newClassName = expenseName.value.replace(/ /g, "_")



    if (classArray.indexOf(newClassName) == -1) {
        classArray.push(newClassName)
    }
    newExpense.style.order = classArray.length + 1
    newExpense.classList.add("expense__newExpense", newClassName, "expenseNumber" + classArray.length)
    // This checks whether or not the class name is unique, (thus a new class entirely), and if so, adds it to the list of classes.
    // It also adds an order that makes sure nothing is at order = 1, so that when the search function is called, it can pull something up to order = 1.
    // It also adds numerical class values that will allow the remove function to act on it later.

    newExpenseName.classList.add("expense__item")
    const newExpenseNameText = document.createTextNode(expenseName.value)
    newExpenseName.appendChild(newExpenseNameText)
    newExpense.appendChild(newExpenseName)
    // This creates a div with the text that the person put into the text field and a class of what was put into the text field.

    const newExpenseAmount = document.createElement("div")
    newExpenseAmount.classList.add("expense__cost")
    const newExpenseAmountNumber = document.createTextNode("$" + expenseAmount.value)
    newExpenseAmount.appendChild(newExpenseAmountNumber)

    newExpense.appendChild(newExpenseAmount)
    // This creates a div with the text the person put into the number field.

    let removeExpenseBtn = document.createElement("button")
    removeExpenseBtn.classList.add("remove__expense")
    removeExpenseBtn.setAttribute("id", "removeExpenseNumber" + classArray.length)
    const removeExpenseTxt = document.createTextNode("Remove")
    removeExpenseBtn.appendChild(removeExpenseTxt)
    newExpense.appendChild(removeExpenseBtn)
    // This creates a button with the teext "Remove" & a class of "remove__expense" to be used in functions later.

    // let function = window["removeExpense" + classArray.length]
    //     function()
    // Struggling to figure out how to make the remove expense button work!
    // I think this method has promise but I'll need to talk it over with someone.
    expenseOutput.appendChild(newExpense)

})

// Previous lines are about creating the addExpense function. The following lines are about the searchExpense function.

let searchName = document.getElementById("search__name")
let searchBtn = document.getElementById("search__submit")
let searchContainer = document.getElementById("search")
let orderArray = []
searchBtn.addEventListener("click", function searchExpense() {
    if (classArray.indexOf(searchName.value.replace(/ /g, "_")) == -1) {
        alert("Invalid Search. Something is misspelled, incorrectly capitalized, or the expense you are trying to search does not exist.")
    }
    else {
        oldExpense = document.getElementsByClassName(searchName.value.replace(/ /g, "_"))
        everyExpense = document.getElementsByClassName("expense__newExpense")
        for (i = 0; i < everyExpense.length; i++) {
            everyExpense[i].style.order++
        }
        for (i = 0; i < oldExpense.length; i++) {
            orderArray.push(oldExpense[i].style.order)
            oldExpense[i].style.order = 1
        }
        alert('Search complete! Your expense has been moved to the top of the list! Hit "unsort" to return it to its orginal position.')
    }
})

let budgetMax = document.getElementById("budget__max")
let setMaxBtn = document.getElementById("budget__submit")
let budgetContainer = document.getElementById("budget__output")

setMaxBtn.addEventListener("click", function setMax() {
    budgetContainer.innerHTML = "Maximum Budget of $" + budgetMax.value
})






// There may be problems with the github.