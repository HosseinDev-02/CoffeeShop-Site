const bookTimeInputBtn = document.getElementById("reserve-time-input-btn")
const timeInput = document.querySelector(".reserve-time")
const bookTimes = document.querySelectorAll(".book__times")
const bookTime = document.getElementById("reserve-time")
const bookTimeIcon = document.querySelector("#reserve-time-icon")
const bookForm = document.getElementById("reserve-form")
const bookFirstname = document.getElementById("reserve-firstname")
const bookLastname = document.getElementById("reserve-lastname")
const bookDate = document.getElementById("reserve-date")
const bookPhone = document.getElementById("reserve-phone")
const bookSubmitBtn = document.getElementById("reserve-submit-btn")



jalaliDatepicker.startWatch();


// Book Functions
async function reserveNewTable() {
    let newReserve = {
        firstname: bookFirstname.value,
        lastname: bookLastname.value,
        phone: bookPhone.value,
        date: bookDate.value,
        time: bookTime.innerHTML
    }
    let fetchNewReserve = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/reserves.json', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newReserve)
    })
    console.log(fetchNewReserve)
    clearReserveInputs()
}
function clearReserveInputs() {
    bookFirstname.value = ""
    bookLastname.value = ""
    bookPhone.value = ""
    bookDate.value = ""
    bookTime.innerHTML = ""
}

bookTimes.forEach(time => {
    time.addEventListener("click", () => {
        bookTime.innerHTML = time.innerHTML
        timeInput.classList.add("reserve-time--hidden")
    })
})
bookTimeInputBtn.addEventListener("click", () => {
    timeInput.classList.toggle("reserve-time--hidden")
    bookTimeIcon.classList.toggle("rotate-180")
})
bookForm.addEventListener('submit', e => {
    e.preventDefault()
})
bookSubmitBtn.addEventListener("click", async () => {
    await reserveNewTable()
})

// Blogs Events

