const $ = document
const panelMenuItem = $.querySelectorAll(".panel-menu__item")
const panelSections = $.querySelectorAll(".panel-section")
const mobilePanelItems = document.querySelectorAll(".mobile-panel__item")
const coverElem = $.querySelector(".cover")
const panelHomeLink = document.getElementById("panel-home-link")
jalaliDatepicker.startWatch();



function coverClickCloseModal(){
    if(!modalUser.className.includes("md:edit__user--hidden")){
        modalUserClose()
    }
    if(!editProductsModal.className.includes("md:edit__product--hidden")){
        modalProductsClose()
    }
    if(categoriesModal.className.includes("top-0")){
        modalCategoriesClose()
    }
    if(commentsModal.className.includes("top-0")){
        modalCommentsClose()
    }
    if(blogsModal.className.includes("top-0")){
        modalBlogsClose()
    }
    if(reserveModal.className.includes("top-0")){
        reserveModalClose()
    }
}


// Window Events

coverElem.addEventListener("click", coverClickCloseModal)
panelMenuItem.forEach(function (item){
    item.addEventListener("click", function (){
        $.querySelector(".panel-menu__item--active").classList.remove("panel-menu__item--active")
        item.classList.add("panel-menu__item--active")
        let mainIdSection = item.getAttribute("data-id")
        panelSections.forEach(function (section){
            if(section.className.includes("panel-section--active")){
                section.classList.remove("panel-section--active")
            }
            if(section.id === mainIdSection){
                section.classList.add("panel-section--active")
            }
        })

    })
})
mobilePanelItems.forEach(item => {
    item.addEventListener("click", () => {
        $.querySelector(".mobile-panel__item--active").classList.remove("mobile-panel__item--active")
        item.classList.add("mobile-panel__item--active")
        let mainIdSection = item.getAttribute("data-id")
        panelSections.forEach(function (section){
            if(section.className.includes("panel-section--active")){
                section.classList.remove("panel-section--active")
            }
            if(section.id === mainIdSection){
                section.classList.add("panel-section--active")
            }
        })

    })
})
window.addEventListener("load", function (){

})
panelHomeLink.addEventListener("click", e => {
    e.preventDefault()
    location.href = `http://localhost:3000/index.html?id=${userId}`
    // panelHomeLink.setAttribute("href", "index.html?id="+ userId +"")
})
