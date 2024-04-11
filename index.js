const apiKey = '61df54b40a4e408d906a0d84e8237bed'

const blogContainer = document.getElementById('blog-container')

const searchField = document.getElementById('search-input')

const searchButton = document.getElementById('search-button')

async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${apiKey}`

        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log(data);
        return data.articles
    }
    catch(error){
        console.error('Error fetching random news',error)
        return []
    }
}

searchButton.addEventListener('click', async () =>{
    const query = searchField.value.trim()

    if (query !== ''){
        try{
            const articles  = await fetchNewsQuery(query)

            displayBlogs(articles)
        }catch(error){
            console.log('error fetching news by query',error)
        }

    }
})

async function fetchNewsQuery (query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&apiKey=${apiKey}`

        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log(data);
        return data.articles
    }
    catch(error){
        console.error('Error fetching random news',error)
        return []
    }

}

function displayBlogs(articles) {
    blogContainer.innerHTML = '';

    articles.filter((article) => Boolean(article.author)).forEach((article) => {
        const blogCard = document.createElement('div')
        blogCard.classList.add('card', 'm-3')
        blogCard.style.width = '18rem'

        const img = document.createElement('img')
        img.src = article.urlToImage
        img.classList.add('card-img-top')
        img.alt = article.title

        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body')

        const title = document.createElement('h5')
        title.classList.add('card-title', 'text-success')
        title.textContent = article.title

        const description = document.createElement('p')
        description.classList.add('card-text')
        description.textContent = article.description

        const readMoreLink = document.createElement('a')
        readMoreLink.href = article.url
        readMoreLink.target = "_blank"
        readMoreLink.classList.add('btn', 'btn-success')
        readMoreLink.textContent = 'Read More'

        cardBody.appendChild(title)
        cardBody.appendChild(description)
        cardBody.appendChild(readMoreLink)
        cardBody.addEventListener('click', () => {
            window.open(article.url, '_blank')
        })



        blogCard.appendChild(img)
        blogCard.appendChild(cardBody)

        blogContainer.appendChild(blogCard)
    });
}


document.addEventListener('DOMContentLoaded', async () => {
    try {
        const articles = await fetchRandomNews();
        console.log(articles);
        displayBlogs(articles);
    } catch (error) {
        console.error('Error fetching random news', error);
    }
});