// The following lines are about the addExpense function.

document.addEventListener("DOMContentLoaded", function prompter(confirmed) {
    while (confirmed !== 1) {
        const user = prompt("You have returned to the fold, little lamb. Tell us your name, and we may proceed.", "Mary.")
        if (user.toLowerCase() === "mary") {
            let codeWord = prompt("Welcome, Mother Mary! It is a joy to see your return. Please, give us your code word and you will be granted access!", "Shepherdess.")
            if (codeWord.toLowerCase() === "shepherdess") {
                alert("Let the turnip run red with blood and the savings turn green!.")
                confirmed = 1
            }
        }
        else {
            codeWord = prompt(user + ", eh? You must be new. Please, enter the code word and we will begin your initiatioon.", "Turnip.")
            if (codeWord.toLowerCase() === "turnip") {
                alert("Access granted. May the turnip run red with blood.")
                confirmed = 1
            }
            else {
                alert("That is not our code word. We do not welcome outsiders.");
            }
        }
    }
})

let expenseName = document.getElementById("expense__name")
let expenseAmount = document.getElementById("expense__amount")
let expenseTag = document.getElementById("expense__tag")
let expenseBtn = document.getElementById("expense__submit")
let expenseOutput = document.getElementById("expense__output")
let classArray = []
var everyExpense = document.getElementsByClassName("expense__newExpense")
var expenseTotal = 0

// Previous lines create variables to refer to the divs, inputs, output, and an array to hold class names. This way, they can be sorted.
function checkBudget() {
    expenseTotal = 0
    for (let i = 0; i < everyExpense.length; i++) {
        let currentExpense = everyExpense[i].childNodes[1].innerHTML.replace("$", "")
        expenseTotal += parseFloat(currentExpense)
    }
    if (expenseTotal > budgetMax) {
        return -1
    }
    else {
        output = expenseTotal / budgetMax * 100
        return (output)
    }
}
function checkLocalBudget(category, maxBudget) {
    if (classArray.indexOf(category) !== -1) {
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
            return (output)
        }
    }
}
expenseBtn.addEventListener("click", function addExpense() {
    const newExpense = document.createElement("div")
    const newExpenseName = document.createElement("div")
    const newClassName = expenseName.value.trim().replace(/ /g, "_")
    const newTagArray = expenseTag.value.split(", ")

    if (classArray.indexOf(newClassName) == -1) {
        classArray.push(newClassName)
    }

    newExpense.style.order = classArray.length + 1
    newExpense.classList.add("expense__newExpense", newClassName)

    newExpenseName.classList.add("expense__item")
    const newExpenseNameText = document.createTextNode(expenseName.value)
    newExpenseName.appendChild(newExpenseNameText)
    newExpense.appendChild(newExpenseName)

    const newExpenseAmount = document.createElement("div")
    newExpenseAmount.classList.add("expense__cost")
    const newExpenseAmountNumber = document.createTextNode("$" + expenseAmount.value)
    newExpenseAmount.appendChild(newExpenseAmountNumber)

    newExpense.appendChild(newExpenseAmount)

    let removeExpenseBox = document.createElement("div")
    let removeExpenseBtn = document.createElement("button")
    removeExpenseBtn.classList.add("remove__expense")
    removeExpenseBox.classList.add("remove__box")
    const removeExpenseTxt = document.createTextNode("Remove")
    removeExpenseBtn.appendChild(removeExpenseTxt)
    removeExpenseBox.appendChild(removeExpenseBtn)

    for (let i = 0; i < newTagArray.length; i++) {
        if (newTagArray[i] !== "") {
            newTagName = newTagArray[i].trim().replace(/ /g, '_')
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

    newExpense.appendChild(removeExpenseBox)

    expenseOutput.appendChild(newExpense)

    removeExpenseBtn.addEventListener("click", function removeExpense() {
        if (confirm("Are you sure you want to remove this expense?")) {
            console.log(budgetMax, expenseTotal)
            let btnGrandParent = this.parentElement.parentElement
            let grandParentHomonymArray = document.getElementsByClassName(btnGrandParent.childNodes[0].innerHTML)
            console.log(grandParentHomonymArray)
            if (grandParentHomonymArray.length == 1) {
                classArray.splice(btnGrandParent.childNodes[0].innerHTML)
            }
            btnGrandParent.remove()
            checkBudget()
            budgetContainer.innerHTML = "Global Budget of $" + budgetMax + ". <br> Budget spent: $" + expenseTotal + " (" + checkBudget().toFixed(2) + "%) "
        }
    })

    if (checkBudget() == -1) {
        alert("The expense you just tried to add would exceed the budget you set!\rIf you still want to add this expense, then you may either changing the budget, removing an expense.")
        newExpense.remove()
    }
    else if (checkBudget() > 69) {
        alert("You have reached " + checkBudget().toFixed(2) + "% of your budget.")
    }
    var categoryExpenseArray = []
    for (let i = 0; i < budgetArray.length; i++) {
        console.log("Function Run!")
        console.log(i)
        console.log("The current budget category is " + budgetArray[i])
        console.log("The current budget max is " + maxArray[i])
        console.log(checkLocalBudget(budgetArray[i], maxArray[i]))
        if (checkLocalBudget(budgetArray[i], maxArray[i]) == -1) {
            alert("The expense you just tried to add exceeds budget you set! for " + budgetArray[i] + "\nIf you'd still like to add it, remove other expenses or increase the budget.")
            newExpense.remove()
        }
        else if (checkLocalBudget(budgetArray[i], maxArray[i] > 69)) {
            categoryExpenseArray.push(budgetArray[i])
            categoryExpenseArray.push(checkLocalBudget(budgetArray[i], maxArray[i]))
        }
    }
    if (checkBudget() !== -1 && checkLocalBudget() !== -1) {
        budgetContainer.innerHTML = "Global Budget of $" + budgetMax + ". <br> Budget spent: $" + expenseTotal + " (" + checkBudget().toFixed(2) + "%) "
        expenseOutput.style.visibility = "visible"
        const newTagArray = expenseTag.value.split(", ")
        for (let i = 0; i < newTagArray.length; i++) {
            if (newTagArray[i] !== "") {
                let newTagName = newTagArray[i].trim().replace(/ /g, '_')
                if (classArray.indexOf(newTagName) !== -1) {
                    console.log(newTagName)
                    classArray.split(newTagName)
                }
            }
        }
    }
})

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

let unsortBtn = document.getElementById("search__unsort")
unsortBtn.addEventListener("click", function unsortExpense() {
    everyExpense = document.getElementsByClassName("expense__newExpense")
    for (let i = 0; i < everyExpense.length; i++) {
        everyExpense[i].style.order = 1
    }
    alert("The elements have been unsorted and returned to the order they were added in!")
})

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

let budgetInput = document.getElementById("budget__max")
var budgetMax = ""
let setMaxBtn = document.getElementById("budget__submit")
let budgetContainer = document.getElementById("budget__output")

setMaxBtn.addEventListener("click", function setMax() {
    budgetMax = budgetInput.value
    budgetContainer.innerHTML = "Global Budget of $" + budgetMax
})

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