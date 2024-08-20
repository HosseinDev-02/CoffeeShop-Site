const modalUser = document.getElementById("users-modal")
const usersModalBtn = document.getElementById("user-modal-btn")
const usersEditIcons = document.querySelectorAll(".users__edit")
const userContainer = document.getElementById("user-list")
const userNameElem = document.getElementById("user-name")
const userLastnameElem = document.getElementById("user-lastname")
const userPhoneNumberElem = document.getElementById("user-phoneNumber")
const userPasswordElem = document.getElementById("user-password")
const userRoleElem = document.getElementById("user-role")
const userEditBtn = document.getElementById("user-edit-btn")
const userEditForm = document.getElementById("user-edit-form")
let editUserId = null

// User Panel Functions

async function getAllUsers() {
    let fetchUsers = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/users.json')
    let allUsers = await fetchUsers.json()
    if (allUsers) {
        return Object.entries(allUsers)
    }
}

async function userListDomHandler() {
    let allUsers = await getAllUsers()
    userContainer.innerHTML = ""
    if (allUsers) {
        let userFragment = document.createDocumentFragment()
        allUsers.forEach(user => {
            let newUserRow = document.createElement("tr")
            newUserRow.className = "h-20 text-lg child:font-Shabnam-Bold"
            newUserRow.innerHTML = `<td><span onclick='userModalHandler("${user[0]}")' class="users__edit text-green-700 cursor-pointer flex items-center justify-center"><svg class="w-6 h-6"><use href="#pencil"></use></svg></span></td><td><span onclick='userDelete("${user[0]}")' class="text-red-700 cursor-pointer flex items-center justify-center"><svg class="w-6 h-6"><use href="#x-mark"></use></svg></span></td><td>${user[0]}</td><td>${user[1].firstname}</td><td>${user[1].lastname}</td><td>${user[1].phone}</td><td>${user[1].password}</td><td>${user[1].isAdmin ? this.innerHTML = 'ادمین' : this.innerHTML = 'کاربر'}</td>`
            userFragment.append(newUserRow)
        })
        userContainer.append(userFragment)
    }
}

async function userDelete(userId) {
    try {
        let fetchMainUser = await fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/users/${userId}.json`, {
            method: "DELETE"
        })
        console.log(fetchMainUser)
        await userListDomHandler()
    } catch (err) {
        console.log("هنگام حذف کاربر مشکلی به وجود آمد", err)
        alert("هنگام حذف کاربر مشکلی به وجود آمد")
    }

}

function modalUserOpen() {
    modalUser.classList.remove("md:edit__user--hidden")
    coverElem.classList.remove("cover--hidden")
}

function modalUserClose() {
    modalUser.classList.add("md:edit__user--hidden")
    coverElem.classList.add("cover--hidden")
}

async function userModalHandler(userId) {
    let allUsers = await getAllUsers()
    allUsers.forEach(user => {
        if (user[0] === userId) {
            userNameElem.value = user[1].firstname
            userLastnameElem.value = user[1].lastname
            userPhoneNumberElem.value = user[1].phone
            userPasswordElem.value = user[1].password
            userRoleElem.checked = user[1].isAdmin
            editUserId = user[0]
        }
    })
    modalUserOpen()
}

async function editUserHandler() {

    let mainUpdateUser = {
        firstname: userNameElem.value,
        lastname: userLastnameElem.value,
        phone: userPhoneNumberElem.value,
        password: userPasswordElem.value,
        isAdmin: userRoleElem.checked
    }
    try {
        let mainUser = await fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/users/${editUserId}.json`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(mainUpdateUser)
        })
        console.log(mainUser)
        alert("اطلاعات کاربر با موفقیت بروزرسانی شد")
        await userListDomHandler()
        modalUserClose()
    } catch (err) {
        console.log("در آپدیت اطلاعات کاربر مشکلی بوجود آمد", err)
        alert("مشکلی در آپدیت اطلاعات کاربر بوجود آمد")
    }
}


// Users Panel Events

window.addEventListener("load", async () => {
    // await userListDomHandler()
})
usersModalBtn.addEventListener("click", function () {
    modalUserClose()
})
usersEditIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
        modalUserOpen()
    })
})
userEditBtn.addEventListener("click", editUserHandler)
userEditForm.addEventListener("submit", function (e) {
    e.preventDefault()
})