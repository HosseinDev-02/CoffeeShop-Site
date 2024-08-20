// Blogs Variable
const blogsEditBtn = document.querySelectorAll(".blogs__edit")
const blogsModal = document.getElementById("blogs-modal")
const blogsModalBtn = document.getElementById("edit-blogs-modal-btn")
const addBlogsModalShowBtn = document.getElementById("add-modal-blogs-show")
const addBlogsModal = document.querySelector(".add__blogs")
const addBlogsModalBtn = document.getElementById("add-blogs-modal-btn")
const addBlogsForm = document.getElementById("add-blogs-form")
const addBlogsTitleInput = document.getElementById("add-blogs-title")
const addBlogsDateInput = document.getElementById("add-blogs-date")
const addBlogsDescriptionInput = document.getElementById("add-blogs-description")
const addBlogsImage = document.getElementById("add-blogs-image")
const addBlogsImageInput = document.getElementById("add-blogs-image-input")
const addBlogsBtn = document.getElementById("add-blogs-btn")
const blogsContainer = document.getElementById("blogs-list")
const editBlogsModalBtn = document.getElementById("edit-blogs-modal-btn")
const editBlogsForm = document.getElementById("edit-blogs-form")
const editBlogsTitleInput = document.getElementById("edit-blogs-title")
const editBlogsDateInput = document.getElementById("edit-blogs-date")
const editBlogsDescriptionInput = document.getElementById("edit-blogs-description")
const editBlogsImageInput = document.getElementById("edit-blogs-image-input")
const editBlogsImage = document.getElementById("edit-blogs-image")
const editBlogBtn = document.getElementById("edit-blog-btn")
let editBlogId = null;







// Blogs Functions


function modalBlogsOpen() {
    blogsModal.classList.remove("add__blogs--hidden")
    coverElem.classList.remove("cover--hidden")
}

function modalBlogsClose() {
    blogsModal.classList.add("add__blogs--hidden")
    coverElem.classList.add("cover--hidden")
}

function closeAddBlogsModal() {
    addBlogsModal.classList.add("add__blogs--hidden")
    coverElem.classList.add("cover--hidden")
}

function openAddBlogsModal() {
    addBlogsModal.classList.remove("add__blogs--hidden")
    coverElem.classList.remove("cover--hidden")
}

function clearAddBlogsInputs() {
    addBlogsTitleInput.value = ""
    addBlogsDescriptionInput.value = ""
    addBlogsDateInput.value = ""
    addBlogsImage.removeAttribute("src")
}

function clearEditBlogsInputs() {
    editBlogsTitleInput.value = ""
    editBlogsDescriptionInput.value = ""
    editBlogsDateInput.value = ""
    editBlogsImage.removeAttribute("src")
}

async function getAllBlogs() {
    let fetchBlogs = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/blogs.json')
    let allBlogs = await fetchBlogs.json()
    if (allBlogs) {
        return Object.entries(allBlogs)
    }
}

async function addBlogsToDom() {
    blogsContainer.innerHTML = ""
    let allBlogs = await getAllBlogs()
    if (allBlogs) {

        let blogsFragment = document.createDocumentFragment()

        allBlogs.forEach(function (blog) {
            let newBlogsRow = document.createElement('tr')
            newBlogsRow.className = 'h-24 text-lg child:font-Shabnam-Medium'
            newBlogsRow.innerHTML = `<td><span onclick='editBlogsModalHandler("${blog[0]}")' class="blogs__edit text-green-700 cursor-pointer flex items-center justify-center"><svg class="w-6 h-6"><use href="#pencil"></use></svg></span></td><td><span onclick='removeBlogs("${blog[0]}")' class="text-red-700 cursor-pointer flex items-center justify-center"><svg class="w-6 h-6"><use href="#x-mark"></use></svg></span></td><td>${blog[0]}</td><td>${blog[1].title}</td><td class="max-w-[300px]"><p class="line-clamp-2 text-right">${blog[1].text}</p></td><td>${blog[1].date}</td><td><img class="mx-auto object-cover w-20 h-20" src="${blog[1].img}" alt=""></td>`
            blogsFragment.append(newBlogsRow)
        })

        blogsContainer.append(blogsFragment)

    }


}

