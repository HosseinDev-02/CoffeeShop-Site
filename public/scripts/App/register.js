const userForm = document.getElementById("user-form")
const userRegisterBtn = document.getElementById("user-register-btn")
const userFirstname = document.getElementById("user-firstname")
const userLastname = document.getElementById("user-lastname")
const userPhoneNumber = document.getElementById("user-phone-number")
const userPassword = document.getElementById("user-password")
const userRepeatPassword = document.getElementById("user-r-password")
const registerPassIcon = document.querySelector(".register-pass__icon")
const registerRepeatPassIcon = document.querySelector(".register-repeat-pass__icon")


async function userRegisterHandler() {
    if (userPassword.value !== userRepeatPassword.value) {
        alert("پسوورد و تکرار آن همخوانی ندارند !")
    } else {
        let newUser = {
            firstname: userFirstname.value,
            lastname: userLastname.value,
            phone: userPhoneNumber.value,
            password: userPassword.value,
            isAdmin: false
        }
        let fetchNewUser = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/users.json', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        console.log(fetchNewUser)
        clearUserRegisterInputs()
        alert('ثبت نام شما با موفقیت انجام شد')
        location.href = 'http://localhost:3000/login.html'
    }

}
function clearUserRegisterInputs() {
    userFirstname.value = ""
    userLastname.value = ""
    userPhoneNumber.value = ""
    userPassword.value = ""
    userRepeatPassword.value = ""
}

// Register Events

registerPassIcon.addEventListener("click", function () {
    registerPassIcon.classList.toggle("register-pass--show")
    if (userPassword.getAttribute("type") === "text") {
        userPassword.setAttribute("type", "password")
    } else {
        userPassword.setAttribute("type", "text")
    }
})
registerRepeatPassIcon.addEventListener("click", function () {
    registerRepeatPassIcon.classList.toggle("register-repeat-pass--show")
    if (userRepeatPassword.getAttribute("type") === "text") {
        userRepeatPassword.setAttribute("type", "password")
    } else {
        userRepeatPassword.setAttribute("type", "text")
    }
})
userRegisterBtn.addEventListener("click", async () => {
    await userRegisterHandler()
})
userForm.addEventListener("submit", function (e) {
    e.preventDefault()
})
