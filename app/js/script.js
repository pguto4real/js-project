
// localStorage.setItem("activeSlide",0)
// api key : 51e92c068c4c48c5c4380d8ab4a65804
// image pathP: https://image.tmdb.org/t/p/w1280/

const moviesApi = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=51e92c068c4c48c5c4380d8ab4a65804"
const upcomingMoviesApi = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=51e92c068c4c48c5c4380d8ab4a65804"
const tvApi = "https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&with_origin_country=US&page=1&sort_by=popularity.desc&api_key=51e92c068c4c48c5c4380d8ab4a65804"

const imagePath = "https://image.tmdb.org/t/p/w1280/"
const youTubeVideoURL = "https://www.youtube.com/watch?v="
const genreApi = "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=51e92c068c4c48c5c4380d8ab4a65804"
const searchUrl = "https://api.themoviedb.org/3/search/movie?query=deadpool&api_key=51e92c068c4c48c5c4380d8ab4a65804"

// const exportData = {
//     moviesApi:moviesApi,
//     tvApi:tvApi,
//     imagePath:imagePath,
//     youTubeVideoURL:youTubeVideoURL,
//     searchUrl:searchUrl,
// }
// export exportData;
// https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc"

getMovies(moviesApi)
getgenre(genreApi)
let genre = {};
async function getMovies(url) {
    try {
        const result = await fetch(url)
        const data = await result.json()


        addSliderImg(data.results)
    } catch (error) {

    }
}

async function getgenre(url) {

    let genre_data = ''
    try {
        const result = await fetch(url)
        const data = await result.json()
        // console.log(data.genres)
        let count = 0;
        data.genres.some((genre) => {

            genre_data += genre.id + "=>" + genre.name + ", "
        })
    } catch (error) {

    }

    localStorage.setItem("genre_data", genre_data)
    return genre_data
}



console.log(genre)

let activeSlide = 0
let activeThumbnail = [0, 1, 2, 3]
let isModalOpen = false
let movie__info_length = 0
let movie__info__wrapper = ''
let movie__info__container = ''


// const slider_images = [
//     'app/img/bad-boys.jpg',
//     'app/img/deadpool.jpg',
//     'app/img/insideout2.jpg',
//     'app/img/jl3.jpg',
// ]
// const thumbnail_images = [
//     'app/img/deadpool_thumbnail.jpg',
//     'app/img/bad-boys.jpg',
//     'app/img/jl3.jpg',
//     'app/img/insideout2.jpg',

//     'app/img/deadpool_thumbnail.jpg',
//     'app/img/bad-boys.jpg',
//     'app/img/jl3.jpg',
//     'app/img/insideout2.jpg',

//     'app/img/deadpool_thumbnail.jpg',
//     'app/img/bad-boys.jpg',
//     'app/img/jl3.jpg',
//     'app/img/insideout2.jpg',

//     'app/img/deadpool_thumbnail.jpg',
//     'app/img/bad-boys.jpg',
//     'app/img/jl3.jpg',
//     'app/img/insideout2.jpg',

// ]

const slider_container = document.querySelector('.slider__container')
const movie__thumbnails = document.querySelector('.movie__thumbnails')
const banner__area_before = document.querySelector('.banner__area');
const movie__button = document.querySelector('.movies__button')
const show__button = document.querySelector('.show__button')
const movie__buttonID = document.getElementById('movies__button')
const show__buttonID = document.getElementById('show__button')

const addThumbnail = async (category) => {


    if(category === 'movies'){
        // movie__buttonID.setAttribute("class", "disabled");
        movie__button.classList.add('active')
        movie__button.classList.add('disabled')
        show__button.classList.remove('active')
        show__button.classList.remove('disabled')
        // movie__button.classList.add('active')
        console.log(movie__button.classList)
        try {
            const result = await fetch(moviesApi)
           data = await result.json()
           displayThumbnail(data.results,'movies')
        } catch (error) {
    
        }
    }
    else{
        show__button.classList.add('active')
        show__button.classList.add('disabled')
        movie__button.classList.remove('active')
        movie__button.classList.remove('disabled')
        // movie__button.classList.add('active')
        console.log(movie__button.classList)
        try {
            const result = await fetch(tvApi)
           data = await result.json()
           displayThumbnail(data.results,'tv')
        } catch (error) {
    
        }
  
    }
}

