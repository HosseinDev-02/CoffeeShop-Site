const editProductsIcons = document.querySelectorAll(".products__edit")
const editProductsModal = document.getElementById("products-modal")
const editProductsBtn = document.getElementById("edit-products-btn")
const editProductsModalBtn = document.getElementById("products-modal-btn")
const productsContainer = document.getElementById("product-list")
const editProductsPriceElem = document.getElementById("product-price")
const editProductsOfferElem = document.getElementById("product-offer")
const editProductsDescriptionElem = document.getElementById("product-description")
const editProductsImageElem = document.getElementById("product-image-input")
const editProductsImage = document.getElementById("product-image")
const addProductsBtn = document.getElementById("add-product-btn")
const addProductsModal = document.querySelector(".add__product")
const addProductsPriceElem = document.getElementById("add-product-price")
const addProductsOfferElem = document.getElementById("add-product-offer")
const addProductsDescriptionElem = document.getElementById("add-product-description")
const addProductsImage = document.getElementById("add-product-image")
const addProductsImageElem = document.getElementById("add-product-image-input")
const addProductsModalBtn = document.getElementById("add-product-modal")
const addProductsForm = document.getElementById("add-product-form")
const addProductsCloseBtn = document.getElementById("add-products-modal-btn")
const editProductForm = document.getElementById("edit-product-form")
// const addProductMobileBtn = document.getElementById("add-product-mobile-btn")
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
    addProductsImage.removeAttribute("src")
    addProductsOfferElem.value = ""
}

function clearEditProductsInputs() {
    editProductsPriceElem.value = ""
    editProductsOfferElem.value = ""
    editProductsDescriptionElem.value = ""
    editProductsImage.setAttribute("src", "")
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
            price: addProductsPriceElem.value,
            offer: addProductsOfferElem.value,
            costPrice: addProductsPriceElem.value - (addProductsOfferElem.value / 100 * addProductsPriceElem.value),
            img: addProductsImage.getAttribute("src"),
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
            newProductRow.className = 'h-24 text-lg child:font-Shabnam-Medium'
            newProductRow.innerHTML = `<td><span onclick='productModalHandler("${product[0]}")' class="products__edit text-green-700 cursor-pointer flex items-center justify-center"><svg class="w-6 h-6"><use href="#pencil"></use></svg></span></td><td><span onclick='removeProductHandler("${product[0]}")' class="text-red-700 cursor-pointer flex items-center justify-center"><svg class="w-6 h-6"><use href="#x-mark"></use></svg></span></td><td>${product[0]}</td><td class="max-w-[300px]"><p class="line-clamp-2 text-right">${product[1].detail}</p></td><td><img loading='lazy' class="mx-auto object-cover w-20 h-20" src="${product[1].img}" alt=""></td><td>${product[1].price}</td><td>${product[1].offer}</td><td>${product[1].costPrice}</td><td>${product[1].view}</td>`
            productFragment.append(newProductRow)
        })
        productsContainer.append(productFragment)
    }
}

async function productModalHandler(productId) {
    let mainProduct = await getAllProducts()
    mainProduct.forEach(product => {
        if (product[0] === productId) {
            editProductsPriceElem.value = product[1].price
            editProductsOfferElem.value = product[1].offer
            editProductsDescriptionElem.value = product[1].detail
            editProductsImage.setAttribute("src", product[1].img)
            productEditId = product[0]
        }
    })
    modalProductsOpen()
}

async function editProductHandler() {
    try {
        let mainProduct = (await getAllProducts()).find(product => product[0] === productEditId)
        let mainProductObj = {
            detail: editProductsDescriptionElem.value,
            price: editProductsPriceElem.value,
            offer: editProductsOfferElem.value,
            costPrice: editProductsPriceElem.value - (editProductsOfferElem.value / 100 * editProductsPriceElem.value),
            img: editProductsImage.getAttribute("src"),
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
    try {
        let mainRemoveProduct = await fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/products/${productId}.json`, {
            method: 'DELETE'
        })
        console.log(mainRemoveProduct)
        await addProductsToDom()
    } catch (err) {
        console.log(err, "هنگام حذف محصول مشکلی بوجود آمد")
        alert("هنگام حذف محصول مشکلی بوجود آمد")
    }
}


// Products Events

window.addEventListener("load", async () => {
    // await addProductsToDom()
})
addProductsBtn.addEventListener("click", function () {
    addProductsModal.classList.toggle("add__product--hidden")
    coverElem.classList.remove("cover--hidden")
})
// addProductMobileBtn.addEventListener("click", () => {
//     addProductsModal.classList.toggle("add__product--hidden")
// })
editProductsBtn.addEventListener("click", async () => {
    await editProductHandler()
})
editProductsModalBtn.addEventListener("click", function () {
    modalProductsClose()
})
editProductsImageElem.addEventListener("change", function (e) {
    let mainProductImageName = e.target.files[0].name
    editProductsImage.setAttribute("src", "images/Products/" + mainProductImageName + "")
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
    addProductsImage.setAttribute("src", "images/Products/" + e.target.files[0].name + "")
})
addProductsModalBtn.addEventListener("click", async () => {
    await addNewProduct()
})
editProductForm.addEventListener("submit", e => e.preventDefault())