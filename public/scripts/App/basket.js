const basketContainer = document.getElementById("basket-list")
const basketCheckOutBtn = document.getElementById("basket-checkout-btn")
const basketTotalPrice = document.getElementById("basket-total-price")
const mobileBasketContainer = document.querySelector('#mobile-basket-list')


const getAllBaskets = async () => {
    let fetchBaskets = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/baskets.json')
    let allBaskets = await fetchBaskets.json()
    if (allBaskets) {
        return Object.entries(allBaskets)
    }
}

const addBasketToDom = () => {
    basketContainer.innerHTML = ""
    mobileBasketContainer.innerHTML = ''
    let allBasket = getAllBaskets()
        .then(allBasket => {
            if (allBasket) {
                let filteredUserBasket = allBasket.filter(basket => basket[1].userId === userId)
                let basketsFragment = document.createDocumentFragment()
                let mobileBasketFrag = document.createDocumentFragment()
                filteredUserBasket.forEach(function (basket) {
                    console.log(basket)
                    if(!basket[1].checkOut) {
                        let newBasketRow = document.createElement('tr')
                        newBasketRow.className = 'border-b border-white/50'
                        newBasketRow.innerHTML = `<td><span onclick='removeProductFromBasket("${basket[0]}")' class="cursor-pointer mx-auto flex items-center justify-center bg-transparent border border-white/30 w-6 md:w-8 h-6 md:h-8 hover:text-black hover:bg-white transition-colors"><svg class="w-5 md:w-6 h-5 md:h-6"><use href="#x-mark"></use></svg></span></td><td class="p-2.5 md:p-6"><div class="w-16 md:w-24 h-16 md:h-24 mx-auto"><img class="w-full h-full object-cover" src="${basket[1].img}" alt=""></div></td><td class="p-2.5 md:p-6 text-center w-[450px] align-middle"><p class="w-[300px] md:w-[400px] mt-2 font-Shabnam-Light md:text-lg line-clamp-2">${basket[1].detail}</p></td><td class="p-2.5 md:p-6 text-center align-middle"><div class="justify-center flex items-center gap-x-1.5 font-Shabnam-Bold text-xl">${basket[1].costPrice.toLocaleString()}<span class="text-base tracking-tighter font-Shabnam-Regular">تومان</span></div><div class="offer inline-flex items-center gap-x-1.5 font-Shabnam-Bold text-white/50">${basket[1].price.toLocaleString()}<span class="text-sm tracking-tighter font-Shabnam-Regular">تومان</span></div></td><td class="p-2.5 md:p-6 align-middle"><div class="flex justify-between gap-x-1 bg-transparent border border-white/30 w-28 mx-auto text-white rounded-md px-1 py-2"><button onclick='basketMinusCountAction("${basket[0]}", addBasketToDom, basketPriceHandler)' type="button" class="px-1"><svg class="shrink-0 w-5 h-5"><use href="#minus"></use></svg></button><div class="w-8 border-x border-x-white/50 text-center text-indigo-400 font-Shabnam-Bold text-xl">${basket[1].count}</div><button onclick='basketPlusCountAction("${basket[0]}", addBasketToDom, basketPriceHandler)' type="button" class="px-1"><svg class="shrink-0 w-5 h-5"><use href="#plus"></use></svg></button></div></td><td class="p-2.5 md:p-6"><div class="justify-center flex items-center gap-x-1.5 font-Shabnam-Bold text-xl">${(basket[1].count * basket[1].costPrice).toLocaleString()}<span class="text-base tracking-tighter font-Shabnam-Regular">تومان</span></div></td>`

                        let newDivElem = document.createElement('div')
                        newDivElem.className = 'rounded sm:rounded-md bg-zinc-900 overflow-hidden'
                        newDivElem.innerHTML = `<div class="flex justify-between w-full p-2">
                            <a href="#"
                               class="flex items-center justify-center w-24 h-24 rounded overflow-hidden">
                                <img class="w-full h-full object-cover" src="${basket[1].img}" alt=""
                                     loading="lazy">
                            </a>
                            <div class="flex flex-col-reverse justify-between items-center gap-y-2">
                                <div class="flex items-center justify-between w-full">
                                    <div class="flex items-center gap-x-2 bg-transparent text-white rounded-md p-1">
                                        <button onclick='basketMinusCountAction("${basket[0]}", addBasketToDom, basketPriceHandler)' type="button" class="rounded-full border border-red-500 p-0.5">
                                            <svg class="shrink-0 w-4 h-4 text-red-500">
                                                <use href="#minus"></use>
                                            </svg>
                                        </button>
                                        <span class="w-5 text-center">${basket[1].count}</span>
                                        <button onclick='basketPlusCountAction("${basket[0]}", addBasketToDom, basketPriceHandler)' type="button" class="p-0.5 border border-indigo-500 rounded-full">
                                            <svg class="shrink-0 w-4 h-4 text-indigo-500">
                                                <use href="#plus"></use>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div class="flex flex-col items-center justify-between flex-wrap gap-x-4 w-full">
                                    <div class="product__price flex items-center gap-x-1 font-IRANSans-Bold tracking-wider">
                                        ${basket[1].costPrice.toLocaleString()}
                                    </div>
                                    <div class="offer inline-flex items-center gap-x-1 font-IRANSans-Bold tracking-wider text-gray-400">
                                        ${basket[1].price.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h4 class="text-sm font-IRANSans-Medium line-clamp-2 mb-2 sm:mb-4 h-10 px-2 text-center">
                            چای سیاه یا چای قرمز یکی از محبوب‌‌ترین طعم‌های چای است.طعم‌های چای است.
                        </h4>
                        <button onclick='removeProductFromBasket("${basket[0]}")'
                                class="text-gray-100 sm:mt-0.5 md:text-gray-300 items-center justify-center md:hover:text-white transition-colors w-full h-10 md:h-12 bg-red-600 font-IRANSans-Medium rounded-md text-sm md:text-base tracking-tighter flex">
                            حذف محصول
                        </button>`

                        basketsFragment.append(newBasketRow)
                        mobileBasketFrag.append(newDivElem)
                    }
                })
                basketContainer.append(basketsFragment)
                mobileBasketContainer.append(mobileBasketFrag)
            }
        })
}

