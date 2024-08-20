// products variable

const productLikeIcon = document.querySelectorAll(".product-like--icon")
const productsContainer = document.getElementById("products-container")
let allProductsArray = JSON.parse(localStorage.getItem("products"))
const bestProductsContainer = document.getElementById("best-products-container")


// Products Functions

function separate(number) {
    let y = number
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(y)) {
        y = y.replace(rgx, '$1' + ',' + '$2');
    }
    return y
}

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


async function addProductsToDom() {
    let allProducts = await getAllProducts()
    if (allProducts) {
        let productsFragment = document.createDocumentFragment()
        allProducts.forEach(product => {
            let newProductCard = document.createElement('div')
            newProductCard.className = 'rounded-lg bg-zinc-900 overflow-hidden'
            if(product[1].offer === '0'){
                newProductCard.innerHTML = `<a href="#" class="flex items-center justify-center w-full h-[140px] xs:h-[200px] rounded overflow-hidden"><img class="w-full h-full object-cover" src="${product[1].img}" alt="" loading="lazy"></a><div class="p-2 md:p-3 sm:mb-2"><h4 class="h-10 md:h-12 text-sm md:text-base font-Shabnam-Medium line-clamp-2 mb-5 text-gray-400">${product[1].detail}</h4><div class="flex items-center md:items-end justify-between flex-wrap sm:gap-y-2"><div class="flex flex-col items-end justify-between xs:items-start flex-wrap"><div class="product__price flex items-center gap-x-1 font-Shabnam-Bold text-lg md:text-xl text-white">${separate(product[1].costPrice.toString())}<span class="text-xs md:text-base font-Shabnam-Regular">تومان</span></div><div class="offer flex items-center gap-x-1.5 font-Shabnam-Bold text-white">${separate(product[1].price.toString())}<span class="inline text-sm tracking-tighter font-Shabnam-Regular">تومان</span></div></div><div class="hidden md:flex xs:flex-col items-center xs:items-end flex-wrap justify-between gap-y-1 gap-x-1 w-full xs:w-auto"><span class="flex items-center gap-x-1 font-Shabnam-Medium text-xs md:text-sm">${product[1].view}<svg class="w-4 h-4"><use href="#eye"></use></svg></span><div class="flex items-center"><svg class="w-4 md:w-5 h-4 md:h-5"><use href="#star"></use></svg><svg class="w-4 md:w-5 h-4 md:h-5 heart--fill"><use href="#star"></use></svg><svg class="w-4 md:w-5 h-4 md:h-5 heart--fill"><use href="#star"></use></svg><svg class="w-4 md:w-5 h-4 md:h-5 heart--fill"><use href="#star"></use></svg><svg class="w-4 md:w-5 h-4 md:h-5 heart--fill"><use href="#star"></use></svg></div></div></div></div><button onclick='addProductToBasket("${product[0]}")' class="hidden md:flex items-center justify-center hover:text-white transition-colors w-full h-12 bg-indigo-600 font-Shabnam-Medium rounded-md text-sm md:text-base">افزودن به سبد خرید</button>`
            }else{
                newProductCard.innerHTML = `<a href="#" class="flex items-center justify-center w-full h-[140px] xs:h-[200px] rounded overflow-hidden"><img class="w-full h-full object-cover" src="${product[1].img}" alt="" loading="lazy"></a><div class="p-2 md:p-3 sm:mb-2"><h4 class="h-10 md:h-12 text-sm md:text-base font-Shabnam-Medium line-clamp-2 mb-5 text-gray-400">${product[1].detail}</h4><div class="flex items-center md:items-end justify-between flex-wrap sm:gap-y-2"><span class="bg-red-500 flex md:hidden items-center justify-center w-8 h-8 rounded-full text-xs font-Shabnam-Bold">${product[1].offer}</span><div class="flex flex-col items-end justify-between xs:items-start flex-wrap"><div class="product__price flex items-center gap-x-1 font-Shabnam-Bold text-lg md:text-xl text-white">${separate(product[1].costPrice.toString())}<span class="text-xs md:text-base font-Shabnam-Regular">تومان</span></div><div class="offer flex items-center gap-x-1.5 font-Shabnam-Bold text-white">${separate(product[1].price.toString())}<span class="inline text-sm tracking-tighter font-Shabnam-Regular">تومان</span></div></div><div class="hidden md:flex xs:flex-col items-center xs:items-end flex-wrap justify-between gap-y-1 gap-x-1 w-full xs:w-auto"><span class="flex items-center gap-x-1 font-Shabnam-Medium text-xs md:text-sm">${product[1].view}<svg class="w-4 h-4"><use href="#eye"></use></svg></span><div class="flex items-center"><svg class="w-4 md:w-5 h-4 md:h-5"><use href="#star"></use></svg><svg class="w-4 md:w-5 h-4 md:h-5 heart--fill"><use href="#star"></use></svg><svg class="w-4 md:w-5 h-4 md:h-5 heart--fill"><use href="#star"></use></svg><svg class="w-4 md:w-5 h-4 md:h-5 heart--fill"><use href="#star"></use></svg><svg class="w-4 md:w-5 h-4 md:h-5 heart--fill"><use href="#star"></use></svg></div></div></div></div><button onclick='addProductToBasket("${product[0]}")' class="hidden md:flex items-center justify-center hover:text-white transition-colors w-full h-12 bg-indigo-600 font-Shabnam-Medium rounded-md text-sm md:text-base">افزودن به سبد خرید</button>`
            }

            productsFragment.append(newProductCard)
        })
        productsContainer.append(productsFragment)
    }
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

        console.log('fetchUpdateProduct : ', fetchUpdateProduct)

        let allBaskets = await getAllBasket()

            let mainBasketCount = null
        let mainBasketId = null
        if (allBaskets) {
            let isOnBasket = allBaskets.some(basket => {
                if (basket[1].productId === productId && basket[1].userId === userId) {
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
                console.log('fetchUpdateBasket : ', fetchUpdateBasket)
            } else {
                let newBasket = {
                    productId: productId,
                    userId: userId,
                    img: mainProduct.img,
                    detail: mainProduct.detail,
                    costPrice: mainProduct.costPrice,
                    price: mainProduct.price,
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
                console.log('fetchBasket : ', fetchBasket)
            }
        } else {
            let newBasket = {
                productId: productId,
                userId: userId,
                img: mainProduct.img,
                detail: mainProduct.detail,
                costPrice: mainProduct.costPrice,
                price: mainProduct.price,
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
            console.log('fetchBasket : ', fetchBasket)
        }
    } else {
        alert("ابتدا وارد شوید !")
    }
}



window.addEventListener("load", async () => {
    // await addProductsToDom()
})