// Category Variable
const categoriesEditIcons = document.querySelectorAll(".categories__edit")
const categoriesModal = document.getElementById("categories-modal")
const categoriesModalBtn = document.getElementById("categories-modal-btn")
const addCategoryBtn = document.getElementById("add-category-btn")
const addCategoryModalBtn = document.getElementById("add-category-modal-btn")
const addCategoryForm = document.getElementById("add-category-form")
const addCategoryTitle = document.getElementById("add-category-title")
const addCategoryImage = document.getElementById("add-category-image")
const addCategoryImageInput = document.getElementById("add-category-image-input")
const addNewCategoryBtn = document.getElementById("add-category-modal")
const addCategory = document.querySelector(".add__category")
const categoriesContainer = document.getElementById("categories-list")
const categoryEditForm = document.getElementById("edit-category-form")
const categoryEditTitleInput = document.getElementById("edit-category-title")
const categoryEditImageInput = document.getElementById("edit-category-image-input")
const categoryEditImage = document.getElementById("edit-category-image")
const categoryEditBtn = document.getElementById("category-edit-btn")
let editCategoryId = null


// Category Functions
function modalCategoriesOpen() {
    categoriesModal.classList.remove("add__category--hidden")
    coverElem.classList.remove("cover--hidden")
}

function modalCategoriesClose() {
    categoriesModal.classList.add("add__category--hidden")
    coverElem.classList.add("cover--hidden")
}

function showAddCategoryModal() {
    addCategory.classList.toggle("add__category--hidden")
    coverElem.classList.remove("cover--hidden")
}

async function addNewCategory() {
    let categoryObj = {
        title: addCategoryTitle.value,
        img: addCategoryImage.getAttribute("src")
    }
    let newCategory = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/categories.json', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(categoryObj)
    })
    console.log(newCategory)
    await addCategoriesToDom()
    clearAddCategoriesInputs()
    addCategoriesModalHandler()
}

function clearAddCategoriesInputs() {
    addCategoryTitle.value = ""
    addCategoryImage.removeAttribute("src")
}

function addCategoriesModalHandler() {
    addCategory.classList.add("add__category--hidden")
    coverElem.classList.add("cover--hidden")
}

async function getAllCategories() {
    let fetchCategories = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/categories.json')
    let allCategories = await fetchCategories.json()
    if (allCategories) {
        return Object.entries(allCategories)
    }
}

async function addCategoriesToDom() {
    let allCategories = await getAllCategories()
    categoriesContainer.innerHTML = ""
    if (allCategories) {
        let categoriesFragment = document.createDocumentFragment()
        allCategories.forEach(function (category) {
            let newCategoryRow = document.createElement('tr')
            newCategoryRow.className = 'h-24 text-lg child:font-Shabnam-Medium'
            newCategoryRow.innerHTML = `<tr class=""><td><span onclick=categoryEditModalHandler("${category[0]}") class="categories__edit text-green-700 cursor-pointer flex items-center justify-center"><svg class="w-6 h-6"><use href="#pencil"></use></svg></span></td><td><span onclick='removeCategory("${category[0]}")' class="text-red-700 cursor-pointer flex items-center justify-center"><svg class="w-6 h-6"><use href="#x-mark"></use></svg></span></td><td>${category[0]}</td><td>${category[1].title}</td><td><img class="w-20 h-20 mx-auto object-cover" src="${category[1].img}" alt=""></td></tr>`
            categoriesFragment.append(newCategoryRow)
        })
        categoriesContainer.append(categoriesFragment)
    }
}

async function removeCategory(categoryId) {
    console.log(categoryId)
    try {
        let fetchRemoveCategory = await fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/categories/${categoryId}.json`, {
            method: "DELETE"
        })
        console.log(fetchRemoveCategory)
        await addCategoriesToDom()
    } catch (err) {
        console.log(err, 'مشکلی در حذف دسته بندی مورد نظر بوجود آمد')
        alert('مشکلی در حذف دسته بندی مورد نظر بوجود آمد')
    }
}


async function categoryEditModalHandler(categoryId) {
    let mainCategory = await getAllCategories()
    mainCategory.forEach(category => {
        if (categoryId === category[0]) {
            categoryEditTitleInput.value = category[1].title
            categoryEditImage.setAttribute("src", category[1].img)
            editCategoryId = category[0]
        }
    })
    modalCategoriesOpen()
}

async function categoryEdit() {
    try {
        let mainCategory = {
            title: categoryEditTitleInput.value,
            img: categoryEditImage.getAttribute("src")
        }
        let mainCategoryUpdate = await fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/categories/${editCategoryId}.json`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(mainCategory)
        })
        console.log(mainCategoryUpdate)
        await addCategoriesToDom()
        clearCategoryEditInputs()
        modalCategoriesClose()
    } catch (err) {
        console.log(err, 'مشکلی در بروزرسانی اطلاعات بوجود آمد')
        alert('مشکلی در بروزرسانی اطلاعات بوجود آمد')
    }
}

function clearCategoryEditInputs() {
    categoryEditTitleInput.value = ""
    categoryEditImage.removeAttribute("src")
}


window.addEventListener("load", async () => {
    // await addCategoriesToDom()
})
categoriesModalBtn.addEventListener("click", function () {
    modalCategoriesClose()
})
addCategoryModalBtn.addEventListener("click", function () {
    addCategoriesModalHandler()
})
addCategoryBtn.addEventListener("click", showAddCategoryModal)
coverElem.addEventListener("click", function () {
    addCategory.classList.add("add__category--hidden")
    coverElem.classList.add("cover--hidden")
})
categoriesEditIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
        modalCategoriesOpen()
    })
})
categoryEditBtn.addEventListener("click", async () => {
    await categoryEdit()
})
addNewCategoryBtn.addEventListener("click", async () => {
    await addNewCategory()
})
addCategoryForm.addEventListener("submit", function (e) {
    e.preventDefault()
})
addCategoryImageInput.addEventListener("change", function (e) {
    addCategoryImage.setAttribute("src", "images/category/" + e.target.files[0].name + "")
})
categoryEditImageInput.addEventListener("change", function (e) {
    categoryEditImage.setAttribute("src", "images/category/" + e.target.files[0].name + "")
})
categoryEditForm.addEventListener("submit", function (e) {
    e.preventDefault()
})