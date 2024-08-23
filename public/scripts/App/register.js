const userForm = document.getElementById("user-form")
const userRegisterBtn = document.getElementById("user-register-btn")
const userFirstname = document.getElementById("user-firstname")
const userLastname = document.getElementById("user-lastname")
const userPhoneNumber = document.getElementById("user-phone-number")
const userPassword = document.getElementById("user-password")
const userRepeatPassword = document.getElementById("user-r-password")
const registerPassIcons = document.querySelectorAll(".register-pass__icon")
// const registerRepeatPassIcon = document.querySelector(".register-repeat-pass__icon")


async function userRegisterHandler() {
    if (userPassword.value !== userRepeatPassword.value) {
        swal.fire({
            title: 'پسوورد و تکرار آن همخوانی ندارند !',
            icon: 'error',
            confirmButtonText: 'فهمیدم'
        })
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
            .then(res => {
                if(res.ok) {
                    clearUserRegisterInputs()
                    swal.fire({
                        title: 'ثبت نام شما با موفقیت انجام شد',
                        icon: 'success',
                        confirmButtonText: 'ممنون'
                    })
                        .then(res => {
                            if(res.isConfirmed) {
                                location.href = 'login.html'
                            }
                        })
                }
            })
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

registerPassIcons.forEach(item => {
    item.addEventListener("click", function () {
        item.classList.toggle("register-pass--show")
        if (item.previousElementSibling.getAttribute("type") === "text") {
            item.previousElementSibling.setAttribute("type", "password")
        } else {
            item.previousElementSibling.setAttribute("type", "text")
        }
    })
})

userRegisterBtn.addEventListener("click", async () => {
    await userRegisterHandler()
})
userForm.addEventListener("submit", function (e) {
    e.preventDefault()
})
