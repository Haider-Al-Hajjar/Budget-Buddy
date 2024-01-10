// The following lines are about the addExpense function.

let expenseName = document.getElementById("expense__name")
let expenseAmount = document.getElementById("expense__amount")
let expenseTag = document.getElementById("expense__tag")
let expenseBtn = document.getElementById("expense__submit")
let expenseOutput = document.getElementById("expense__output")
let classArray = []

// Previous lines create variables to refer to the divs, inputs, output, and an array to hold class names. This way, they can be sorted.
function checkBudget() {
    everyExpense = document.getElementsByClassName("expense__newExpense")
    var expenseTotal = parseFloat(expenseAmount.value)
    for (let i = 0; i < everyExpense.length; i++) {
        let currentExpense = everyExpense[i].childNodes[1].innerHTML.replace("$", "")
        expenseTotal += parseFloat(currentExpense)
    }
    if (expenseTotal > budgetMax) {
        return -1
    }
    else {
        output = expenseTotal / budgetMax * 100
        return (output.toFixed(2))
    }
}
function checkLocalBudget(category, maxBudget) {
    if (classArray.indexOf(category) != -1) {
        let categoryExpenses = document.getElementsByClassName(classArray[classArray.indexOf(category)])
        var categoryTotal = 0
        for (let i = 0; i < categoryExpenses.length; i++) {
            let currentCategoryExpense = categoryExpenses[i].childNodes[1].innerHTML.replace("$", "")
            categoryTotal += parseFloat(currentCategoryExpense)
        }
        if (categoryTotal > maxBudget) {
            return -1
        }
        else {
            output = categoryTotal / maxBudget * 100
            return (output.toFixed(2))
        }
    }
}
expenseBtn.addEventListener("click", function addExpense() {
    var expenseTotal = parseFloat(expenseAmount.value)
    // This creates a function within the addExpense function that checks whether or not the expense you are trying to set is beyond the budget that you set.
    // if (confirm("Are you sure you want to add this expense?")) {
    budgetContainer.innerHTML = "Global Budget of $" + budgetMax + ". <br> Budget spent: $" + expenseTotal + " (" + checkBudget() + "%) "
    // This "if, else" statement stops the expense from going through if it would put you over your budget.


    /////
    // NEW EXPENSE FUNCTION START ZZ //
    /////

    expenseOutput.style.visibility = "visible"
    const newExpense = document.createElement("div")
    const newExpenseName = document.createElement("div")
    const newClassName = expenseName.value.trim().replace(/ /g, "_")
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

    for (let i = 0; i < newTagArray.length; i++) {
        if (newTagArray[i] !== "") {
            console.log(newTagArray)
            newTagName = newTagArray[i].trim().replace(/ /g, '_')
            console.log("After replace")
            console.log(newTagArray)
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


    removeExpenseBtn.addEventListener("click", function removeExpense() {
        if (confirm("Are you sure you want to remove this expense?")) {
            this.parentElement.parentElement.remove()
        }
    })

    // This creates a function that allows each remove button to remove its parent expense.


    if (checkBudget() == -1) {
        alert("The expense you just tried to add would exceed the budget you set!\rIf you still want to add this expense, then you may either changing the budget, removing an expense.")
        newExpense.remove()
    }
    else if (checkBudget() > 69) {
        alert("You have reached " + checkBudget() + "% of your budget.")
    }
    var categoryExpenseArray = []
    for (let i = 0; i < budgetArray.length; i++) {
        console.log(i)
        console.log("The current budget category is " + budgetArray[i])
        console.log("The current budget max is " + maxArray[i])
        console.log(checkLocalBudget(budgetArray[i], maxArray[i]))
        if (checkLocalBudget(budgetArray[i], maxArray[i]) == -1) {
            alert("The expense you just tried to add exceeds budget you set! for " + budgetArray[i] + "\nIf you'd still like to add it, remove other expenses or increase the budget.")
            newExpense.remove()
        }
        else (checkLocalBudget(budgetArray[i], maxArray[i] > 69)) {
            categoryExpenseArray.push(budgetArray[i])
            categoryExpenseArray.push(checkLocalBudget(budgetArray[i], maxArray[i]))
        }
    }
    alert(categoryExpenseArray)
    // }
})


// Previous lines are about creating the addExpense function. The following lines are about the searchExpense function.

let searchName = document.getElementById("search__name")
let searchBtn = document.getElementById("search__submit")
let orderArray = []
searchBtn.addEventListener("click", function searchExpense() {
    if (classArray.indexOf(searchName.value.trim().replace(/ /g, "_")) == -1) {
        alert("Invalid Search. Something is misspelled, incorrectly capitalized, or the expense you are trying to search does not exist.")
    }
    else {
        oldExpense = document.getElementsByClassName(searchName.value.trim().replace(/ /g, "_"))
        everyExpense = document.getElementsByClassName("expense__newExpense")
        for (let i = 0; i < everyExpense.length; i++) {
            everyExpense[i].style.order++
        }
        for (let i = 0; i < oldExpense.length; i++) {
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
    for (let i = 0; i < everyExpense.length; i++) {
        everyExpense[i].style.order = 1
    }
    alert("The elements have been unsorted and returned to the order they were added in!")
})

// Previous lines are about creating thee unsortExpense function. The following lines are about creating the toggleClassList function.

let toggleClassListBtn = document.getElementById("search__classList")
var toggleClassListStorage = 1
let classListContainer = document.getElementById("classList__output")
toggleClassListBtn.addEventListener("click", function toggleClassList() {
    if (toggleClassListStorage === 1) {
        classListContainer.innerHTML = classArray
        classListContainer.classList.toggle("invisible")
        toggleClassListBtn.innerHTML = "Hide all Labels & Tags"
        toggleClassListStorage = -1

    }
    else if (toggleClassListStorage === -1) {
        classListContainer.innerHTML = ""
        classListContainer.classList.toggle("invisible")
        toggleClassListBtn.innerHTML = "Show all Labels & Tags"
        toggleClassListStorage = 1
    }
})

// Previous lines are about creating thee toggleClassList function. The following lines are about creating the setMax function.

let budgetInput = document.getElementById("budget__max")
var budgetMax = ""
let setMaxBtn = document.getElementById("budget__submit")
let budgetContainer = document.getElementById("budget__output")

setMaxBtn.addEventListener("click", function setMax() {
    budgetMax = budgetInput.value
    budgetContainer.innerHTML = "Global Budget of $" + budgetMax
})

// Previous lines are about creating thee setMax function. The following lines are about creating the setLocalMax function.

let setLocalMaxBtn = document.getElementById("local__max-submit")
let localBudgetContainer = document.getElementById("budget__local")
let localBudgetInput = document.getElementById("local__category")
let localBudgetMax = document.getElementById("local__max")
let budgetArray = []
let maxArray = []

setLocalMaxBtn.addEventListener("click", function setLocalMax() {
    let newBudgetCategory = localBudgetInput.value.trim().replace(/ /g, "_")
    if (budgetArray.indexOf(newBudgetCategory) !== -1) {
        alert("You have already set a budget for this category. Remove the budget in order to reset it.")
    }
    else {
        budgetArray.push(newBudgetCategory)

        let newBudget = document.createElement("div")
        newBudget.classList.add("localBudget__newBudget")

        let newBudgetName = document.createElement("div")
        let newBudgetText = document.createTextNode(localBudgetInput.value)
        newBudgetName.appendChild(newBudgetText)
        newBudgetName.classList.add("localBudget__newCategory")
        newBudget.appendChild(newBudgetName)

        let newBudgetMax = document.createElement("div")
        let newBudgetNumber = document.createTextNode("$" + localBudgetMax.value)

        maxArray.push(localBudgetMax.value)
        newBudgetMax.appendChild(newBudgetNumber)
        newBudgetMax.classList.add("localBudget__newMax")
        newBudget.appendChild(newBudgetMax)


        let removeBudgetBox = document.createElement("div")
        let removeBudgetBtn = document.createElement("button")
        removeBudgetBtn.classList.add("remove__budget")
        removeBudgetBox.classList.add("remove__box")
        const removeBudgetText = document.createTextNode("Remove")
        removeBudgetBtn.appendChild(removeBudgetText)
        removeBudgetBox.appendChild(removeBudgetBtn)
        newBudget.appendChild(removeBudgetBox)
        removeBudgetBtn.addEventListener("click", function removeBudget() {
            if (confirm("Are you sure you want to remove this budget?")) {
                this.parentElement.parentElement.remove()
                budgetArray.splice(budgetArray.indexOf(this.parentElement))
                maxArray.splice(budgetArray.indexOf(this.parentElement))
            }

        })


        localBudgetContainer.appendChild(newBudget)

    }
})

// Previous lines are about creating thee setLocalMax function. The following lines are about 