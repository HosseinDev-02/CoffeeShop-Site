import { basketMinusCountAction, basketPlusCountAction, headerBasketPriceHandler, totalBasketPrice, userBasket, getAllBasket } from "./utilities.js";

const mobileMenuBtn = document.querySelector("#mobile-menu__btn")
const mobileMenu = document.querySelector("#mobile-menu")
const subMenuBtn = document.querySelector("#sub-menu__btn")
const subMenu = document.querySelector(".sub-menu")
const mobilMenuItems = document.querySelectorAll(".mobile-menu__item")
const adminPanelLink = document.getElementById("admin-panel-link")
const indexRegisterBtn = document.querySelector("#index-register-btn")
const basketCount = document.getElementById("basket-count")
const headerBasketContainer = document.getElementById("header-basket-list")
const basketBtn = document.getElementById("basket-btn")
const basketHomeLink = document.getElementById("basket-home-link")

const showMsg = msg => {
    console.log(msg)
}

function addHeaderBasketToDom() {
    headerBasketContainer.innerHTML = ""
    let basketsArray = getAllBasket()
        .then(allBaskets => {
            if(allBaskets){
                let basketsFragment = document.createDocumentFragment()
                let filteredUserBasket = allBaskets.filter(basket => {
                    return basket[1].userId === userId && basket[1].checkOut === false
                })
                filteredUserBasket.forEach(basket => {
                    let newBasketCard = document.createElement("div")
                    newBasketCard.className = 'flex flex-row-reverse py-2 justify-between items-center gap-x-3.5'
                    newBasketCard.innerHTML =`<div class="flex flex-row-reverse py-3.5 justify-between items-center gap-x-3.5"><div class="w-28 h-28 shrink-0 rounded-md overflow-hidden"><img class="w-full h-full object-cover" src="${basket[1].img}" alt="product 1"></div><div class="flex flex-col items-end justify-between gap-y-4"><a href="#" class="line-clamp-1 hover:text-indigo-400 dir-rtl">${basket[1].detail}</a><div class="flex items-end justify-between w-full"><div class="flex justify-between gap-x-1 bg-transparent border border-white/30 text-white rounded-md p-1"><button onclick="showMsg('Kiram to in davary')" type="button" class="px-1"><svg class="shrink-0 w-5 h-5"><use href="#minus"></use></svg></button><div class="w-8 border-x border-x-white/50 text-center text-indigo-400 font-IRANSans-Medium text-lg">${basket[1].count}</div><button onclick="basketPlusCountAction('${basket[0]}', addHeaderBasketToDom, headerBasketPriceHandler)" type="button" class="px-1"><svg class="shrink-0 w-5 h-5"><use href="#plus"></use></svg></button></div><div class="flex flex-col items-start gap-y-1 dir-rtl"><div class="flex items-center gap-x-1.5 font-IRANSans-Bold text-lg">${basket[1].costPrice.toLocaleString()}<span class="text-base tracking-tighter">تومان</span></div><div class="offer flex items-center gap-x-1.5 font-IRANSans-Bold "<span class="text-xs tracking-tighter">تومان</span></div></div></div></div></div>`


                    basketsFragment.append(newBasketCard)
                })
                headerBasketContainer.append(basketsFragment)
                basketCount.innerHTML = filteredUserBasket.length.toString()
            }
        })
}

adminPanelLink.addEventListener("click",  e => {
    e.preventDefault()
    if(userId) {
        location.href = `admin-panel.html?id=${userId}`
    }
})
basketBtn.addEventListener("click", (e) => {
    e.preventDefault()
    if(userId){
        location.href = `basket.html?id=${userId}`
    }else{
        Swal.fire({
            title: 'ابتدا وارد شوید',
            icon: 'info',
            confirmButtonText: 'فهمیدم'
        })
    }
})
indexRegisterBtn.addEventListener("click", e => {
    e.preventDefault()
    if (userId) {
        location.href = 'index.html'
    }else{
        location.href = 'register.html'
    }
})
basketHomeLink.addEventListener("click", function (e){
    if(userId){
        location.href = `index.html?id=${userId}`
    }else{
        location.href = `index.html`
    }
})

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
    await headerBasketPriceHandler()
    if (userId) {
        let allUsersArray = await getAllUsers()
        let isAdminLogin = allUsersArray.some(user => user[0] === userId && user[1].isAdmin === true)
        indexRegisterBtn.innerHTML = 'خروج'
    } else {
        indexRegisterBtn.innerHTML = 'ورود / ثبت نام'
    }
})

