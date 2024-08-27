const mobileMenuBtn = document.querySelector("#mobile-menu__btn")
const mobileMenu = document.querySelector("#mobile-menu")
const subMenuBtn = document.querySelector("#sub-menu__btn")
const subMenu = document.querySelector(".sub-menu")
const mobilMenuItems = document.querySelectorAll(".mobile-menu__item")
const indexRegisterBtn = document.querySelector("#index-register-btn")
const basketBtn = document.getElementById("basket-btn")
const basketHomeLink = document.getElementById("basket-home-link")
const basketCount = document.getElementById("basket-count")
const headerBasketContainer = document.getElementById("header-basket-list")
const totalBasketPrice = document.getElementById("total-basket-price")
const mobileHomeLink = document.querySelector('#mobile-home-link')
const mobileBasketBtn = document.querySelector('#mobile-basket-btn')
const mobileRegisterBtn = document.querySelector('#mobile-register-btn')
const headerCategoryContainer = document.querySelector('#header-category-container')
const headerBasketCount = document.querySelector('#header-basket-count')
const mobileHeaderCategoriesContainer = document.querySelector('#mobile-header-categories')
const menuContainer = document.querySelector('#menu')
const mobileMenuBtns = document.querySelector('#mobile-menu-btns')

async function getAllCategories() {
    let fetchCategories = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/categories.json')
    let allCategories = await fetchCategories.json()
    if (allCategories) {
        return Object.entries(allCategories)
    }
}
const addCategoriesToHeader = wrapper => {
    getAllCategories()
        .then(allCategories => {
            if(allCategories) {
                wrapper.innerHTML = ''
                allCategories.forEach(category => {
                    wrapper.insertAdjacentHTML('beforeend', `<a href="#">${category[1].title}</a>`)
                })
            }
        })
}


