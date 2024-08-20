let locationSearchParams = new URLSearchParams(location.search)
let userId = locationSearchParams.get("id")

async function getAllUsers(){
    let fetchUsers = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/users.json')
    let allUsers = await fetchUsers.json()
    if(allUsers){
        return Object.entries(allUsers)
    }
}
