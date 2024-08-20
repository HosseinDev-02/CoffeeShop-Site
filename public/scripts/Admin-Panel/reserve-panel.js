// reserve Variable
const reserveContent = $.querySelector(".add__reserve")
const reserveContentBtn = $.getElementById("reserve-content-btn")
const reserveContentCloseBtn = $.getElementById("reserve-content-close-btn")
const reserveContentForm = $.getElementById("reserve-content-form")
const reserveContentFirstNameElem = $.getElementById("reserve-content-firstname")
const reserveContentLastNameElem = $.getElementById("reserve-content-lastname")
const reserveContentPhoneElem = $.getElementById("reserve-content-phone")
const reserveContentDateElem = $.getElementById("reserve-content-date")
const reserveContentTimeElem = $.getElementById("reserve-content-time")
const reserveTimeElem = $.querySelector(".time-input")
const reserveContentTimeItems = $.querySelectorAll(".reserve__times")
const reserveContentTimeBtn = $.getElementById("reserve-content-time-btn")
const reserveContentTimeIcon = $.getElementById("reserve-content-time-icon")
const reserveContainer = $.getElementById("reserve-list")
const reserveContentSubmitBtn = $.getElementById("reserve-content-submit-btn")
const reserveModal = $.getElementById("reserve-modal")
const reserveModalBtn = $.getElementById("reserve-modal-btn")
const reserveModalForm = $.getElementById("reserve-modal-form")
const reserveModalFirstnameElem = $.getElementById("reserve-modal-firstname")
const reserveModalLastnameElem = $.getElementById("reserve-modal-lastname")
const reserveModalPhoneElem = $.getElementById("reserve-modal-phone")
const reserveModalDateElem = $.getElementById("reserve-modal-date")
const reserveModalTimeElem = $.getElementById("reserve-modal-time")
const reserveModalTimeIcon = $.getElementById("reserve-modal-time-icon")
const reserveModalSubmitBtn = $.getElementById("reserve-modal-submit-btn")
const reserveModalTime = $.querySelector(".reserve-modal-time")
const reserveModalTimeBtn = $.getElementById("reserve-modal-time-btn")
const reserveModalTimes = $.querySelectorAll(".reserve-modal__times")
let editReserveId = null;





function clearReserveModalInputs(){
    reserveModalFirstnameElem.value = ""
    reserveModalLastnameElem.value = ""
    reserveModalPhoneElem.value = ""
    reserveModalDateElem.value = ""
    reserveModalTimeElem.innerHTML = ""
}
function reserveContentOpen(){
    reserveContent.classList.remove("add__reserve--hidden")
    coverElem.classList.remove("cover--hidden")
}
function reserveContentClose(){
    reserveContent.classList.add("add__reserve--hidden")
    coverElem.classList.add("cover--hidden")
}
function reserveModalOpen(){
    reserveModal.classList.remove("add__reserve--hidden")
    coverElem.classList.remove("cover--hidden")
}
function reserveModalClose(){
    reserveModal.classList.add("add__reserve--hidden")
    coverElem.classList.add("cover--hidden")
}
function clearReserveContentInputs(){
    reserveContentFirstNameElem.value = ""
    reserveContentLastNameElem.value = ""
    reserveContentPhoneElem.value = ""
    reserveContentDateElem.value = ""
    reserveContentTimeElem.innerHTML = ""
}


// reserve Functions

