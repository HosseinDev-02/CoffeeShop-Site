// category variable

const categoriesContainer = document.getElementById("categories-container")


// Categories Functions

async function getAllCategories() {
    let fetchCategories = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/categories.json')
    let allCategories = await fetchCategories.json()
    if (allCategories) {
        return Object.entries(allCategories)
    }
}

async function addCategoriesToDom() {
    categoriesContainer.innerHTML = ''
    let categoriesArray = await getAllCategories()

    if (categoriesArray) {
        let categoriesFragment = document.createDocumentFragment()
        categoriesArray.forEach(category => {
            let newCategory = document.createElement('a')
            newCategory.className = `flex flex-col items-center gap-y-3 cursor-pointer relative text-center`
            newCategory.innerHTML = `<div class="category-banner w-20 md:w-32 h-20 md:h-32 rounded-md overflow-hidden">
                        <img class="w-full h-full object-cover" src="${category[1].img}" alt="">
                    </div>
                    <span class="category__title md:text-lg font-Shabnam-Light transition-all delay-75 inline-block text-white">
                        ${category[1].title}
                    </span>`
            categoriesFragment.append(newCategory)
        })
        categoriesContainer.append(categoriesFragment)
    }
}


window.addEventListener('load', async () => {
    // await addCategoriesToDom()
})