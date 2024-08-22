const totalBasketPrice = document.getElementById("total-basket-price")

async function getAllBasket (){
    let fetchBaskets = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/baskets.json')
    let allBaskets = await fetchBaskets.json()
    if(allBaskets){
        return Object.entries(allBaskets)
    }
}
const basketMinusCountAction = (basketId, addBasketToDom, basketPriceHandler) => {
    let allBaskets = getAllBasket()
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
                try {
                    let fetchDeleteBasket = fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/baskets/${basketId}.json`, {
                        method: 'DELETE'
                    })
                        .then(result => {
                            if(result.ok) {
                                console.log(fetchDeleteBasket)
                                Swal.fire({
                                    title: 'محصول مورد نظر حذف شد',
                                    icon: 'success',
                                    confirmButton: true,
                                    cancelButton: true
                                })
                                    .then(result => console.log(result))
                                addBasketToDom()
                                basketPriceHandler()
                            }
                        })

                } catch (err) {
                    console.log(err, 'مشکلی در حذف محصول از سبد خرید رخ داد')
                }
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
                console.log(fetchUpdateBasket)
            }
        })


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
async function userBasket () {
    let allBaskets = await getAllBasket()
    return allBaskets.filter(basket => basket[1].userId === userId)
}

async function headerBasketPriceHandler() {
    let userBasketArray = await userBasket()
    let sumBasketPrice = 0
    userBasketArray.forEach(basket => sumBasketPrice += (basket[1].costPrice * basket[1].count))
    totalBasketPrice.innerHTML = `${sumBasketPrice.toLocaleString()} تومان `
}




export {
    basketMinusCountAction,
    basketPlusCountAction,
    headerBasketPriceHandler,
    userBasket,
    totalBasketPrice,
    getAllBasket
}