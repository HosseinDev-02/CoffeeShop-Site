const showSwal = (title, icon, buttons, callback) => {
    swal({
        title: title,
        icon: icon,
        buttons: buttons
    }).then(result => callback(result))
}

export { showSwal }