function displayThumbnail(data,category){

    let dataValue = ``
    let i = 0;
    
    let thumbNailHTML = data.forEach((image) => {
  
        const {id,original_name,first_air_date,backdrop_path,original_title,release_date}=image
        activeStatus = activeThumbnail.includes(i) ? 'active' : ''
      
        image_name = category=='movies'?original_title : original_name
        image_release_date = category=='movies'?release_date.split('-')[0] : first_air_date.split('-')[0]
        i++;
        dataValue+=`<div onclick="ShowDetails(${id},'${category}')" class="movie__info--container  ${activeStatus}">
                    <figure class="movie__info--figure">
                        <img class="movie__img" src="${imagePath}${backdrop_path}" alt="">
                    </figure>
                    <div class="movie__info--data">
                        <div class="movie__info--top">
                            <span class="movie__info--title">${image_name}</span>
                            <span class=" movie__info--date text__button--color">${image_release_date}</span>
                        </div>
                        <div class="movie__info--bottom">
                            <p class="movie__hd">HD</p>
                            <p class="movies__details--year">
                                <i class="far fa-clock text__button--color left" aria-hidden="true"></i>128 min
                                <i class="fas fa-thumbs-up text__button--color right"></i>3.5
                            </p>
                        </div>
                    </div>
                </div>`
    })
    
    movie__thumbnails.innerHTML = dataValue
}
async function addSliderImg(images) {
    let active = images[0];
    // console.log(active)
    banner__area_before.style.backgroundImage = `url(${imagePath}${active.poster_path})`
    let data = ``;
    let genreNewData = [];
    let genreData = localStorage.getItem('genre_data').split(" ").forEach((genreLocal) => {
        let splitData = genreLocal.split('=>')
        genreNewData[splitData[0]] = splitData[1]
    })



    let sliderHTML = images.forEach(async (image) => {
        let newGenre = ""
        image.genre_ids.map((genre_id) => {
            newGenre += genreNewData[genre_id]
            // console.log(genreNewData[genre_id])
        })
        newGenre[newGenre.length - 1] == ',' ? newGenre[newGenre.length - 1] = '' : ''

        activeStatus = active === image ? 'active' : ''
        data += `<div class="movie__info--wrapper ">
                            <div class="movie movie__content ${activeStatus}">
                                <h2 class="movies__title ">${image.original_title} </h2>
                                <!-- <p class="movies__overview">After their late former Captain is framed, Lowrey and Burnett try to
                                    clear his name, only to end up on the run themselves.</p> -->
                                    <div class="movies__details ${activeStatus}">
                                        <p class="movies__details--quality">pg 18</p>
                                        <p class="hd">HD</p>
                                        <p class="movies__details--category">${newGenre}</p>
                                       
                                        <p class="movies__details--year"><i class="far fa-calendar-alt text__button--color"></i>${image.release_date.split('-')[0]}</p>
                                        <p class="movies__details--year"><i class="far fa-clock text__button--color"></i>128 min</p>
    
                                    </div>
                                    <a href="" class="movie__button"><i class="fas fa-play"></i>Watch Now</a>
                                    <!-- <button type="button" class="movie__button"><i class="fas fa-circle-play"></i>Watch Now</button> -->
                            </div>
                        
                        <div class="movie movie__img--wrapper ${activeStatus}">
                                <figure class="movie__img--figure">
                                    <img src="${imagePath}${image.backdrop_path}" alt="${imagePath}${image.poster_path}">
                                    
                                </figure>
                        </div>
                    </div>`
    })

    slider_container.innerHTML = data
    movie__info_length = document.querySelectorAll('.movie__info--wrapper').length
    movie__info__wrapper = document.querySelectorAll('.movie__info--wrapper')
    movie__info__container = document.querySelectorAll('.movie__info--container')

}


