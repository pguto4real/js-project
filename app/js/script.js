
// localStorage.setItem("activeSlide",0)
// api key : 51e92c068c4c48c5c4380d8ab4a65804
// image pathP: https://image.tmdb.org/t/p/w1280/

const moviesApi = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=51e92c068c4c48c5c4380d8ab4a65804"
// const upcomingMoviesApi = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=51e92c068c4c48c5c4380d8ab4a65804"
const tvApi = "https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&with_origin_country=US&page=1&sort_by=popularity.desc&api_key=51e92c068c4c48c5c4380d8ab4a65804"

const imagePath = "https://image.tmdb.org/t/p/w1280/"
// const youTubeVideoURL = "https://www.youtube.com/watch?v="
const genreApi = "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=51e92c068c4c48c5c4380d8ab4a65804"
// const searchUrl = "https://api.themoviedb.org/3/search/movie?query=deadpool&api_key=51e92c068c4c48c5c4380d8ab4a65804"

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

let activeSlide = 0
activeThumbnail = [0, 1, 2, 3]
console.log(activeThumbnail)
// if(width1200){

//     activeThumbnail = [0,1,2]
//     console.log(activeThumbnail)
// }
// else
// {

//     activeThumbnail = [0, 1, 2, 3]
//     console.log(activeThumbnail)
// }


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
const movie_menu = document.querySelector('.movie__menu--h2')
const movie_menu_ul = document.querySelector('.movie__menu--ul')

const addThumbnail = async (category, searchQuery = '') => {


    if (category === 'movies') {
        movie_menu.innerHTML = `Movies`
        movie__button.classList.add('active')
        movie__button.classList.add('disabled')
        show__button.classList.remove('active')
        show__button.classList.remove('disabled')
        // movie__button.classList.add('active')

        try {
            const result = await fetch(moviesApi)
            data = await result.json()
            displayThumbnail(data.results, 'movies')
        } catch (error) {

        }
    }
    else if (category === 'tv') {
        movie_menu.innerHTML = `Tv Shows`
        show__button.classList.add('active')
        show__button.classList.add('disabled')
        movie__button.classList.remove('active')
        movie__button.classList.remove('disabled')
        // movie__button.classList.add('active')
        console.log(movie__button.classList)
        try {
            const result = await fetch(tvApi)
            data = await result.json()
            displayThumbnail(data.results, 'tv')
        } catch (error) {

        }

    }
    else if (category === 'search') {

        console.log(searchQuery)
        movie_menu.innerHTML = `Search Result For  <span class="text__button--color">${searchQuery}</span>`
        // movie_menu_ul.style.display='none'

        movie__button.classList.remove('active')
        show__button.classList.remove('active')
        movie__button.classList.remove('disabled')
        movie__button.classList.remove('disabled')
        document.body.classList.remove("modal--open")
        const element = document.getElementById("movie__menu--wrap");

        element.scrollIntoView();
        // show__button.classList.add('active')
        // show__button.classList.add('disabled')
        // movie__button.classList.remove('active')
        // movie__button.classList.remove('disabled')
        // // movie__button.classList.add('active')
        // console.log(movie__button.classList)
        try {
            const result = await fetch(`https://api.themoviedb.org/3/search/multi?query=${searchQuery}&region=US&language=en-US&page=1&api_key=51e92c068c4c48c5c4380d8ab4a65804`)
            data = await result.json()

            let newData = data.results.filter((element) => {
                // console.log(element)
                if ((element.media_type === 'tv' && element.origin_country.includes('US')) && element.media_type !== 'person') {

                    if (element.backdrop_path !== null) {

                        console.log(element.backdrop_path)
                        return element
                    }

                }
                else if ((element.media_type === 'movie') && element.media_type !== 'person') {

                    if (element.backdrop_path !== null) {
                        return element
                    }

                }
            })

            displayThumbnail(newData, '', true)
        } catch (error) {

        }

    }
}

