
const productsContainer = document.getElementById("products-container")
const bestProductsContainer = document.getElementById("best-products-container")

async function getAllProducts() {
    let fetchProducts = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/products.json')
    let allProducts = await fetchProducts.json()
    if (allProducts) {
        return Object.entries(allProducts)
    }
}

async function getAllBasket() {
    let fetchBasket = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/baskets.json')
    let allBaskets = await fetchBasket.json()
    if (allBaskets) {
        return Object.entries(allBaskets)
    }
}

const addProductsToDom = () => {
    let allProducts = getAllProducts()
        .then(allProducts => {
            if (allProducts) {
                let productsFragment = document.createDocumentFragment()
                productsContainer.innerHTML = ''
                allProducts.forEach(product => {
                    let newProductCard = document.createElement('div')
                    newProductCard.className = 'rounded-lg bg-zinc-900 overflow-hidden'
                    newProductCard.innerHTML = `<a href="#"
                               class="flex items-center justify-center w-full h-[120px] sm:h-[160px] md:h-[200px] rounded-md overflow-hidden">
                                <img class="w-full h-full object-cover" src="${product[1].img}" alt=""
                                     loading="lazy">
                            </a>
                            <div class="p-2">
                                <h4 class="text-sm md:text-base font-IRANSans-Medium line-clamp-2 mb-4 sm:mb-6 text-gray-200 h-10 md:h-12">
                                    ${product[1].detail}
                                </h4>
                                <div class="flex justify-between">
                                    <div class="flex flex-col justify-between sm:justify-start gap-y-2.5">
                                        <div class="flex items-center gap-x-1">
                                            <svg class="w-4 sm:w-5 h-4 sm:h-5 fill-amber-300 shrink-0 text-amber-300">
                                                <use href="#star"></use>
                                            </svg>
                                            <span class="font-IRANSans-Bold text-xs leading-5 sm:leading-[19px] sm:text-sm">
                                        4.5
                                    </span>
                                        </div>
                                        <div class="flex items-center gap-1 font-IRANSans-Bold text-xs tracking-tighter">
                                            <svg class="w-4 h-4"><use href="#eye"></use></svg>
                                            <span class="font-IRANSans">${product[1].view}</span>
                                        </div>
                                    </div>
                                    <div class="flex flex-col justify-between items-start sm:items-end flex-wrap gap-x-4">
                                        <div class="product__price flex items-center gap-x-1 font-IRANSans-Bold text-base tracking-wider md:text-xl text-white">
                                            ${product[1].price.toLocaleString()}
                                        </div>
                                        <div class="offer flex items-center gap-x-1 font-IRANSans-Bold text-base tracking-wider text-gray-400">
                                            ${product[1].costPrice.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onclick='addProductToBasket("${product[0]}")'
                                    class="flex text-gray-100 sm:mt-0.5 md:text-gray-300 items-center justify-center md:hover:text-white transition-colors w-full h-10 md:h-12 bg-indigo-600 font-IRANSans-Medium rounded-md tracking-tighter text-sm md:text-base">
                                افزودن به سبد خرید
                            </button>`

                    productsFragment.append(newProductCard)
                })
                productsContainer.append(productsFragment)
            }
        })
}

const addBestProductsToDom = () => {
    getAllProducts()
        .then(products => {
            if(products) {
                let bestProducts = products.filter(product => product[1].view > 5)
                bestProducts.slice(0, 10).forEach(product => {
                    bestProductsContainer.insertAdjacentHTML('beforeend', `<div class="swiper-slide"><div class="rounded-lg bg-zinc-900 overflow-hidden">
                            <a href="#"
                               class="flex items-center justify-center w-full h-[120px] sm:h-[160px] md:h-[200px] rounded-md overflow-hidden">
                                <img class="w-full h-full object-cover" src="${product[1].img}" alt=""
                                     loading="lazy">
                            </a>
                            <div class="p-2">
                                <h4 class="text-sm md:text-base font-IRANSans-Medium line-clamp-2 mb-4 sm:mb-6 text-gray-200 h-10 md:h-12">
                                    ${product[1].detail}
                                </h4>
                                <div class="flex justify-between">
                                    <div class="flex flex-col justify-between sm:justify-start gap-y-2.5">
                                        <div class="flex items-center gap-x-1">
                                            <svg class="w-4 sm:w-5 h-4 sm:h-5 fill-amber-300 shrink-0 text-amber-300">
                                                <use href="#star"></use>
                                            </svg>
                                            <span class="font-IRANSans-Bold text-xs leading-5 sm:leading-[19px] sm:text-sm">
                                        4.5
                                    </span>
                                        </div>
                                        <div class="flex items-center gap-1 font-IRANSans-Bold text-xs tracking-tighter">
                                            <svg class="w-4 h-4"><use href="#eye"></use></svg>
                                            <span class="font-IRANSans">${product[1].view}</span>
                                        </div>
                                    </div>
                                    <div class="flex flex-col justify-between items-start sm:items-end flex-wrap gap-x-4">
                                        <div class="product__price flex items-center gap-x-1 font-IRANSans-Bold text-base tracking-wider md:text-xl text-white">
                                            ${product[1].price.toLocaleString()}
                                        </div>
                                        <div class="offer flex items-center gap-x-1 font-IRANSans-Bold text-base tracking-wider text-gray-400">
                                            ${product[1].costPrice.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onclick="addProductToBasket('${product[0]}')"
                                    class="flex text-gray-100 sm:mt-0.5 md:text-gray-300 items-center justify-center md:hover:text-white transition-colors w-full h-10 md:h-12 bg-indigo-600 font-IRANSans-Medium rounded-md tracking-tighter text-sm md:text-base">
                                افزودن به سبد خرید
                            </button>
                            </div></div>`)
                })
            }
        })
}