const removeProductFromBasket = (basketId) => {
    swal.fire({
        title: 'ایا از حذف این محصول اطمینان دارید ؟',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر'
    })
        .then(res => {
            if(res.isConfirmed) {
                try {
                    let fetchDeleteBasket = fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/baskets/${basketId}.json`, {
                        method: 'DELETE'
                    })
                        .then(res => {
                            if(res.ok) {
                                swal.fire({
                                    title: 'محصول مورد نظر با موفقیت حذف شد',
                                    icon: 'success',
                                    confirmButtonText: 'ممنون'
                                })
                                    .then(res => {
                                        if(res.isConfirmed) {
                                            addBasketToDom()
                                            basketPriceHandler()
                                        }
                                    })
                            }
                        })
                } catch (err) {
                    console.log(err, 'مشکلی در حذف محصول از سبد خرید رخ داد')
                }
            }
        })
}

function userBasketCheckOut() {
    swal.fire({
        title: 'آیا از پرداخت نهایی اطمینان دارید ؟',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'خیر',
        confirmButtonText: 'بله'
    })
        .then(res => {
            if(res.isConfirmed) {
                swal.fire({
                    title: 'پرداخت شما انجام شد',
                    icon: 'success',
                    confirmButtonText: 'ممنون'
                })
                    .then(res => {
                        if(res.isConfirmed) {
                            const allBasket = getAllBaskets()
                                .then(allBasket => {
                                    allBasket.forEach(function (basket) {
                                        if (basket[1].userId === userId) {
                                            basket[1].checkOut = true
                                        }
                                    })
                                    let mainUserBasket = allBasket.filter(function (basket) {
                                        if (basket.count !== 0 && +basket[1].userId === +userId && basket.checkOut !== true) {
                                            return true
                                        }
                                    })
                                    addBasketToDom()
                                })
                        }
                    })
            }
        })
}

const basketPriceHandler = () => {
    let sumBasketPrice = 0
    let userBasketArray = userBasket()
        .then(userBasketArray => {
            if(userBasketArray) {
                userBasketArray.forEach(basket => sumBasketPrice += (basket[1].costPrice * basket[1].count))
                basketTotalPrice.innerHTML = `${sumBasketPrice.toLocaleString()} تومان`
            }
        })
}                              

//=========================================================================================================================


window.addEventListener("load", async () => {
    await addBasketToDom()
    await basketPriceHandler()
})

basketCheckOutBtn.addEventListener("click", userBasketCheckOut)
