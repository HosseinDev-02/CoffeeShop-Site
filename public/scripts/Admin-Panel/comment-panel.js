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

async function addCommentsToDom() {
    let allComments = await getAllComments()
    commentsContainer.innerHTML = ""
    let commentsFragment = document.createDocumentFragment()
    if (allComments) {
        allComments.forEach(comment => {
            let newCommentRow = document.createElement('tr')
            newCommentRow.className = 'h-24 text-lg child:font-Shabnam-Medium'
            if (comment[1].status) {
                newCommentRow.innerHTML = `<td><span onclick='removeComment("${comment[0]}")' class="text-red-700 cursor-pointer flex items-center justify-center"><svg class="w-6 h-6"><use href="#x-mark"></use></svg></span></td><td>${comment[0]}</td><td>${comment[1].firstname}</td><td>${comment[1].lastname}</td><td>${comment[1].mail}</td><td class="max-w-[300px]"><p class="line-clamp-2 text-right">${comment[1].text}</p></td><td class='w-[152px]'><span onclick='commentCheck("${comment[0]}")' class="comments-status__icon text-green-700 cursor-pointer block comments-status--checked">تایید شد</span></td>`
                commentsFragment.append(newCommentRow)
            } else {
                newCommentRow.innerHTML = `<td><span onclick='removeComment("${comment[0]}")' class="text-red-700 cursor-pointer flex items-center justify-center"><svg class="w-6 h-6"><use href="#x-mark"></use></svg></span></td><td>${comment[0]}</td><td>${comment[1].firstname}</td><td>${comment[1].lastname}</td><td>${comment[1].mail}</td><td class="max-w-[300px]"><p class="line-clamp-2 text-right">${comment[1].text}</p></td><td><span onclick='commentCheck("${comment[0]}")' class="comments-status__icon text-red-700 cursor-pointer block comments-status--checked">در انتظار تایید</span></td>`
                commentsFragment.append(newCommentRow)
            }
        })
        commentsContainer.append(commentsFragment)
    }
}

async function removeComment(commentId) {
    let fetchRemoveComment = await fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/comments/${commentId}.json`, {
        method: "DELETE"
    })
    console.log(fetchRemoveComment)
    await addCommentsToDom()
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
    try {
        let fetchComment = await fetch(`https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/comments/${commentId}.json`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(mainComment)
        })
        console.log(fetchComment)
        await addCommentsToDom()
    } catch (err) {
        console.log(err, 'هنگام تغییر وضعیت کامنت مشکلی بوجود آمد')
        alert('هنگام تغییر وضعیت کامنت مشکلی بوجود آمد')
    }
}


// Comments Events


window.addEventListener("load", async () => {
    // await addCommentsToDom()
})
commentModalBtn.addEventListener("click", function () {
    modalCommentsClose()
})
commentsEditIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
        modalCommentsOpen()
    })
})