async function getAllBaskets (){
    let fetchBaskets = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/baskets.json')
    let allBaskets = await fetchBaskets.json()
    if(allBaskets){
        return Object.entries(allBaskets)
    }
}
const basketMinusCountAction = (basketId, addBasketToDom, basketPriceHandler) => {
    let allBaskets = getAllBaskets()
        .then(allBaskets => {
            let mainBasket = allBaskets.find(basket => basket[0] === basketId)
            let updateBasket = {
                productId: mainBasket[1].productId,
                userId: userId,
                img: mainBasket[1].img,
                detail: mainBasket[1].detail,
                costPrice: mainBasket[1].costPrice,
                price: mainBasket[1].price,
                count: mainBasket[1].count - 1,
                checkOut: mainBasket[1].checkOut
            }
            if (mainBasket[1].count === 1) {
                    swal.fire({
                        title: 'آیا از حذف این محصول اطمینان دارید ؟',
                        icon: 'question',
                        confirmButton: true,
                        showCancelButton: true,
                        cancelButtonText: 'خیر',
                        confirmButtonText: 'بله'
                    })
                        .then(result => {
                            if(result.isConfirmed) {
                                try {
                                    let fetchDeleteBasket = fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/baskets/${basketId}.json`, {
                                        method: 'DELETE'
                                    })
                                        .then(result => {
                                            if(result.ok) {
                                                Swal.fire({
                                                    title: 'محصول مورد نظر حذف شد',
                                                    icon: 'success',
                                                    confirmButton: true,
                                                    cancelButton: true
                                                })
                                                addBasketToDom()
                                                basketPriceHandler()
                                            }
                                        })
                                } catch (err) {
                                    swal.fire({
                                        title: 'مشکلی در حذف محصول رخ داد',
                                        icon: 'error',
                                        confirmButtonText: 'فهمیدم'
                                    })
                                }

                            }
                        })
            } else {
                let fetchUpdateBasket = fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/baskets/${basketId}.json`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(updateBasket)
                }).then(result => {
                    if(result.ok){
                        addBasketToDom()
                        basketPriceHandler()
                    }
                })
            }
        })


}
const basketPlusCountAction = (basketId, addBasketToDom, basketPriceHandler) => {
    let allBasket = getAllBaskets()
        .then(allBasket => {
            let mainBasket = allBasket.find(basket => basket[0] === basketId)
            let mainBasketPlus = {
                productId: mainBasket[1].productId,
                userId: userId,
                img: mainBasket[1].img,
                detail: mainBasket[1].detail,
                costPrice: mainBasket[1].costPrice,
                price: mainBasket[1].price,
                count: mainBasket[1].count + 1,
                checkOut: mainBasket[1].checkOut
            }
            let fetchUpdateBasket = fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/baskets/${basketId}.json`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(mainBasketPlus)
            })
                .then(res => {
                    if(res.ok) {
                        addBasketToDom()
                        basketPriceHandler()
                    }
                })
        })
}
const userBasket = () => {
    let allBaskets = getAllBaskets()
        .then(allBaskets => {
            if(allBaskets) {
                return allBaskets.filter(basket => basket[1].userId === userId)
            }
        })
    return allBaskets
}
const headerBasketPriceHandler = () => {
    let sumBasketPrice = 0
    userBasket()
        .then(baskets => {
            if(baskets) {
                baskets.forEach(basket => {
                    if(basket[1].userId === userId && basket[1].checkOut !== true) {
                        sumBasketPrice += (basket[1].costPrice * basket[1].count)
                    }else {
                        sumBasketPrice = 0
                    }
                })
                totalBasketPrice.innerHTML = `${sumBasketPrice.toLocaleString()} تومان `
            }
        })
}
const addHeaderBasketToDom = () => {
    headerBasketContainer.innerHTML = ""
    let basketsArray = getAllBaskets()
        .then(allBaskets => {
            if(allBaskets){
                let filteredUserBasket = allBaskets.filter(basket => {
                    return basket[1].userId === userId && basket[1].checkOut === false
                })
                if(filteredUserBasket.length) {
                    let basketsFragment = document.createDocumentFragment()
                    filteredUserBasket.forEach(basket => {
                        let newBasketCard = document.createElement("div")
                        newBasketCard.className = 'flex flex-row-reverse py-2 justify-between items-center gap-x-3.5'
                        newBasketCard.innerHTML =`<div class="flex flex-row-reverse py-3.5 justify-between items-center gap-x-3.5"><div class="w-28 h-28 shrink-0 rounded-md overflow-hidden"><img class="w-full h-full object-cover" src="${basket[1].img}" alt="product 1"></div><div class="flex flex-col items-end justify-between gap-y-4"><a href="#" class="line-clamp-1 hover:text-indigo-400 dir-rtl">${basket[1].detail}</a><div class="flex items-end justify-between w-full"><div class="flex justify-between gap-x-1 bg-transparent border border-white/30 text-white rounded-md p-1"><button onclick="basketMinusCountAction('${basket[0]}', addHeaderBasketToDom, headerBasketPriceHandler)" type="button" class="px-1"><svg class="shrink-0 w-5 h-5"><use href="#minus"></use></svg></button><div class="w-8 border-x border-x-white/50 text-center text-indigo-400 font-IRANSans-Medium text-lg">${basket[1].count}</div><button onclick="basketPlusCountAction('${basket[0]}', addHeaderBasketToDom, headerBasketPriceHandler)" type="button" class="px-1"><svg class="shrink-0 w-5 h-5"><use href="#plus"></use></svg></button></div><div class="flex flex-col items-start gap-y-1 dir-rtl"><div class="flex items-center gap-x-1.5 font-IRANSans-Bold text-lg">${basket[1].costPrice.toLocaleString()}<span class="text-base tracking-tighter">تومان</span></div><div class="offer flex items-center gap-x-1.5 font-IRANSans-Bold "<span class="text-xs tracking-tighter">تومان</span></div></div></div></div></div>`
                        basketsFragment.append(newBasketCard)
                    })
                    headerBasketContainer.append(basketsFragment)
                }else {
                    let newTitleElem = document.createElement('h3')
                    newTitleElem.className = 'text-red-500 text-center text-lg md:text-x my-2 md:my-4'
                    newTitleElem.innerHTML = '! سبد خرید شما خالی است'
                    headerBasketContainer.append(newTitleElem)
                }
                basketCount.innerHTML = filteredUserBasket.length.toString()
                headerBasketCount.innerHTML = `${filteredUserBasket.length.toString()} مورد`
            }
        })
}

const homeLinkHandler = () => {
    if(userId){
        location.href = `index.html?id=${userId}`
    }else{
        location.href = `index.html`
    }
}
const registerBtnHandler = () => {
    if (userId) {
        swal.fire({
            title: 'آبا می خواهید خارج شوید ؟',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'بله',
            cancelButtonText: 'خیر'
        })
            .then(res => {
                if(res.isConfirmed) {
                    location.href = 'index.html'
                }
            })
    }else{
        location.href = 'register.html'
    }
}
const basketBtnHandler = () => {
    if(userId){
        location.href = `basket.html?id=${userId}`
    }else{
        Swal.fire({
            title: 'ابتدا وارد شوید',
            icon: 'info',
            confirmButtonText: 'فهمیدم'
        })
    }
}
const panelHandler = () => {
    if(userId) {
        location.href = `admin-panel.html?id=${userId}`
    }
}

basketBtn.addEventListener("click", basketBtnHandler)
mobileBasketBtn.addEventListener("click", basketBtnHandler)
indexRegisterBtn.addEventListener("click", registerBtnHandler)
mobileRegisterBtn.addEventListener("click", registerBtnHandler)
basketHomeLink.addEventListener("click", homeLinkHandler)
mobileHomeLink.addEventListener('click', homeLinkHandler)
mobilMenuItems.forEach(item => {
    item.addEventListener("click", () => {
        if (!item.className.includes("flex-col")) {
            document.querySelector(".mobile-menu__item--active").classList.remove("mobile-menu__item--active")
            item.classList.add("mobile-menu__item--active")
        }
    })
})
subMenuBtn.addEventListener("click", () => {
    subMenu.classList.toggle("sub-menu--hidden")
    subMenuBtn.classList.toggle("text-indigo-400")
})
mobileMenuBtn.addEventListener("click", () => {
    if (mobileMenu.className.includes("mobile-menu--hidden")) {
        mobileMenu.classList.remove("mobile-menu--hidden")
    } else {
        mobileMenu.classList.add("mobile-menu--hidden")
        subMenu.classList.add("sub-menu--hidden")
        subMenuBtn.classList.remove("text-indigo-400")
    }
})


window.addEventListener("load", async () => {
    addHeaderBasketToDom()
    addCategoriesToHeader(headerCategoryContainer)
    addCategoriesToHeader(mobileHeaderCategoriesContainer)
    headerBasketPriceHandler()
    if (userId) {
        let allUsersArray = await getAllUsers()
        let isAdminLogin = allUsersArray.some(user => user[0] === userId && user[1].isAdmin === true)
        if(isAdminLogin) {
            menuContainer.insertAdjacentHTML('beforeend', `<li onclick="panelHandler()" id="admin-panel-btn" class="menu__item">
                        <a id="admin-panel-link" href="#">پنل کاربری</a>
                    </li>`)
            mobileMenuBtns.insertAdjacentHTML('afterbegin', `<a class="inline-flex items-center gap-x-2 text-indigo-400" href="#" onclick="panelHandler()">
                <svg class="w-6 h-6">
                    <use href="#user"></use>
                </svg>
                پنل کاربری
            </a>`)
        }
        indexRegisterBtn.innerHTML = 'خروج'
        mobileRegisterBtn.classList.add('text-red-500')
        mobileRegisterBtn.innerHTML = `
        <svg class="w-6 h-6">
             <use href="#power-off"></use>
        </svg>
        خروج
`
    } else {
        indexRegisterBtn.innerHTML = 'ورود / ثبت نام'
        mobileRegisterBtn.classList.remove('text-red-500')
        mobileRegisterBtn.innerHTML = `
        <svg class="w-6 h-6">
             <use href="#arrow-right-end-on-rectangle"></use>
        </svg>
        ورود / ثبت نام
`
    }
})

