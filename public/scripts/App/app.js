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



// blogs variable

// comment variable
const commentsContainer = document.getElementById("comments-container")




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








// Comments Functions

function addCommentsToDom(allComments) {
    // <div class="swiper-slide"><div class="border-2 border-gray-500 p-5 md:p-8 flex flex-col justify-between gap-y-8 rounded relative"><div class="flex items-center justify-between pb-6 border-b border-dashed"><svg class="w-6 h-6"><use href="#quote-down"></use></svg><h5 class="comments__title font-Shabnam-Bold text-lg md:text-xl text-white text-center">${comment.firstname + " " + comment.lastname}</h5><svg class="w-6 h-6"><use href="#quote-up"></use></svg></div><p class="comments__text text-sm md:text-base relative text-justify line-clamp-5">${comment.text}</p><div class="absolute left-2 right-2 -top-3 -bottom-3 text-center border-2 border-gray-500 rounded"></div></div></div>
}



// Basket Events



// Products Events

// productLikeIcon.forEach(item => {
//     item.addEventListener("click", () => {
//         item.classList.toggle("fill-white")
//     })
// })

// Categories Events


// Book Events

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

window.addEventListener("load", () => {
    // console.log(location.href)
})
