const menuItems = document.querySelectorAll(".menu__item")
const mobileMenuBtn = document.querySelector("#mobile-menu__btn")
const mobileMenu = document.querySelector("#mobile-menu")
const subMenuBtn = document.querySelector("#sub-menu__btn")
const subMenu = document.querySelector(".sub-menu")
const mobilMenuItems = document.querySelectorAll(".mobile-menu__item")
const adminPanelBtn = document.getElementById("admin-panel-btn")
const adminPanelLink = document.getElementById("admin-panel-link")
const indexRegisterBtn = document.querySelector("#index-register-btn")
const contactUsBtn = document.querySelector("#contact-us-btn")
// basket variable
const basketCount = document.getElementById("basket-count")
const headerBasketContainer = document.getElementById("header-basket-list")
const basketBtn = document.getElementById("basket-btn")
const totalBasketPrice = document.getElementById("total-basket-price")
const basketHomeLink = document.getElementById("basket-home-link")
const indexContactUsLink = document.getElementById("index-contactUs-link")


// Users variable

function separate(number) {
    let y = number
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(y)){
        y = y.replace(rgx, '$1' + ',' + '$2');
    }
    return y
}

// Basket Functions

async function getAllBasket (){
    let fetchBaskets = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/baskets.json')
    let allBaskets = await fetchBaskets.json()
    if(allBaskets){
        return Object.entries(allBaskets)
    }
}
async function userBasket () {
    let allBaskets = await getAllBasket()
    return allBaskets.filter(basket => basket[1].userId === userId)
}
async function addHeaderBasketToDom() {
    headerBasketContainer.innerHTML = ""
    let allBaskets = await getAllBasket()
    if(allBaskets){
        let basketsFragment = document.createDocumentFragment()
        let filteredUserBasket = allBaskets.filter(basket => {
            return basket[1].userId === userId && basket[1].checkOut === false
        })
        filteredUserBasket.forEach(basket => {
            let newBasketCard = document.createElement("div")
            newBasketCard.className = 'flex flex-row-reverse py-3.5 justify-between items-center gap-x-3.5'
            newBasketCard.innerHTML = `<div class="w-[120px] h-[120px] shrink-0"><img class="w-full h-full object-cover" src="${basket[1].img}" alt="product 1"></div><div class="flex flex-col items-end justify-between gap-y-2.5"><a href="#" class="line-clamp-2 hover:text-indigo-400 h-12">${basket[1].detail}</a><div class="flex items-end justify-between w-full"><div class="flex justify-between gap-x-1 bg-transparent border border-white/30 text-white rounded-md px-1 py-2"><button onclick="basketMinusCountAction('${basket[0]}', addHeaderBasketToDom, headerBasketPriceHandler)" type="button" class="px-1"><svg class="shrink-0 w-5 h-5"><use href="#minus"></use></svg></button><div class="w-8 border-x border-x-white/50 text-center text-indigo-400 font-Moshfegh-Bold text-xl">${basket[1].count}</div> <button onclick="basketPlusCountAction('${basket[0]}', addHeaderBasketToDom, headerBasketPriceHandler)" type="button" class="px-1"><svg class="shrink-0 w-5 h-5"><use href="#plus"></use></svg></button></div><div class="mt-3 flex flex-col items-start gap-y-1 dir-rtl"><div class="flex items-center gap-x-1.5 font-Moshfegh-Bold text-xl">${separate((basket[1].costPrice).toString())}<span class="text-base tracking-tighter font-Shabnam-Regular">تومان</span></div><div class="offer flex items-center gap-x-1.5 font-Moshfegh-Bold text-white/50">${separate(basket[1].price)}<span class="text-sm tracking-tighter font-Shabnam-Regular">تومان</span></div></div></div</div>`

            basketsFragment.append(newBasketCard)
        })
        headerBasketContainer.append(basketsFragment)
        basketCount.innerHTML = filteredUserBasket.length.toString()
    }
}
async function basketMinusCountAction(basketId, addBasketToDom, basketPriceHandler){
    let allBaskets = await getAllBasket()
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
        try {
            let fetchDeleteBasket = await fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/baskets/${basketId}.json`, {
                method: 'DELETE'
            })
            console.log(fetchDeleteBasket)
            alert('محصول مورد نظر حذف شد')
            await addBasketToDom()
            await basketPriceHandler()
        } catch (err) {
            console.log(err, 'مشکلی در حذف محصول از سبد خرید رخ داد')
        }
    } else {
        let fetchUpdateBasket = await fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/baskets/${basketId}.json`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateBasket)
        })
        console.log(fetchUpdateBasket)
        await addBasketToDom()
        await basketPriceHandler()
    }
}
async function basketPlusCountAction(basketId, addBasketToDom, basketPriceHandler){
    let allBasket = await getAllBasket()
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
    let fetchUpdateBasket = await fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/baskets/${basketId}.json`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(mainBasketPlus)
    })
    console.log(fetchUpdateBasket)
    await addBasketToDom()
    await basketPriceHandler()
}
async function headerBasketPriceHandler() {
    let userBasketArray = await userBasket()
    let sumBasketPrice = 0
    userBasketArray.forEach(basket => sumBasketPrice += (basket[1].costPrice * basket[1].count))
    totalBasketPrice.innerHTML = `${separate(sumBasketPrice.toString())}  تومان  `
}


// Menu Events


adminPanelLink.addEventListener("click",  e => {
    e.preventDefault()
    if(userId) {
        location.href = `http://localhost:3000/admin-panel.html?id=${userId}`
    }
})
basketBtn.addEventListener("click", (e) => {
    e.preventDefault()
    if(userId){
        location.href = `http://localhost:3000/basket.html?id=${userId}`
    }else{
        alert('ابتدا وارد شوید')
    }
})
indexRegisterBtn.addEventListener("click", e => {
    e.preventDefault()
    if (userId) {
        location.href = 'http://localhost:3000/index.html'
    }else{
        location.href = 'http://localhost:3000/register.html'
    }
})
basketHomeLink.addEventListener("click", function (e){
    if(userId){
        location.href = `http://localhost:3000/index.html?id=${userId}`
    }else{
        location.href = `http://localhost:3000/index.html`
    }
})
// menuItems.forEach(item => {
//     item.addEventListener("click", () => {
//         if (!item.className.includes("group")) {
//             document.querySelector(".menu__item--active").classList.remove("menu__item--active")
//             item.classList.add("menu__item--active")
//         }
//     })
// })
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
    // await addHeaderBasketToDom()
    // await headerBasketPriceHandler()
    let locationHref = location.href
    if (userId) {
        let allUsersArray = await getAllUsers()
        let isAdminLogin = allUsersArray.some(user => user[0] === userId && user[1].isAdmin === true)
        // if (isAdminLogin) {
        //     adminPanelBtn.classList.add("block")
        //     adminPanelBtn.classList.remove("hidden")
        // } else {
        //     adminPanelBtn.classList.add("hidden")
        //     adminPanelBtn.classList.remove("block")
        // }
        indexRegisterBtn.innerHTML = 'خروج'
    } else {
        // adminPanelBtn.classList.add("hidden")
        indexRegisterBtn.innerHTML = 'ورود / ثبت نام'
    }
    // if(locationHref.includes('comments')){
    //     document.querySelector(".menu__item--active").classList.remove("menu__item--active")
    //     contactUsBtn.classList.add('menu__item--active')
    // }
})
indexContactUsLink.addEventListener("click", e => {
    // e.preventDefault()
    // if(userId){
    //     location.href = `http://localhost:3000/comments.html?id=${userId}`
    // }else{
    //     alert('ابتدا وارد شوید')
    // }
})