function displayThumbnail(data, category, search = false) {

    let dataValue = ``
    let i = 0;
    // console.log(data)
    let thumbNailHTML = data.forEach((image) => {
        // console.log(image)
        const { id, original_name, first_air_date, backdrop_path, original_title, release_date } = image
        activeStatus = activeThumbnail.includes(i) ? 'active' : ''
        if (search) {
            // console.log('i got here')
            // console.log(image.media_type)
            image_name = image.media_type !== 'tv' ? original_title : original_name
            image_release_date = image.media_type !== 'tv' ? release_date.split('-')[0] : first_air_date.split('-')[0]

            // console.log(release_date)
            // console.log(first_air_date)
            // console.log(image_name)
            // console.log(image_release_date)
        }
        else {
            image_name = category == 'movies' ? original_title : original_name
            image_release_date = category == 'movies' ? release_date.split('-')[0] : first_air_date.split('-')[0]
        }
        // console.log('i got here2')
        i++;
        dataValue += `<div onclick="ShowDetails(${id},'${category}')" class="movie__info--container  ${activeStatus}">
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
    // console.log('i got here3')
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
                                        <p class="movies__details--category" title="${newGenre}">${newGenre}</p>
                                       
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
}, 3000)


function toggleModal() {
    if (isModalOpen) {
        isModalOpen = false
        return document.body.classList.remove("modal--open")
    }
    isModalOpen = true
    document.body.classList += "modal--open"
}

function ShowDetails(movieId, category) {
    console.log(123)
    // alert(1)
    localStorage.setItem("category", category)
    localStorage.setItem("movieId", movieId)
    window.open(`${window.location.origin}/js-project/movie_details.html`, "_self")
    // window.location.href = `${window.location.origin}/user.html`
}

const loadSnippet = (targetDivClass) => {

    const targetEl = document.querySelector(`.${targetDivClass}`)

    fetch(`${targetDivClass}.html`)
        .then(res => {

            if (res.ok) {
                return res.text();
            }
        })
        .then(htmlSnippet => {

            targetEl.innerHTML = htmlSnippet
        })
}

window.addEventListener('load', () => {
    // alert(1)
    loadSnippet('header')
    loadSnippet('footer')
});


const search = (event, position) => {
    event.preventDefault();
    if (position === 'footer') {

    }
    position === 'footer' ? searchQuery = document.getElementById("searchQuery1").value : searchQuery = document.getElementById("searchQuery").value;
    console.log(searchQuery)
    addThumbnail('search', searchQuery)
}


// Media Queries

var width1200 = window.matchMedia("(max-width: 1200px)")
var width996 = window.matchMedia("(max-width: 995px)")
var width990 = window.matchMedia("(max-width: 990px)")
var minWWidth576 = window.matchMedia("(max-width: 576px)")

// console.log(x)

function checkMediaQueries(x, category = '') {
   console.log(x)
    if (x.matches) { // If media query matches

        activeThumbnail = [0, 1, 2]
        addThumbnail(category)
    } else {
        activeThumbnail = [0, 1, 2, 3]
        addThumbnail(category)

    }
}
function checkMediaQueries990(x, category = '') {
    console.log(x)
     if (x.matches) { // If media query matches
 
         activeThumbnail = [0, 1]
         addThumbnail(category)
     } else {
         activeThumbnail = [0, 1, 2]
         addThumbnail(category)
 
     }
 }
 function checkMediaQueries576(x, category = '') {
    console.log(x)
     if (x.matches) { // If media query matches
 
         activeThumbnail = [0]
         addThumbnail(category)
     } else {
         activeThumbnail = [0, 1]
         addThumbnail(category)
 
     }
 }
function checkMediaQueries996(x) {
    // console.log(show__button.classList.include('active'))

    title = document.querySelector('.movies__details.active')
    console.log(title)
    if (x.matches) { // If media query matches
        if (title.children[2].innerHTML.length > 15) {
            genre_split = title.children[2].innerHTML.split(',')
            genre_split.pop()
            genre_split.join(',')
            genre = genre_split.join(',')
            // console.log(genre)
            title.children[2].innerHTML = genre
        }

    } else {
        title.children[2].innerHTML = title.children[2].title
    }
}

width1200.addEventListener("change", function () {
    if (show__button.classList.item(1)) {
        category = show__button.classList.item(1) ? 'tv' : 'movies'
    }
    else if (movie__button.classList.item(1)) {
        category = movie__button.classList.item(1) ? 'movies' : 'tv'
    }


    checkMediaQueries(width1200, category);
    addThumbnail(category)
});

width996.addEventListener("change", function () {
    checkMediaQueries996(width996)
});

width990.addEventListener("change", function () {
    if (show__button.classList.item(1)) {
        category = show__button.classList.item(1) ? 'tv' : 'movies'
    }
    else if (movie__button.classList.item(1)) {
        category = movie__button.classList.item(1) ? 'movies' : 'tv'
    }


    checkMediaQueries990(width990, category);
    addThumbnail(category)
});

minWWidth576.addEventListener("change", function () {
    if (show__button.classList.item(1)) {
        category = show__button.classList.item(1) ? 'tv' : 'movies'
    }
    else if (movie__button.classList.item(1)) {
        category = movie__button.classList.item(1) ? 'movies' : 'tv'
    }


    checkMediaQueries576(minWWidth576, category);
    addThumbnail(category)
});

// checkMediaQueries(width1200, 'movies')
// checkMediaQueries990(width990, 'movies')
// checkMediaQueries576(minWWidth576, 'movies')