const editProductsIcons = document.querySelectorAll(".products__edit")
const editProductsModal = document.getElementById("products-modal")
const editProductsBtn = document.getElementById("edit-products-btn")
const editProductsModalBtn = document.getElementById("products-modal-btn")
const productsContainer = document.getElementById("product-list")
const editProductsPriceElem = document.getElementById("product-price")
const editProductsOfferElem = document.getElementById("product-offer")
const editProductsDescriptionElem = document.getElementById("product-description")
const editProductsImageElem = document.getElementById("product-image-input")
const editProductsImage = document.getElementById("product-image-wrapper")
const addProductsBtn = document.getElementById("add-product-btn")
const addProductsModal = document.querySelector(".add__product")
const addProductsPriceElem = document.getElementById("add-product-price")
const addProductsOfferElem = document.getElementById("add-product-offer")
const addProductsDescriptionElem = document.getElementById("add-product-description")
const addProductsImage = document.getElementById("product-img-wrapper")
const addProductsImageElem = document.getElementById("add-product-image-input")
const addProductsModalBtn = document.getElementById("add-product-modal")
const addProductsForm = document.getElementById("add-product-form")
const addProductsCloseBtn = document.getElementById("add-products-modal-btn")
const editProductForm = document.getElementById("edit-product-form")
let productEditId = null


function modalProductsOpen() {
    coverElem.classList.remove("cover--hidden")
    editProductsModal.classList.remove("md:edit__product--hidden")
}

function modalProductsClose() {
    coverElem.classList.add("cover--hidden")
    editProductsModal.classList.add("md:edit__product--hidden")
}

function clearAddProductsInputs() {
    addProductsDescriptionElem.value = ""
    addProductsPriceElem.value = ""
    addProductsImage.innerHTML = ''
    addProductsOfferElem.value = ""
}

function clearEditProductsInputs() {
    editProductsPriceElem.value = ""
    editProductsOfferElem.value = ""
    editProductsDescriptionElem.value = ""
    editProductsImage.innerHTML = ''
}

