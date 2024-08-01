
let activeSlide = 0


const slider_images = [
    'app/img/bad-boys.jpg',
    'app/img/deadpool.jpg',
    'app/img/insideout2.jpg',
    'app/img/jl3.jpg',
]

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
        
        return `<div class="movie__info__wrapper ">
                        <div class="movie movie__content">
                            <h2 class="movies__title ${activeStatus}">Bad Boys: <span class="text__button--color">Ride or Die</span></h2>
                            <!-- <p class="movies__overview">After their late former Captain is framed, Lowrey and Burnett try to
                                clear his name, only to end up on the run themselves.</p> -->
                                <div class="movies__details ${activeStatus}">
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
                                <img src="${image}" alt="">
                            </figure>
                    </div>
                </div>`;
    }

addSliderImg(slider_images)
const movie__info__wrapper = document.querySelectorAll('.movie__info__wrapper')
const banner__area = document.querySelector('.banner__area');

const setBgBody = () => {
    banner__area.setAttribute
    banner__area.style.backgroundImage = `url(${movie__info__wrapper[activeSlide].querySelector('img').src})`
}
setBgBody()
const nextSlide=()=>{
    activeSlide++
    if(activeSlide > movie__info__wrapper.length - 1){
            activeSlide = 0
    }
}
const setActiveSlide=()=>{
    movie__info__wrapper.forEach(slides=> 
    {
     
        slides.querySelector('.movie__img--wrapper').classList.remove('active')

        slides.querySelector('.movie__content').classList.remove('active')
        // slides.classList.remove('active')
    }
        )
    movie__info__wrapper[activeSlide].querySelector('.movie__img--wrapper').classList.add('active')
    movie__info__wrapper[activeSlide].querySelector('.movie__content').classList.add('active')
    // movie__info__wrapper[activeSlide].classList.add('active')
}
setInterval(() => {
    nextSlide()
    setBgBody()
    setActiveSlide()
//     // addSliderImg()
}, 7000)