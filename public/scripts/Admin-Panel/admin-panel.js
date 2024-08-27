const $ = document
const panelMenuItem = $.querySelectorAll(".panel-menu__item")
const panelSections = $.querySelectorAll(".panel-section")
const mobilePanelItems = document.querySelectorAll(".mobile-panel__item")
const coverElem = $.querySelector(".cover")
const panelHomeLink = document.getElementById("panel-home-link")
const mobileAdminHomeBtn = document.querySelector('#mobile-admin-home-link')
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

const adminPanelHomeLinkHandler = () => {
    swal.fire({
        title: 'آیا می خواهید به سایت بازگردید ؟',
        icon: 'question',
        confirmButtonText: 'بله',
        showCancelButton: true,
        cancelButtonText: 'خیر'
    })
        .then(res => {
            if(res.isConfirmed) {
                location.href = `index.html?id=${userId}`
            }
        })
}

mobileAdminHomeBtn.addEventListener('click', adminPanelHomeLinkHandler)
panelHomeLink.addEventListener("click", adminPanelHomeLinkHandler)
