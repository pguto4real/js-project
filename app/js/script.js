
let activeSlide = 0


const slider_images = [
    'app/img/bad-boys.jpg',
    'app/img/deadpool.jpg',
    'app/img/insideout2.jpg',
    'app/img/jl3.jpg',
]
const header = document.querySelector('.banner__area');
const slider_container = document.querySelector('.slider__container')



const addSliderImg = (images) => {
    let active = images[activeSlide];

    let sliderHTML = images.map((image) => {

        activeStatus = active === image? 'active':''
          
        return slider_html(activeStatus,image)
    }).join('')

    
    slider_container.innerHTML = sliderHTML
}

const slider_html = (activeStatus,image)=>{
        
        return `<div class="movie__info__wrapper ${activeStatus}">
                        <div class="movie movie__content">
                            <h2 class="movies__title">Bad Boys: <span class="text__button--color">Ride or Die</span></h2>
                            <!-- <p class="movies__overview">After their late former Captain is framed, Lowrey and Burnett try to
                                clear his name, only to end up on the run themselves.</p> -->
                                <div class="movies__details">
                                    <p class="movies__details--quality">pg 18</p>
                                    <p class="hd">HD</p>
                                    <p class="movies__details--category">Action, drama, thriller</p>
                                   
                                    <p class="movies__details--year"><i class="far fa-calendar-alt text__button--color"></i>2023</p>
                                    <p class="movies__details--year"><i class="far fa-clock text__button--color"></i>128 min</p>

                                </div>
                                <a href="" class="movie__button"><i class="fas fa-play"></i>Watch Now</a>
                                <!-- <button type="button" class="movie__button"><i class="fas fa-circle-play"></i>Watch Now</button> -->
                        </div>
                    
                    <div class="movie movie__img--wrapper ${activeStatus}">
                            <figure class="movie__img--figure">
                                <img src="app/img/deadpool.jpg" alt="">
                            </figure>
                    </div>
                </div>`;
    }

addSliderImg(slider_images)
// const sliders = document.querySelectorAll('.slide')
// const sliderContent = document.querySelectorAll('.slider__content')
// const leftBtn = document.querySelector('#left')
// const rightBtn = document.querySelector('#right')
// const setBgBody = () => {

//     header.style.backgroundImage = sliders[activeSlide].style.backgroundImage
// }
// setBgBody()
// const setActiveSlide = () => {
//     sliders.forEach(slides => slides.classList.remove('active'))
//     sliderContent.forEach(sliders => sliders.classList.remove('active'))
//     sliders[activeSlide].classList.add('active')
//     sliderContent[activeSlide].classList.add('active')
// }


// rightBtn.addEventListener('click', () => {


//     nextSlide()
//     setBgBody()
//     setActiveSlide()

// })
// leftBtn.addEventListener('click', () => {

//     previousSlide()
//     setBgBody()
//     setActiveSlide()

// })

// const nextSlide = () => {
//     activeSlide++
//     if (activeSlide > sliders.length - 1) {
//         activeSlide = 0
//     }
// }
// const previousSlide = () => {
//     activeSlide--

//     if (activeSlide === -1) {
//         activeSlide = sliders.length - 1
//     }
// }


setInterval(() => {
    nextSlide()
    setBgBody()
    setActiveSlide()
}, 7000)