async function addProductToBasket(productId) {
    if (userId) {
        let allProducts = await getAllProducts()
        let updateProductView = null
        let mainProduct = null
        allProducts.forEach(product => {
            if (product[0] === productId) {
                updateProductView = {
                    view: product[1].view + 1
                }
                mainProduct = product
            }
        })
        let fetchUpdateProduct = await fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/products/${productId}.json`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateProductView)
        })

        let allBaskets = await getAllBasket()

        let mainBasketCount = null
        let mainBasketId = null
        if (allBaskets) {
            let isOnBasket = allBaskets.some(basket => {
                if (basket[1].productId === productId && basket[1].userId === userId && basket[1].checkOut === false) {
                    mainBasketCount = {
                        count: basket[1].count + 1
                    }
                    mainBasketId = basket[0]
                    return true
                }
            })
            if (isOnBasket) {
                let fetchUpdateBasket = await fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/baskets/${mainBasketId}.json`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(mainBasketCount)
                })
                    .then(res => {
                        if(res.ok) {
                            swal.fire({
                                title: 'محصول مورد نظر به سبد خرید شما اضافه شد',
                                icon: 'success',
                                confirmButtonText: 'ممنون'
                            })
                            addHeaderBasketToDom()
                            headerBasketPriceHandler()
                        }
                    })
            } else {
                let newBasket = {
                    productId: productId,
                    userId: userId,
                    img: mainProduct[1].img,
                    detail: mainProduct[1].detail,
                    costPrice: mainProduct[1].costPrice,
                    price: +mainProduct[1].price,
                    count: 1,
                    checkOut: false
                }

                let fetchBasket = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/baskets.json', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newBasket)
                })
                    .then(res => {
                        if(res.ok) {
                            swal.fire({
                                title: 'محصول مورد نظر به سبد خرید شما اضافه شد',
                                icon: 'success',
                                confirmButtonText: 'ممنون'
                            })
                            addHeaderBasketToDom()
                            headerBasketPriceHandler()
                        }
                    })
            }
        } else {
            let newBasket = {
                productId: productId,
                userId: userId,
                img: mainProduct[1].img,
                detail: mainProduct[1].detail,
                costPrice: mainProduct[1].costPrice,
                price: +mainProduct[1].price,
                count: 1,
                checkOut: false
            }

            let fetchBasket = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/baskets.json', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newBasket)
            })
                .then(res => {
                    if(res.ok) {
                        swal.fire({
                            title: 'محصول مورد نظر به سبد خرید شما اضافه شد',
                            icon: 'success',
                            confirmButtonText: 'ممنون'
                        })
                        addHeaderBasketToDom()
                        headerBasketPriceHandler()
                    }
                })
        }
    } else {
        Swal.fire({
            title: 'ابتدا وارد شوید',
            icon: 'info',
            confirmButtonText: 'فهمیدم'
        })
    }
}


window.addEventListener("load",  () => {
    const swiper = new Swiper(".mySwiper", {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 10,
        // Navigation arrows
        navigation: {
            nextEl: '.my-swiper-button-next',
            prevEl: '.my-swiper-button-prev',
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            410: {
                slidesPerView: 2,
                spaceBetween: 14,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 14,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        },
    });
    addProductsToDom()
    addBestProductsToDom()
})