const togglerSlider = document.querySelector(".toggler--slider")
const togglerCircle = document.querySelector(".toggler--circle")
const main = document.querySelector("main")
const header = document.querySelector("header")
const input = document.querySelector("input")
const select = document.querySelector("select")
const submitButton = document.querySelector(".submit-button")
const mainTasksHeader = document.querySelector(".main--tasks-header")

togglerSlider.addEventListener('click', toggleTheme)

let tasks = []
const mainTask = document.getElementById("main--task")
const mainTotal = document.getElementById("main--total")
const mainTotalAmount = document.getElementById("main--total-amount")
const sendButton = document.getElementById("send-button")

submitButton.addEventListener('click', (e) => {
    e.preventDefault()

    if (input.value.trim() === ""){
        input.classList.add("error-sign")
        return
    }

    let newTask = {
        task: input.value,
        total: parseFloat(select.value)
    }

    tasks.push(newTask)
    renderTasks()

    input.classList.remove("error-sign")
    input.value = ""
    select.value = 0
})

function renderTasks() {
    const mainTaskHtml = tasks.map(item => {
        return `
            <div class="task">
                <h4>${item.task}</h4>
                <button class="remove-button">Remove</button>
            </div>   
        `
    }).join("")

    const maintotalHtml = tasks.map(item => {
        return `<h4>$ ${item.total.toFixed(2)}</h4>`
    }).join("")

    mainTask.innerHTML = mainTaskHtml
    mainTotal.innerHTML = maintotalHtml

    const totalAmount = tasks.reduce((sum, item) => {
        return sum + item.total
    }, 0)

    mainTotalAmount.textContent = `$ ${totalAmount.toFixed(2)}`
}

mainTask.addEventListener('click', (e) => {
    if (e.target.classList.contains("remove-button")) {
        const taskElement = e.target.closest(".task")
        const taskIndex = Array.from(mainTask.children).indexOf(taskElement)
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1)
            renderTasks()
        }
    }
})

sendButton.addEventListener('click', () => {
    tasks = []
    renderTasks()
})

function toggleTheme() {
    const elementsToToggle = [
        togglerCircle, togglerSlider, header, main, input, select, submitButton, mainTasksHeader
    ]
    elementsToToggle.forEach(el => el.classList.toggle("dark-mode"))
}