addThumbnail('movies')

const banner__area = document.querySelector('.banner__area');
const rightBtn = document.querySelector('#right')
const leftBtn = document.querySelector('#left')



const setBgBody = () => {
    banner__area.style.backgroundImage = `url(${movie__info__wrapper[activeSlide].querySelector('img').alt})`
}


const updateActiveThumbnail = (direction) => {
    let movieContainer = document.querySelectorAll('.movie__info--container')
    if (direction == 'right') {
        leftBtn.disabled = false
        leftBtn.classList.remove('disabled')
        
        if (activeThumbnail[activeThumbnail.length - 1] === movieContainer.length - 1) {
           
            rightBtn.disabled = true
            rightBtn.classList.add('disabled')
        }
        else {
        

            let newData = activeThumbnail.map((data) => {

                return data + 1
            })
            activeThumbnail = newData
         
        }
    }
    else {
        rightBtn.disabled = false
        rightBtn.classList.remove('disabled')
        if (activeThumbnail[0] === 0) {
            leftBtn.disabled = true
            leftBtn.classList.add('disabled')
        }
        else {

            let newData = activeThumbnail.map((data) => {

                return data - 1
            })
            activeThumbnail = newData
        }
    }


    updateThumbnail(activeThumbnail)

}


const updateThumbnail = (data) => {

    let activemovieContainer = document.querySelectorAll('.movie__info--container.active')
    let movieContainer = document.querySelectorAll('.movie__info--container')
    activemovieContainer.forEach(slides => {
        slides.classList.remove('active')
    }
    )
    data.forEach(id => {
        
        movieContainer[id].classList.add('active')

    }
    )
}

rightBtn.addEventListener('click', () => {

    updateActiveThumbnail('right')

})
show__button.addEventListener('click', (e) => {
    e.preventDefault();
    addThumbnail('tv')

})
movie__button.addEventListener('click', (e) => {
    e.preventDefault();
    addThumbnail('movies')

})


leftBtn.addEventListener('click', () => {

    updateActiveThumbnail('left')

})
const nextSlide = () => {

    activeSlide++
    if (activeSlide > movie__info_length - 1) {
        activeSlide = 0
    }
}

const setActiveSlide = () => {
    // console.log(movie__info__wrapper)
    movie__info__wrapper.forEach(slides => {

        slides.querySelector('.movie__img--wrapper').classList.remove('active')

        slides.querySelector('.movie__content').classList.remove('active')
    }
    )
    movie__info__wrapper[activeSlide].querySelector('.movie__img--wrapper').classList.add('active')
    movie__info__wrapper[activeSlide].querySelector('.movie__content').classList.add('active')
}
setInterval(() => {

    nextSlide()
    setBgBody()
    setActiveSlide()
}, 7000)


function toggleModal() {
    if (isModalOpen) {
        isModalOpen = false
        return document.body.classList.remove("modal--open")
    }
    isModalOpen = true
    document.body.classList += " modal--open"
}

function ShowDetails(movieId,category){
    console.log(123)
    // alert(1)
    localStorage.setItem("category",category)
    localStorage.setItem("movieId",movieId)
    window.open(`${window.location.origin}/movie_details.html`, "_self")
    // window.location.href = `${window.location.origin}/user.html`
}

const loadSnippet = (targetDivClass)=>{

    const targetEl = document.querySelector(`.${targetDivClass}`)
   
    fetch (`${targetDivClass}.html`)
    .then(res=>{
        
        if(res.ok){
            return res.text();
        }
    })
    .then(htmlSnippet=>{
     
        targetEl.innerHTML = htmlSnippet
    })
}

window.addEventListener('load', ()=>{
    // alert(1)
    loadSnippet('header')
    // loadSnippet('footer')
});