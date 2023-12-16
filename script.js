let expenseName = document.getElementById("expense__name")
let expenseAmount = document.getElementById("expense__amount")
let expenseBtn = document.getElementById("expense__submit")
let expenseContainer = document.getElementById("expense")
let expenseOutput = document.getElementById("expense__output")
let classArray = []
let idArray = []
let className = expenseName.value.replace(/ /g, "")
// Previos lines create variables to refer to the divs, inputs, output, and an array to hold class names. This way, they can be sorted.
expenseBtn.addEventListener("click", function addExpense() {
    const newExpense = document.createElement("div")
    const newExpenseName = document.createElement("div")
    const newClassName = expenseName.value.replace(/ /g, "")



    newExpense.classList.add("expense__newExpense")
    newExpenseName.classList.add("expense__item", newClassName, "expenseNumber" + classArray.length)
    if (classArray.indexOf(newClassName) == -1) {
        classArray.push(newClassName)
    }
    newExpenseName.style.order = classArray.length
    // This checks whether or not the class name is unique, (thus a new class entirely), and if so, adds it to the list of classes.
    // This is for sorting later.

    // classArray =
    //     newExpenseName.setAttribute("id",)


    const newExpenseNameText = document.createTextNode(expenseName.value)
    newExpenseName.appendChild(newExpenseNameText)
    newExpense.appendChild(newExpenseName)

    // This creates a div with the text that the person put into the text field and a class of what was put into the text field.

    const newExpenseAmount = document.createElement("div")
    console.log(newExpenseAmount.id)
    newExpenseAmount.classList.add("expense__cost")
    const newExpenseAmountNumber = document.createTextNode(expenseAmount.value)
    newExpenseAmount.appendChild(newExpenseAmountNumber)
    newExpenseAmount.style.order = classArray.length

    newExpense.appendChild(newExpenseAmount)
    // This creates a div with the text the person put into the number field.

    let removeExpenseBtn = document.createElement("button")
    let removeExpenseNumber = "removeExpenseNumber"
    removeExpenseBtn.classList.add("remove__expense")
    removeExpenseBtn.setAttribute("id", removeExpenseNumber + classArray.length)
    let x = removeExpenseBtn.getAttribute(this.id)
    console.log(x)
    //removeExpenseBtn.addEventListener("onclick", buttonRemove(classArray.length))
    const removeExpenseTxt = document.createTextNode("Remove")
    removeExpenseBtn.appendChild(removeExpenseTxt)
    removeExpenseBtn.style.order = classArray.length
    newExpense.appendChild(removeExpenseBtn)
    // This creates a button with the teext "Remove" & a class of "remove__expense" to be used in functions later.

    expenseOutput.appendChild(newExpense)
})
expenseBtn.addEventListener("click", function removeExpense() {
    console.log(true)
})

//function buttonRemove(x) {

//}

