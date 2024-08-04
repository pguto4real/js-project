
// localStorage.setItem("activeSlide",0)
// api key : 51e92c068c4c48c5c4380d8ab4a65804
// image pathP: https://image.tmdb.org/t/p/w1280/

// const moviesApi = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=51e92c068c4c48c5c4380d8ab4a65804"
// const upcomingMoviesApi = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=51e92c068c4c48c5c4380d8ab4a65804"
// const tvApi = "https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&with_origin_country=US&page=1&sort_by=popularity.desc&api_key=51e92c068c4c48c5c4380d8ab4a65804"

const imagePath = "https://image.tmdb.org/t/p/w1280/"
const youTubeVideoURL = "https://www.youtube.com/watch?v="
// const genreApi = "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=51e92c068c4c48c5c4380d8ab4a65804"
// const searchUrl = "https://api.themoviedb.org/3/search/movie?query=deadpool&api_key=51e92c068c4c48c5c4380d8ab4a65804"
const category = localStorage.getItem('category')
const movieId = localStorage.getItem('movieId')
const modieDetailAPI = `https://api.themoviedb.org/3/movie/${movieId}?&append_to_response=videos&api_key=51e92c068c4c48c5c4380d8ab4a65804`
const tvDetailAPI = `https://api.themoviedb.org/3/tv/${movieId}?&append_to_response=videos&api_key=51e92c068c4c48c5c4380d8ab4a65804`
// const exportData = {
//     moviesApi:moviesApi,
//     tvApi:tvApi,
//     imagePath:imagePath,
//     youTubeVideoURL:youTubeVideoURL,
//     searchUrl:searchUrl,
// }
// export exportData;
// https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc"

getMovieById()
const slider_container = document.querySelector('.movie_detail__container')
const body = document.querySelector('body')
async function getMovieById() {
    try {
        if(category == 'tv')
        {
            const result = await fetch(tvDetailAPI)
            const data = await result.json()
            console.log(data)
            showMovies(data)
        }
        else
        {
            const result = await fetch(modieDetailAPI)
            const data = await result.json()
            console.log(data)
            showMovies(data)
        }
       
        // addSliderImg(data.results)
    } catch (error) {

    }
}

async function showMovies(data) {
    const {original_name,first_air_date,backdrop_path,original_title,overview,runtime,tagline,genres,release_date}=data

    
            if(category == 'tv')
                {
                    title = original_name.split(' ')
                    second_title = title.length > 1 ? title[title.length-1]:''
                    first_title = title.length > 1 ? title.pop():original_title
                    image_release_date =  first_air_date.split('-')[0]
                }
                else
                {
                    title = original_title.split(' ')
    second_title = title.length > 1 ? title[title.length-1]:''
    first_title = title.length > 1 ? title.pop():original_title
    image_release_date =  release_date.split('-')[0] 
                }
               
                
let genre="";
let i = 0
    genres.forEach(element => {
        genre+=element.name
        i++
        if(i<=genres.length-1)
        {
            genre+=", "
        }
        
        
        
    });
    box = document.createElement('div')
    box1 = document.createElement('div')
    box1.setAttribute( "class", "mfp-bg mfp-ready" );
    box.setAttribute( "class", "mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready" );
    box.setAttribute( "tabindex", "-1" );
    box.setAttribute( "style", "overflow: hidden auto;" );
    box.innerHTML = `<div class="mfp-container mfp-s-ready mfp-iframe-holder">
            <div class="mfp-content">
                <div onclick="clickToOpen(event,true)" class="mfp-iframe-scaler"><button title="Close (Esc)" type="button"
                        class="mfp-close">×</button><iframe class="mfp-iframe"
                        // src="//www.youtube.com/embed/${data.videos.results[0]?.key}?autoplay=1" frameborder="0"
                        allowfullscreen=""></iframe></div>
            </div>
            <div class="mfp-preloader">Loading...</div>
        </div>`
        body.appendChild(box1)
body.appendChild(box)
document.querySelector('.mfp-ready').setAttribute('style','display:none')
document.querySelector('.mfp-wrap').setAttribute('style','display:none')
    if(genre.length > 30){
        genre_split = genre.split(',')
        genre_split.pop()
        genre_split.join(',')
        genre = genre_split.join(',')
    }

    console.log(genre.length)
    console.log(title.join(' '))
    console.log(second_title)
    slider_container.innerHTML = `
    <div class="movie__wrapper">
                    <div class="movie movie__img--wrapper">
                        <figure class="movie-img">
                            <img src="${imagePath}${backdrop_path}" alt="">
                            <a onclick="clickToOpen(event,false)" href="#" class="popup-video"><img
                                    src="app/img/play_icon.png" alt=""></a>
                        </figure>
                    </div>
                    <div class="movie movie__details">
                        <div class="movie-details-content">
                            <h5>${tagline}</h5>
                            <h2>${title.join(' ')}<span class="text__button--color"> ${second_title}</span></h2>
                            <div class="movies__detail">
                                <p class="movies__details--quality">pg 18</p>
                                <p class="hd">HD</p>
                                <p class="movies__details--category">${genre}</p>
    
                                <p class="movies__details--year"><i class="far fa-calendar-alt text__button--color"></i>${image_release_date}
                                </p>
                                <p class="movies__details--year"><i class="far fa-clock text__button--color"></i>${runtime} min</p>
    
                            </div>
                            <p class="movies__detail--desc">${overview}</p>
                            <div class="movie-details-prime">
                                <ul>
                                    <li class="share"><a href="#"><i class="fas fa-share-alt"></i> Share</a></li>
                                    <li class="streaming">
                                        <h6>Prime Video</h6>
                                        <span>Streaming Channels</span>
                                    </li>
                                    <li class="watch" onclick="clickToOpen(event,false)"><a href="#"
                                            class="btn popup-video"><i class="fas fa-play"></i> Watch Now</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="movie movie__description">
                      
                    </div>
                </div>`
    
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
    loadSnippet('footer')
});

function clickToOpen(event,bool) {
    event.preventDefault();
    if(bool==true){
        
        document.querySelector('.mfp-ready').setAttribute('style','display:none')
        document.querySelector('.mfp-wrap').setAttribute('style','display:none')
    }
    else{
        document.querySelector('.mfp-ready').setAttribute('style','display:block')
        document.querySelector('.mfp-wrap').setAttribute('style','display:block')
    }
    
}
// movie__button.addEventListener('click', (e) => {
//     e.preventDefault();
//     addThumbnail('movies')

// })
