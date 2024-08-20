const basketContainer = document.getElementById("basket-list")
const basketCheckOutBtn = document.getElementById("basket-checkout-btn")
const basketTotalPrice = document.getElementById("basket-total-price")


async function geaAllBaskets() {
    let fetchBaskets = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/baskets.json')
    let allBaskets = await fetchBaskets.json()
    if (allBaskets) {
        return Object.entries(allBaskets)
    }
}

async function addBasketToDom() {
    basketContainer.innerHTML = ""
    let allBasket = await geaAllBaskets()

    let filteredUserBasket = allBasket.filter(basket => basket[1].userId === userId)

    if (allBasket) {
        let basketsFragment = document.createDocumentFragment()
        filteredUserBasket.forEach(function (basket) {
            let newBasketRow = document.createElement('tr')
            newBasketRow.className = 'border-b border-white/50'
            newBasketRow.innerHTML = `<td><span onclick='removeProductFromBasket("${basket[0]}")' class="cursor-pointer mx-auto flex items-center justify-center bg-transparent border border-white/30 w-6 md:w-8 h-6 md:h-8 hover:text-black hover:bg-white transition-colors"><svg class="w-5 md:w-6 h-5 md:h-6"><use href="#x-mark"></use></svg></span></td><td class="p-2.5 md:p-6"><div class="w-16 md:w-24 h-16 md:h-24 mx-auto"><img class="w-full h-full object-cover" src="${basket[1].img}" alt=""></div></td><td class="p-2.5 md:p-6 text-center w-[450px] align-middle"><p class="w-[300px] md:w-[400px] mt-2 font-Shabnam-Light md:text-lg line-clamp-2">${basket[1].detail}</p></td><td class="p-2.5 md:p-6 text-center align-middle"><div class="justify-center flex items-center gap-x-1.5 font-Shabnam-Bold text-xl">${separate((basket[1].costPrice).toString())}<span class="text-base tracking-tighter font-Shabnam-Regular">تومان</span></div><div class="offer inline-flex items-center gap-x-1.5 font-Shabnam-Bold text-white/50">${separate(basket[1].price)}<span class="text-sm tracking-tighter font-Shabnam-Regular">تومان</span></div></td><td class="p-2.5 md:p-6 align-middle"><div class="flex justify-between gap-x-1 bg-transparent border border-white/30 w-28 mx-auto text-white rounded-md px-1 py-2"><button onclick='basketMinusCountAction("${basket[0]}", addBasketToDom, basketPriceHandler)' type="button" class="px-1"><svg class="shrink-0 w-5 h-5"><use href="#minus"></use></svg></button><div class="w-8 border-x border-x-white/50 text-center text-indigo-400 font-Shabnam-Bold text-xl">${basket[1].count}</div><button onclick='basketPlusCountAction("${basket[0]}", addBasketToDom, basketPriceHandler)' type="button" class="px-1"><svg class="shrink-0 w-5 h-5"><use href="#plus"></use></svg></button></div></td><td class="p-2.5 md:p-6"><div class="justify-center flex items-center gap-x-1.5 font-Shabnam-Bold text-xl">${separate((basket[1].count * basket[1].costPrice).toString())}<span class="text-base tracking-tighter font-Shabnam-Regular">تومان</span></div></td>`
            basketsFragment.append(newBasketRow)
        })
        basketContainer.append(basketsFragment)
    }

}

async function removeProductFromBasket(basketId) {
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

}

function userBasketCheckOut() {
    allBasket.forEach(function (basket) {
        if (basket.userId === +userId) {
            basket.checkOut = true
        }
    })
    let mainUserBasket = allBasket.filter(function (basket) {
        if (basket.count !== 0 && basket.userId === +userId && basket.checkOut !== true) {
            return true
        }
    })
    addBasketToDom(mainUserBasket)
    setBasketToLocal(allBasket)
}

async function basketPlusCount(basketId) {
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

async function basketPriceHandler() {
    let sumBasketPrice = 0
    let userBasketArray = await userBasket()
    userBasketArray.forEach(basket => sumBasketPrice += (basket[1].costPrice * basket[1].count))
    basketTotalPrice.innerHTML = `${separate(sumBasketPrice.toString())}  تومان  `
}                              


//=========================================================================================================================


window.addEventListener("load", async () => {
    // await addBasketToDom()
    // await basketPriceHandler()
})

basketCheckOutBtn.addEventListener("click", userBasketCheckOut)
