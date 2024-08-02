// "use strict";

// // api key : 51e92c068c4c48c5c4380d8ab4a65804
// // image pathP: https://image.tmdb.org/t/p/w1280/

// const moviesApi = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=51e92c068c4c48c5c4380d8ab4a65804"
// const tvApi = "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=51e92c068c4c48c5c4380d8ab4a65804"

// const imagePath = "https://image.tmdb.org/t/p/w1280/"
// const youTubeVideoURL = "https://www.youtube.com/watch?v="
// const searchUrl = "https://api.themoviedb.org/3/search/movie?query=deadpool&api_key=51e92c068c4c48c5c4380d8ab4a65804"

// const exportData = {
//     moviesApi:moviesApi,
//     tvApi:tvApi,
//     imagePath:imagePath,
//     youTubeVideoURL:youTubeVideoURL,
//     searchUrl:searchUrl,
// }
// // export 
// // https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc"

// getMovies(moviesApi)

// async function getMovies(url){
//     try {
//         const result = await fetch(url)
//         const data = await result.json()
//         console.log(data)
//     } catch (error) {
        
//     }
// }