// The following lines are about the addExpense function.

let expenseName = document.getElementById("expense__name")
let expenseAmount = document.getElementById("expense__amount")
let expenseBtn = document.getElementById("expense__submit")
let expenseContainer = document.getElementById("expense")
let expenseOutput = document.getElementById("expense__output")
let classArray = []
let idArray = []

// Previos lines create variables to refer to the divs, inputs, output, and an array to hold class names. This way, they can be sorted.
expenseBtn.addEventListener("click", function addExpense() {
    const newExpense = document.createElement("div")
    const newExpenseName = document.createElement("div")
    const newClassName = expenseName.value.replace(/ /g, "")



    newExpense.classList.add("expense__newExpense", newClassName)
    newExpenseName.classList.add("expense__item")
    if (classArray.indexOf(newClassName) == -1) {
        classArray.push(newClassName)
    }
    newExpenseName.classList.add("expenseNumber" + classArray.length)
    // This checks whether or not the class name is unique, (thus a new class entirely), and if so, adds it to the list of classes.
    // This is for sorting later.

    // classArray =
    //     newExpenseName.setAttribute("id",)


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
    // This creates a button with the teext "Remove" & a class of "remove__expense" to be used in functions later.  (removed code, not sure if I will add it back later.)  

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
let searchClass = searchName.value.replace(/ /g, "")
searchBtn.addEventListener("click", function searchExpense() {
    if (classArray.indexOf(searchName.value.replace(/ /g, "")) == -1) {
        alert("Invalid Search. Something is misspelled, incorrectly capitalized, or the expense you are trying to search does not exist.")
    }
    else {
        expenses = document.getElementsbyClassName("expense__newExpense")
        oldExpense = document.getElementsByClassName(searchName.value)
        for (i = 0; i < expenses.length; i++) {
            expenses[i].style.visibility = "hidden"
            oldExpense[i].style.visibility = "visible"
        }
    }
    //     for (i = 0; i < oldExpense.length; i++) {
    //         oldExpense[i].style.order = "1"
    //         console.log(i)
    //     }
    //     alert("Search complete! Expenses matching your input have been placed at the top of the expense list!")
    // }

})