async function getAllReserves() {
    let fetchAllReserves = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/reserves.json')
    let allReserves = await fetchAllReserves.json()
    if(allReserves){
        return Object.entries(allReserves)
    }
}
async function addReservesToDom(){
    reserveContainer.innerHTML = ""
    let allReserves = await getAllReserves()
    if(allReserves){
        let reservesFragment = document.createDocumentFragment()
        allReserves.forEach(function (reserve){
            let newReserveRow = document.createElement("tr")
            newReserveRow.className = 'h-24 text-lg child:font-Shabnam-Medium'
            newReserveRow.innerHTML = `<td><span onclick='reserveModalShow("${reserve[0]}")' class="blogs__edit text-green-700 cursor-pointer flex items-center justify-center"><svg class="w-6 h-6"><use href="#pencil"></use></svg></span></td><td><span onclick='removeReserve("${reserve[0]}")'  class="text-red-700 cursor-pointer flex items-center justify-center"><svg class="w-6 h-6"><use href="#x-mark"></use></svg></span></td><td>${reserve[0]}</td><td>${reserve[1].firstname}</td><td>${reserve[1].lastname}</td><td>${reserve[1].phone}</td><td>${reserve[1].date}</td><td dir='ltr'>${reserve[1].time}</td>`
            reservesFragment.append(newReserveRow)
        })
        reserveContainer.append(reservesFragment)
    }
}
async function removeReserve(reserveId){
    try {
        let fetchRemoveReserve = await fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/reserves/${reserveId}.json`, {
            method: 'DELETE'
        })
        console.log(fetchRemoveReserve)
        await addReservesToDom()
    }catch (err){
        console.log(err, 'مشکلی در حذف رزرو میز بوجود آمد')
    }
}
async function addNewReserve(){
    try {
        let newReserveObj = {
            firstname: reserveContentFirstNameElem.value,
            lastname: reserveContentLastNameElem.value,
            phone: reserveContentPhoneElem.value,
            date: reserveContentDateElem.value,
            time: reserveContentTimeElem.innerHTML
        }
        let fetchNewReserve = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/reserves.json', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newReserveObj)
        })
        console.log(fetchNewReserve)
        await addReservesToDom()
        clearReserveContentInputs()
        reserveContentClose()
    }catch (err){
        console.log(err, 'مشکلی در رزرو میز بوجود آمد')
    }

}
async function reserveModalShow(reserveId){
    let allReserves = await getAllReserves()
    allReserves.forEach(reserve => {
        if(reserve[0] === reserveId){
            reserveModalFirstnameElem.value = reserve[1].firstname
            reserveModalLastnameElem.value = reserve[1].lastname
            reserveModalPhoneElem.value = reserve[1].phone
            reserveModalDateElem.value = reserve[1].date
            reserveModalTimeElem.innerHTML = reserve[1].time
            editReserveId = reserve[0]
        }
    })

    reserveModalOpen()

}
async function editReserve(){
    try {
        let mainEditReserve = {
            firstname: reserveModalFirstnameElem.value,
            lastname: reserveModalLastnameElem.value,
            phone: reserveModalPhoneElem.value,
            date: reserveModalDateElem.value,
            time: reserveModalTimeElem.innerHTML
        }
        let fetchUpdateReserve = await fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/reserves/${editReserveId}.json`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(mainEditReserve)
        })
        console.log(fetchUpdateReserve)
        await addReservesToDom()
        clearReserveModalInputs()
        reserveModalClose()
    }catch (err){
        console.log(err, 'مشکلی در بروزرسانی رزرو بوجود آمد')
    }
}











// Reserves Events

window.addEventListener("load", async () => {
    // await addReservesToDom()
})
reserveModalSubmitBtn.addEventListener("click", async () => {
    await editReserve()
})
reserveModalTimes.forEach(function (item){
    item.addEventListener("click", function (){
        reserveModalTime.classList.add("reserve-modal-time--hidden")
        reserveModalTimeElem.innerHTML = item.innerHTML
    })
})
reserveModalBtn.addEventListener("click", reserveModalClose)
reserveModalTimeBtn.addEventListener("click", function (){
    reserveModalTime.classList.toggle("reserve-modal-time--hidden")
    reserveModalTimeIcon.classList.toggle("rotate-180")
})
reserveModalForm.addEventListener("submit", function (e){
    e.preventDefault()
})
reserveContentSubmitBtn.addEventListener("click", async () => {
    await addNewReserve()
})
reserveContentTimeItems.forEach(function (item) {
    item.addEventListener("click", function () {
        reserveContentTimeElem.innerHTML = item.innerHTML
        reserveTimeElem.classList.add("reserve-time--hidden")
    })
})
reserveContentBtn.addEventListener("click", reserveContentOpen)
reserveContentCloseBtn.addEventListener("click", reserveContentClose)
coverElem.addEventListener("click", reserveContentClose)
reserveContentTimeBtn.addEventListener("click", function (){
    reserveTimeElem.classList.toggle("reserve-time--hidden")
    reserveContentTimeIcon.classList.toggle("rotate-180")
})
reserveContentForm.addEventListener("submit", function (e) {
    e.preventDefault()
})