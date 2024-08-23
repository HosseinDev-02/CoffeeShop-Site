const loginFormAction = document.getElementById("login-form")
const loginPhone = document.getElementById("login-phone")
const loginPassword = document.getElementById("login-password")
const loginBtn = document.getElementById("login-btn")
const forgetPasswordBtn = document.getElementById("forget-password")
const loginCover = document.querySelector(".cover-login")
const loginModal = document.querySelector(".modal-phone")
const loginModalCloseBtn = document.getElementById("login-modal-close")
const forgetPassForm = document.getElementById("forget-pass-form")
const loginForm = document.querySelector(".login__form")
const resetPassModal = document.querySelector(".modal-reset-pass")
const modalPhoneSubmit = document.getElementById("modal-phone-submit")
const resetPassCloseBtn = document.getElementById("reset-pass-close-btn")
const resetPassSubmit = document.getElementById("reset-pass-submit")
const resetPassForm = document.getElementById("reset-pass-form")
const userPhoneElem = document.getElementById("forget-phone")
const userPasswordElem = document.getElementById("reset-pass-password")
const userRepeatPasswordElem = document.getElementById("reset-pass-repeat-password")
const mainUserIdElem = document.getElementById("main-user-id")
const loginPassIcons = document.querySelectorAll(".login-pass__icon")
let mainUserId = null;
const loginPasswordInputs = document.querySelectorAll('.password__input')


async function loginUser() {
    let mainUser = null
    let allUsers = await getAllUsers()
    let isRegistered = allUsers.some(user => {
        if (loginPhone.value === user[1].phone && loginPassword.value === user[1].password) {
            mainUser = user
            return true
        }
    })
    if (isRegistered) {
        swal.fire({
            title: 'شما با موفقیت وارد شدید',
            icon: 'success',
            confirmButtonText: 'ممنون'
        })
            .then(res => {
                if(res.isConfirmed) {
                    location.href = `index.html?id=${mainUser[0]}`
                }
            })
    } else {
        swal.fire({
            title: 'کاربری با این مشخصات وجود ندارد !',
            icon: 'error',
            confirmButtonText: 'فهمیدم'
        })
    }
}


function loginModalShow() {
    loginCover.classList.remove("cover-login--hidden")
    loginModal.classList.remove("modal-phone--hidden")
    loginFormHidden()
}

function loginFormShow() {
    loginForm.classList.remove("invisible")
    loginForm.classList.remove("opacity-0")
}

function loginFormHidden() {
    loginForm.classList.add("invisible")
    loginForm.classList.add("opacity-0")
}

function loginModalHidden() {
    loginCover.classList.add("cover-login--hidden")
    loginModal.classList.add("modal-phone--hidden")
    loginFormShow()
}

async function checkUserPhone() {
    let userPhoneNumber = userPhoneElem.value
    let allUsersArray = await getAllUsers()
    let isOnList = allUsersArray.some(user => {
        if (user[1].phone === userPhoneNumber) {
            mainUserId = user[0]
            return true
        }
    })
    if (isOnList) {
        mainUserIdElem.innerHTML = mainUserId
        loginCover.classList.add("cover-login--hidden")
        loginModal.classList.add("modal-phone--hidden")
        resetPassModal.classList.remove("modal-reset-pass--hidden")
    } else {
        swal.fire({
            title: 'کاربری با این شماره وجود ندارد !',
            icon: 'error',
            confirmButtonText: 'فهمیدم'
        })
    }

}
async function resetPassword() {
    let userPass = userPasswordElem.value
    let userRepeatPass = userRepeatPasswordElem.value

    let updateUserPass = {
        password: userPass
    }
    if (userRepeatPass === userPass) {
        let fetchUpdateUser = await fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/users/${mainUserId}.json`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateUserPass)
        })
        swal.fire({
            title: 'رمز شما با موفقیت تغییر کرد',
            icon: 'success',
            confirmButtonText: 'ممنون'
        })
            .then(res => {
                if(res.isConfirmed) {
                    loginCover.classList.add("cover-login--hidden")
                    loginModal.classList.add("modal-phone--hidden")
                    resetPassModal.classList.add("modal-reset-pass--hidden")
                    loginFormShow()
                }
            })
    } else {
        swal.fire({
            title: 'رمز و تکرار آن همخوانی ندارند !',
            icon: 'error',
            confirmButtonText: 'فهمیدم'
        })
    }

}

loginPassIcons.forEach(item => {
    item.addEventListener("click", function () {
        item.classList.toggle("login-pass--show")
        if (item.previousElementSibling.getAttribute("type") === "text") {
            item.previousElementSibling.setAttribute("type", "password")
        } else {
            item.previousElementSibling.setAttribute("type", "text")
        }
    })
})
forgetPasswordBtn.addEventListener("click", function (e) {
    e.preventDefault()
    loginModalShow()
})
resetPassCloseBtn.addEventListener("click", function () {
    loginCover.classList.add("cover-login--hidden")
    loginModal.classList.add("modal-phone--hidden")
    resetPassModal.classList.add("modal-reset-pass--hidden")
    loginFormShow()
})
resetPassSubmit.addEventListener("click", async () => {
    await resetPassword()
})
modalPhoneSubmit.addEventListener("click", async () => {
    await checkUserPhone()
})
forgetPassForm.addEventListener("submit", function (e) {
    e.preventDefault()
})
loginFormAction.addEventListener("submit", function (e) {
    e.preventDefault()
})
loginModalCloseBtn.addEventListener("click", loginModalHidden)
loginCover.addEventListener("click", loginModalHidden)
loginBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    await loginUser()
})
resetPassForm.addEventListener("submit", function (e) {
    e.preventDefault()
})
