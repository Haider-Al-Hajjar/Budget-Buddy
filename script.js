// The following lines are about the addExpense function.

let expenseName = document.getElementById("expense__name")
let expenseAmount = document.getElementById("expense__amount")
let expenseTag = document.getElementById("expense__tag")
let expenseBtn = document.getElementById("expense__submit")
let expenseContainer = document.getElementById("expense")
let expenseOutput = document.getElementById("expense__output")
let classArray = []


// Previous lines create variables to refer to the divs, inputs, output, and an array to hold class names. This way, they can be sorted.
expenseBtn.addEventListener("click", function addExpense() {
    function checkBudget() {
        everyExpense = document.getElementsByClassName("expense__newExpense")
        let expenseTotal = parseFloat(expenseAmount.value)
        for (i = 0; i < everyExpense.length; i++) {
            let currentExpense = everyExpense[i].childNodes[1].innerHTML.replace("$", "")
            expenseTotal += parseFloat(currentExpense)
        }
        if (budgetMax < expenseTotal) {
            return -1
        }
        else {
            output = expenseTotal / budgetMax * 100
            return (output.toFixed(2))
        }
    }
    // This creates a function within the addExpense function that checks whether or not the expense you are trying to set is beyond the budget that you set.
    if (confirm("Are you sure you want to add this expense?")) {
        if (checkBudget() == -1) {
            alert("The expense you just tried to add would exceed the budget you set!\rIf you still want to add this expense, then you may either changing the budget, removing an expense.")
        }
        // This "if, else" statement stops the expense from going through if it would put you over your budget.
        else {
            if (checkBudget() > 69) {
                alert("You have reached " + checkBudget() + "% of your budget.")
            }
            expenseOutput.style.visibility = "visible"
            const newExpense = document.createElement("div")
            const newExpenseName = document.createElement("div")
            const newClassName = expenseName.value.replace(/ /g, "_")
            const newTagArray = expenseTag.value.split(", ")
            // This shows the expenseOutput element and then creates a variable to append the rest of the variables to,
            // one to append the name of the expense to, one to create a classname that matches the expense name,
            // and one to create a classname that matches all tags applied to the expense. 


            if (classArray.indexOf(newClassName) == -1) {
                classArray.push(newClassName)
            }

            newExpense.style.order = classArray.length + 1
            newExpense.classList.add("expense__newExpense", newClassName)
            // This checks whether or not the class name is unique, (thus a new class entirely), and if so, adds it to the list of classes.
            // It also adds an order that makes sure nothing is at order = 1, so that when the search function is called, it can pull something up to order = 1.

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

            let removeExpenseBox = document.createElement("div")
            let removeExpenseBtn = document.createElement("button")
            removeExpenseBtn.classList.add("remove__expense")
            removeExpenseBox.classList.add("remove__box")
            const removeExpenseTxt = document.createTextNode("Remove")
            removeExpenseBtn.appendChild(removeExpenseTxt)
            removeExpenseBox.appendChild(removeExpenseBtn)
            // This creates a remove button, its div, and their styles.

            for (i = 0; i < newTagArray.length; i++) {
                if (newTagArray[i] !== "") {
                    newTagName = newTagArray[i].replace(/\s/g, '_')
                    let newExpenseTagText = document.createTextNode(newTagName)
                    let newTag = document.createElement("div")
                    newTag.appendChild(newExpenseTagText)
                    newTag.classList.add("expense__tag")

                    if (classArray.indexOf(newTagName) == -1) {
                        classArray.push(newTagName)
                        newExpense.classList.add(newTagName)
                    }

                    newTag.addEventListener("click", function removeTag() {
                        if (confirm("Are you sure you want to remove this tag?")) {
                            classArray.splice(classArray.indexOf(this))
                            this.parentElement.parentElement.classList.remove(this.innerHTML)
                            this.parentElement.removeChild(this)
                        }

                    })

                    removeExpenseBox.appendChild(newTag)


                }
            }
            // This appends all new tags to the removeExpenseBox.

            newExpense.appendChild(removeExpenseBox)

            expenseOutput.appendChild(newExpense)
            // This appends the expenseName, the expenseAmount, and the removeExpenseBtn to expenseOutput.
            // In other words, this makes them visible.

            let removeExpenseBtnArray = document.getElementsByClassName("remove__expense")
            removeExpenseBtnArray[removeExpenseBtnArray.length - 1].addEventListener("click", function removeExpense() {
                if (confirm("Are you sure you want to remove this expense?")) {
                    this.parentElement.parentElement.remove()
                }
            })

            // This creates a function that allows each remove button to remove its parent expense.



        }
    }
})


// Previous lines are about creating the addExpense function. The following lines are about the searchExpense function.

let searchName = document.getElementById("search__name")
let searchBtn = document.getElementById("search__submit")
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

// Previous lines are about creating the searchExpense function. The following lines are about creating the unsortExpense function.

let unsortBtn = document.getElementById("search__unsort")
unsortBtn.addEventListener("click", function unsortExpense() {
    everyExpense = document.getElementsByClassName("expense__newExpense")
    for (i = 0; i < everyExpense.length; i++) {
        everyExpense[i].style.order = 1
    }
    alert("The elements have been unsorted and returned to the order they were added in!")
})

let budgetInput = document.getElementById("budget__max")
var budgetMax = ""
let setMaxBtn = document.getElementById("budget__submit")
let budgetContainer = document.getElementById("budget__output")

setMaxBtn.addEventListener("click", function setMax() {
    budgetMax = budgetInput.value
    budgetContainer.innerHTML = "Maximum Budget of $" + budgetMax
})

let setLocalMaxBtn = document.getElementById("local__max-submit")
let localBudgetInput = document.getElementById("local__max")
let localBudgetContainer = document.getElementById("budget__local")
setLocalMaxBtn.addEventListener("click", function setLocalMax() {
    localBudget = document.createElement("div")
    localBudgetName = document.createElement("div")
    localBudgetText = document.createTextNode(localBudgetInput.value)

})