async function addNewBlog() {
    try {
        let newBlogObj = {
            title: addBlogsTitleInput.value,
            text: addBlogsDescriptionInput.value,
            date: addBlogsDateInput.value,
            img: addBlogsImage.getAttribute("src")
        }
        let fetchBlogs = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/blogs.json', {
            method: "POST", headers: {
                'content-type': 'application/json'
            }, body: JSON.stringify(newBlogObj)
        })
        console.log(fetchBlogs)
        await addBlogsToDom()
        clearAddBlogsInputs()
        closeAddBlogsModal()
    } catch (err) {
        console.log(err, 'مشکلی در ایجاد مقاله بوجود آمد')
    }
}

async function removeBlogs(blogId) {
    try {
        let fetchRemoveBlog = await fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/blogs/${blogId}.json`, {
            method: 'DELETE'
        })
        console.log(fetchRemoveBlog)
        alert('مقاله مورد نظر با موفقیت حذف شد')
        await addBlogsToDom()
    } catch (err) {
        console.log(err, 'مشکلی در حذف مقاله بوجود آمد')
    }
}

async function editBlogsModalHandler(blogId) {
    let allBlogs = await getAllBlogs()
    allBlogs.forEach(blog => {
        if (blog[0] === blogId) {
            editBlogsTitleInput.value = blog[1].title
            editBlogsDescriptionInput.value = blog[1].text
            editBlogsDateInput.value = blog[1].date
            editBlogsImage.setAttribute("src", blog[1].img)
            editBlogId = blog[0]
        }
    })
    modalBlogsOpen()
}

async function editBlogsHandler() {
    try {

        let mainEditBlog = {
            title: editBlogsTitleInput.value,
            text: editBlogsDescriptionInput.value,
            date: editBlogsDateInput.value,
            img: editBlogsImage.getAttribute("src")
        }
        let fetchUpdateBlog = await fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/blogs/${editBlogId}.json`, {
            method: 'PUT', headers: {
                'content-type': 'application/json'
            }, body: JSON.stringify(mainEditBlog)
        })
        console.log(fetchUpdateBlog)
        await addBlogsToDom()
        clearEditBlogsInputs()
        modalBlogsClose()

    } catch (err) {
        console.log(err, 'هنگام بروزرسانی اطلاعات مقاله مورد نظر مشکلی بوجود آمد')
    }

}






// Blogs Events


window.addEventListener("load", async () => {
    // await addBlogsToDom()
})

blogsModalBtn.addEventListener("click", function () {
    modalBlogsClose()
})

addBlogsModalShowBtn.addEventListener("click", openAddBlogsModal)

addBlogsModalBtn.addEventListener("click", closeAddBlogsModal)

coverElem.addEventListener("click", closeAddBlogsModal)

blogsEditBtn.forEach(function (icon) {
    icon.addEventListener("click", function () {
        modalBlogsOpen()
    })
})

addBlogsBtn.addEventListener("click", async () => {
    await addNewBlog()
})

addBlogsForm.addEventListener("submit", function (e) {
    e.preventDefault()
})

addBlogsImageInput.addEventListener("change", function (e) {
    addBlogsImage.setAttribute("src", "images/Blogs/" + e.target.files[0].name + "")
})

editBlogsForm.addEventListener("submit", function (e) {
    e.preventDefault()
})

editBlogsModalBtn.addEventListener("click", modalBlogsClose)

editBlogsImageInput.addEventListener("change", function (e) {
    editBlogsImage.setAttribute("src", "images/Blogs/" + e.target.files[0].name + "")
})

editBlogBtn.addEventListener("click", async () => {
    await editBlogsHandler()
})