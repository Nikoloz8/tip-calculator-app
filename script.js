let bill = document.getElementById("bill")


let p = document.querySelector("p")
let people = document.getElementById("people")

let tip = document.getElementById("tip")

function bordering(input, haveErrorMessage = false, p = null) {
    input.addEventListener("input", () => {
        if (haveErrorMessage) {
            if (input.value == "0") {
                p.style.visibility = "visible"
                input.style.border = "2px solid #E17052"
            } else {
                input.style.border = "2px solid #26C2AE"
                p.style.visibility = "hidden"
            }
        } else if (!input.value === "") {
            input.style.border = "2px solid #26C2AE"
        }

        if (input.value === "") {
            input.style.border = "none"
        } else {
            input.style.border = "2px solid #26C2AE"
        }

    })
}

bordering(bill)
bordering(tip)
bordering(people, true, p)

let tips = document.querySelectorAll(".tip")


let h2 = document.querySelectorAll("h2")


let billValue

function inputsCheck() {
    if (bill.value !== "" && people.value !== "" && percent !== null) {
        return true
    }

    return false
}

let button = document.querySelector("button")

function resetButton() {
    if (inputsCheck()) {
        button.style.opacity = 1
        button.addEventListener("click", () => {
            bill.value = ""
            people.value = ""
            tip.value = ""
            h2[0].textContent = "$0.00"
            h2[1].textContent = "$0.00"
            percent = null
            tips.forEach(e => {
                e.style.backgroundColor = "#00474B"
                e.style.color = "#FFFFFF"
            })

            bill.style.border = "none"
            tip.style.border = "none"
            people.style.border = "none"

            p.style.visibility = "hidden"
            button.style.opacity = 0.3
        })

    }
}

function updateAmounts() {
    if (!inputsCheck()) {
        h2[0].textContent = "$0.00"
        h2[1].textContent = "$0.00"
        return
    }

    let tipAmount = ((billValue * percent) / 100 / numberOfPeople)
    let totalAmount = (billValue / numberOfPeople) + tipAmount

    h2[0].textContent = `$${tipAmount.toFixed(2)}`
    h2[1].textContent = `$${totalAmount.toFixed(2)}`
}

bill.addEventListener("input", () => {
    billValue = bill.value
    updateAmounts()
    resetButton()
})

let numberOfPeople

people.addEventListener("input", () => {
    numberOfPeople = people.value
    updateAmounts()
    resetButton()
})

function getTip() {
    percent = null
    tips.forEach((e, i) => {
        e.addEventListener("click", () => {
            if (tip.value === "") {
                percent = tips[i].querySelector("h4").textContent.slice(0, -1)
                updateAmounts()
                resetButton()
                tips.forEach((tipA) => {
                    if (tipA === e) {
                        e.style.backgroundColor = "#9FE8DF"
                        e.style.color = "#00474B"
                    } else {
                        tipA.style.backgroundColor = "#00474B"
                        tipA.style.color = "#FFFFFF"
                    }
                })
            }

        })
    })

    tip.addEventListener("input", () => {
        tips.forEach(e => {
            e.style.backgroundColor = "#00474B"
            e.style.color = "#FFFFFF"
        })
        percent = tip.value
        updateAmounts()
        resetButton()
    })
}

getTip()

function maxCheck(max, el) {
    el.addEventListener("input", () => {
        if (el.value > max) {
            el.value = max
        } else if (el.value < 0) {
            el.value = 0
        }
    })
}

maxCheck(9999999, bill)
maxCheck(100, tip)
maxCheck(1000, people)

