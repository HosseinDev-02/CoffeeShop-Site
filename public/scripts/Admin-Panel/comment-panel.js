// Comments Variable
const commentsEditIcons = document.querySelectorAll(".comments__edit")
const commentsModal = document.getElementById("comments-modal")
const commentModalBtn = document.getElementById("comment-modal-btn")
const commentsContainer = document.getElementById("comments-list")


// Comments Functions

async function getAllComments() {
    let fetchComments = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/comments.json')
    let allComments = await fetchComments.json()
    if (allComments) {
        return Object.entries(allComments)
    }
}

const addCommentsToDom = () => {
    let allComments = getAllComments()
        .then(allComments => {
            commentsContainer.innerHTML = ""
            let commentsFragment = document.createDocumentFragment()
            if (allComments) {
                allComments.forEach(comment => {
                    let newCommentRow = document.createElement('tr')
                    newCommentRow.className = 'h-16 md:h-20'
                    if (comment[1].status) {
                        newCommentRow.innerHTML = `<td><span onclick='removeComment("${comment[0]}")' class="text-red-700 cursor-pointer flex items-center justify-center"><svg class="w-6 h-6"><use href="#x-mark"></use></svg></span></td><td>${comment[1].firstname} ${comment[1].lastname}</td><td class="hidden lg:table-cell">${comment[1].mail}</td><td><button onclick="showCommentText('${comment[1].text}')" class="bg-indigo-400 rounded py-1 md:py-2 px-2 md:px-4" type="button">نمایش</button></td><td class='w-[152px]'><span onclick='commentCheck("${comment[0]}")' class="comments-status__icon text-indigo-600 cursor-pointer block comments-status--checked">تایید شد</span></td>`
                        commentsFragment.append(newCommentRow)
                    } else {
                        newCommentRow.innerHTML = `<td><span onclick='removeComment("${comment[0]}")' class="text-red-700 cursor-pointer flex items-center justify-center"><svg class="w-6 h-6"><use href="#x-mark"></use></svg></span></td><td>${comment[1].firstname} ${comment[1].lastname}</td><td class="hidden lg:table-cell">${comment[1].mail}</td><td><button onclick="showCommentText('${comment[1].text}')" class="bg-indigo-400 rounded py-1 md:py-2 px-2 md:px-4" type="button">نمایش</button></td><td><span onclick='commentCheck("${comment[0]}")' class="comments-status__icon text-red-700 cursor-pointer block comments-status--checked">تایید نشده</span></td>`
                        commentsFragment.append(newCommentRow)
                    }
                })
                commentsContainer.append(commentsFragment)
            }
        })
}

const showCommentText = text => {
    swal.fire({
        text: text,
        icon: 'info',
        confirmButtonText: 'دیدم'
    })
}

async function removeComment(commentId) {
    // let fetchRemoveComment = await fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/comments/${commentId}.json`, {
    //     method: "DELETE"
    // })
    // console.log(fetchRemoveComment)
    // await addCommentsToDom()
    // addCategoryImage.removeAttribute("src")
    swal.fire({
        title: 'فقط قسمت کاربران بک اند دارد',
        icon: 'info',
        confirmButtonText: 'فهمیدم'
    })
}

function modalCommentsOpen() {
    commentsModal.classList.remove("-top-[546px]")
    commentsModal.classList.add("top-0")
    coverElem.classList.remove("cover--hidden")
}

function modalCommentsClose() {
    commentsModal.classList.add("-top-[546px]")
    commentsModal.classList.remove("top-0")
    coverElem.classList.add("cover--hidden")
}

async function commentCheck(commentId) {
    let allComments = await getAllComments()
    let mainComment = null
    allComments.forEach(comment => {
        if (comment[0] === commentId) {
            mainComment = {
                firstname: comment[1].firstname,
                lastname: comment[1].lastname,
                mail: comment[1].mail,
                text: comment[1].text,
                status: !comment[1].status
            }
        }
    })
    swal.fire({
        title: 'آیا از تغییر وضعیت این کامنت اطمینان دارید ؟',
        icon: 'question',
        confirmButtonText: 'بله',
        showCancelButton: true,
        cancelButtonText: 'خیر'
    })
        .then(res => {
            if(res.isConfirmed) {
                try {
                    let fetchComment = fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/comments/${commentId}.json`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(mainComment)
                    })
                        .then(res => {
                            if(res.ok) {
                                swal.fire({
                                    title: 'وضعیت کامنت تغییر کرد',
                                    icon: 'success',
                                    confirmButtonText: 'ممنون'
                                })
                                    .then(res => {
                                        if(res.isConfirmed) {
                                            addCommentsToDom()
                                        }
                                    })
                            }
                        })

                } catch (err) {
                    swal.fire({
                        title: 'هنگام تغییر وضعیت کامنت مشکلی بوجود آمد',
                        icon: 'question',
                        confirmButtonText: 'فهمیدم'
                    })
                }
            }
        })
}


// Comments Events


window.addEventListener("load", () => {
    addCommentsToDom()
})
commentModalBtn.addEventListener("click", function () {
    modalCommentsClose()
})
commentsEditIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
        modalCommentsOpen()
    })
})