async function getAllProducts() {
    let fetchProducts = await fetch("https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/products.json")
    let allProducts = await fetchProducts.json()
    if (allProducts) {
        return Object.entries(allProducts)
    }
}
async function addNewProduct() {
    try {
        let productObj = {
            detail: addProductsDescriptionElem.value,
            price: +addProductsPriceElem.value,
            offer: +addProductsOfferElem.value,
            costPrice: addProductsPriceElem.value - (addProductsOfferElem.value / 100 * addProductsPriceElem.value),
            img: img.src,
            view: 0
        }
        let fetchNewProduct = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/products.json', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productObj)
        })
        console.log(fetchNewProduct)
        await addProductsToDom()
        clearAddProductsInputs()
        modalProductsClose()
    } catch (err) {
        console.log(err, 'مشکلی در  افزودن محصول بوجود امد')
        alert("مشکلی در  افزودن محصول بوجود امد")
    }
}
async function addProductsToDom() {
    let allProducts = await getAllProducts()
    productsContainer.innerHTML = ""
    if (allProducts) {
        let productFragment = document.createDocumentFragment()
        allProducts.forEach(product => {
            let newProductRow = document.createElement("tr")
            newProductRow.className = 'h-16 md:h-20'
            newProductRow.innerHTML = `<td><span onclick='productModalHandler("${product[0]}")' class="products__edit text-indigo-600 cursor-pointer flex items-center justify-center"><svg class="w-6 h-6"><use href="#pencil"></use></svg></span></td><td><span onclick='removeProductHandler("${product[0]}")' class="text-red-700 cursor-pointer flex items-center justify-center"><svg class="w-6 h-6"><use href="#x-mark"></use></svg></span></td><td><img loading='lazy' class="mx-auto object-cover w-11 lg:w-16 h-11 lg:h-16 rounded-md" src="${product[1].img}" alt=""></td><td class="max-w-[300px] hidden lg:table-cell"><p class="line-clamp-2 text-right">${product[1].detail}</p></td><td>${product[1].price.toLocaleString()}</td><td>${product[1].offer}%</td><td>${product[1].costPrice.toLocaleString()}</td><td class="hidden lg:table-cell">${product[1].view}</td>`
            productFragment.append(newProductRow)
        })
        productsContainer.append(productFragment)
    }
}
async function productModalHandler(productId) {
    let mainProduct = await getAllProducts()
    mainProduct.forEach(product => {
        if (product[0] === productId) {
            img = new Image()
            editProductsPriceElem.value = product[1].price
            editProductsOfferElem.value = product[1].offer
            editProductsDescriptionElem.value = product[1].detail
            editProductsImage.innerHTML = `<img class="w-full h-full object-cover" alt="#" src="${product[1].img}"/>`
            productEditId = product[0]
        }
    })
    modalProductsOpen()
}
async function editProductHandler() {
    try {
        console.log(img)
        let mainProduct = (await getAllProducts()).find(product => product[0] === productEditId)
        let mainProductObj = {
            detail: editProductsDescriptionElem.value,
            price: editProductsPriceElem.value,
            offer: editProductsOfferElem.value,
            costPrice: editProductsPriceElem.value - (editProductsOfferElem.value / 100 * editProductsPriceElem.value),
            img: img.src,
            view: mainProduct[1].view
        }
        await fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/products/${productEditId}.json`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(mainProductObj)
        })
        await addProductsToDom()
        clearEditProductsInputs()
        modalProductsClose()
    } catch (err) {
        console.log(err, "مشکلی در  بروزرسانی اطلاعات کاربر بوجود آمد")
        alert("مشکلی در  بروزرسانی اطلاعات کاربر بوجود آمد")
    }

}
async function removeProductHandler(productId) {
    // try {
    //     let mainRemoveProduct = await fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/products/${productId}.json`, {
    //         method: 'DELETE'
    //     })
    //     console.log(mainRemoveProduct)
    //     await addProductsToDom()
    // } catch (err) {
    //     console.log(err, "هنگام حذف محصول مشکلی بوجود آمد")
    //     alert("هنگام حذف محصول مشکلی بوجود آمد")
    // }
    swal.fire({
        title: 'فقط قسمت کاربران بک اند دارد',
        icon: 'info',
        confirmButtonText: 'فهمیدم'
    })
}


// Products Events

window.addEventListener("load", async () => {
    await addProductsToDom()
})
addProductsBtn.addEventListener("click", function () {
    addProductsModal.classList.toggle("add__product--hidden")
    coverElem.classList.remove("cover--hidden")
})
editProductsBtn.addEventListener("click", async () => {
    swal.fire({
        title: 'فقط قسمت کاربران بک اند دارد',
        icon: 'info',
        confirmButtonText: 'فهمیدم'
    })
    // await editProductHandler()
})
editProductsModalBtn.addEventListener("click", function () {
    modalProductsClose()
})
editProductsImageElem.addEventListener("change", function (e) {
    img = new Image()
    img.src = URL.createObjectURL(e.target.files[0])
    editProductsImage.innerHTML =  `<img class="w-full h-full object-cover" src="${img.src}"/>`
})
editProductsIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
        modalProductsOpen()
    })
})
addProductsCloseBtn.addEventListener("click", function () {
    addProductsModal.classList.toggle("add__product--hidden")
    coverElem.classList.add("cover--hidden")
})
addProductsForm.addEventListener("submit", function (e) {
    e.preventDefault()
})
coverElem.addEventListener("click", function () {
    addProductsModal.classList.add("add__product--hidden")
    coverElem.classList.add("cover--hidden")
})
addProductsImageElem.addEventListener("change", function (e) {
    img = new Image()
    img.src = URL.createObjectURL(e.target.files[0])
    img.setAttribute('class', 'w-full h-full object-cover')
    addProductsImage.append(img)
})
addProductsModalBtn.addEventListener("click", async () => {
    // await addNewProduct()
    swal.fire({
        title: 'فقط قسمت کاربران بک اند دارد',
        icon: 'info',
        confirmButtonText: 'فهمیدم'
    })
})
editProductForm.addEventListener("submit", e => e.preventDefault())