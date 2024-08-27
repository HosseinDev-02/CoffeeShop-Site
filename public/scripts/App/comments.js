const emailInputElem = document.querySelector('#user-mail')
const commentTextElem = document.querySelector('#user-comment-text')
const commentFormElem = document.querySelector('#user-comment-form')
const commentSubBtn = document.querySelector('#user-comment-submit')



commentSubBtn.addEventListener('click', e => {
    e.preventDefault()
    swal.fire({
        title: 'آیا از ارسال این کامنت اطمینان دارید ؟',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'خیر',
        confirmButtonText: 'بله'
    })
        .then(res => {
            if(res.isConfirmed) {
                let newComment = {
                    email: emailInputElem.value.trim(),
                    text: commentTextElem.value.trim(),
                    status: false
                }
                const fetchData = fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/comments.json', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newComment)
                })
                    .then(res => {
                        if(res.ok) {
                            swal.fire({
                                title: 'کامنت شما با موفقیت ارسال شد',
                                icon: 'success',
                                confirmButtonText: 'ممنون'
                            })
                                .then(res => {
                                    if(res.isConfirmed) {
                                        emailInputElem.value = ''
                                        commentTextElem.value = ''
                                    }
                                })
                        }
                    })
            }
        })
})