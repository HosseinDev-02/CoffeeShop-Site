const blogsContainer = document.getElementById("index-blogs-container")




async function getAllBlogs(){
    let fetchBlogs = await fetch('https://coffee-shop-6fe4c-default-rtdb.firebaseio.com/blogs.json')
    let allBlogs = await fetchBlogs.json()
    if(allBlogs){
        return Object.entries(allBlogs)
    }
}
async function addBlogsToDom(){
    blogsContainer.innerHTML = ''
    let allBlogsArray = await getAllBlogs()
    if(allBlogsArray){
        let blogsFragment = document.createDocumentFragment()
        allBlogsArray.forEach(blog => {
            let newBlogCard = document.createElement('div')
            newBlogCard.className = 'flex items-center sm:items-stretch flex-row sm:flex-col justify-between gap-2 bg-zinc-900 rounded-2xl overflow-hidden p-2'
            newBlogCard.innerHTML = `<div class="sm:h-40 h-full w-36 sm:w-auto shrink-0 rounded-2xl overflow-hidden"><img class="w-full h-full object-cover" src="${blog[1].img}" alt=""></div><div class="flex flex-col items-center justify-between gap-y-1"><div><h5 class="line-clamp-1 font-Shabnam-Bold mb-2 sm:text-lg">${blog[1].title}</h5><p class="line-clamp-2 text-sm sm:text-base font-Shabnam-Medium text-gray-400">${blog[1].text}</p><div class="flex items-center justify-end mt-4 mb-1"><a class="flex items-center gap-x-2 text-xs md:text-base transition-colors hover:text-indigo-400" href="#">ادامه مطالب<svg class="w-5 h-5"><use href="#arrow-left"></use></svg></a></div></div><div class="flex w-full justify-between items-center font-Shabnam-Medium border-dotted border-t border-t-gray-400 pt-3"><span class="flex items-center gap-x-1 text-xs md:text-sm tracking-tighter">${blog[1].date}<svg class="w-4 h-4"><use href="#calendar"></use></svg></span><span class="flex items-center gap-x-1 font-Shabnam-Medium text-xs md:text-sm">345<svg class="w-4 h-4"><use href="#eye"></use></svg></span></div></div>`
            blogsFragment.append(newBlogCard)
        })
        blogsContainer.append(blogsFragment)
    }
}





window.addEventListener('load', async () => {
    // await addBlogsToDom()
})