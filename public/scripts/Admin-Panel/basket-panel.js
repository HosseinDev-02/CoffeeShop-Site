// Basket Variable
let allBasketsArray = []
const basketsContainer = document.getElementById("baskets-list")






// Basket Functions

function addBasketsToDom(allBaskets){
    basketsContainer.innerHTML = ""
    allBaskets.forEach(function (basket){
        if(basket.checkOut === false){
            basketsContainer.insertAdjacentHTML("beforeend", "<tr class=\"h-24 text-lg child:font-Shabnam-Medium\"><td><span onclick='removeBasket("+ basket.userId +")' class=\"text-red-700 cursor-pointer flex items-center justify-center\"><svg class=\"w-6 h-6\"><use href=\"#x-mark\"></use></svg></span></td><td>"+ basket.id +"</td><td>"+ basket.count +"</td><td>"+ basket.productId +"</td><td>"+ basket.userId +"</td><td><img class=\"w-20 h-20 mx-auto object-cover\" src=\""+ basket.img +"\" alt=\"\"></td><td class=\"w-[152px]\"><span class=\"comments-status__icon text-red-700 cursor-pointer block comments-status--checked\">در انتظار پرداخت</span></td></tr>")
        }else{
            basketsContainer.insertAdjacentHTML("beforeend", `<tr class="h-24 text-lg child:font-Shabnam-Medium"><td><span onclick='removeBasket(${basket.userId})' class="text-red-700 cursor-pointer flex items-center justify-center"><svg class="w-6 h-6"><use href="#x-mark"></use></svg></span></td><td>${basket.id}</td><td>${basket.count}</td><td>${basket.productId}</td><td>${basket.userId}</td><td><img class="w-20 h-20 mx-auto object-cover" src="${basket.img}" alt=""></td><td class="w-[152px]"><span class="comments-status__icon text-green-700 cursor-pointer block comments-status--checked">پرداخت شد</span></td></tr>`)
        }
    })
}
function removeBasket(userId){
    let mainBasket = allBasketsArray.filter(function (basket){
        return basket.userId !== userId
    })
    addBasketsToDom(mainBasket)
    setBasketToLocal(mainBasket)
}
function setBasketToLocal(allBasket){
    localStorage.setItem("basket", JSON.stringify(allBasket))
}