
let activeSlide = 0
let activeThumbnail = [0, 1, 2, 3]
let isModalOpen = false

const slider_images = [
    'app/img/bad-boys.jpg',
    'app/img/deadpool.jpg',
    'app/img/insideout2.jpg',
    'app/img/jl3.jpg',
]
const thumbnail_images = [
    'app/img/deadpool_thumbnail.jpg',
    'app/img/bad-boys.jpg',
    'app/img/jl3.jpg',
   'app/img/insideout2.jpg',
    
    'app/img/deadpool_thumbnail.jpg',
    'app/img/bad-boys.jpg',
    'app/img/jl3.jpg',
   'app/img/insideout2.jpg',
    
    'app/img/deadpool_thumbnail.jpg',
    'app/img/bad-boys.jpg',
    'app/img/jl3.jpg',
   'app/img/insideout2.jpg',
    
    'app/img/deadpool_thumbnail.jpg',
    'app/img/bad-boys.jpg',
    'app/img/jl3.jpg',
   'app/img/insideout2.jpg',
    
]

const slider_container = document.querySelector('.slider__container')
const movie__thumbnails = document.querySelector('.movie__thumbnails')


const addSliderImg = (images) => {
    const addSliderImg = (images) => {

        let active = images[activeSlide];

        let sliderHTML = images.map((image) => {

            activeStatus = active === image ? 'active' : ''

            return slider_html(activeStatus, image)
        }).join('')


        slider_container.innerHTML = sliderHTML
    }
}
const addThumbnail = (thumbnailImages) => {


    // let active = images[activeSlide];
    let i = 0;
    let thumbNailHTML = thumbnailImages.map((image) => {

        console.log(i)

        activeStatus = activeThumbnail.includes(i) ? 'active' : ''

        i++;
        // console.log(image)
        // activeStatus = active === image? 'active':''

        return thumbnail_html(i, image)
    }).join('')

    // console.log(thumbNailHTML)
    movie__thumbnails.innerHTML = thumbNailHTML
}

const slider_html = (activeStatus, image) => {

    return `<div class="movie__info--wrapper ">
                        <div class="movie movie__content ${activeStatus}">
                            <h2 class="movies__title ">Bad Boys: <span class="text__button--color">Ride or Die</span></h2>
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

const thumbnail_html = (i, image) => {

    return `<div class="${i} movie__info--container  ${activeStatus}">
                    <figure class="movie__info--figure">
                        <img class="movie__img" src="${image}" alt="">
                    </figure>
                    <div class="movie__info--data">
                        <div class="movie__info--top">
                            <span class="movie__info--title">Women's Day</span>
                            <span class=" movie__info--date text__button--color">2021</span>
                        </div>
                        <div class="movie__info--bottom">
                            <p class="movie__hd">HD</p>
                            <p class="movies__details--year">
                                <i class="far fa-clock text__button--color left" aria-hidden="true"></i>128 min
                                <i class="fas fa-thumbs-up text__button--color right"></i>3.5
                            </p>
                        </div>
                    </div>
                </div>`;
}

addSliderImg(slider_images)
addThumbnail(thumbnail_images)



const movie__info__wrapper = document.querySelectorAll('.movie__info--wrapper')
const movie__info__container = document.querySelectorAll('.movie__info--container')
const banner__area = document.querySelector('.banner__area');
const rightBtn = document.querySelector('#right')
const leftBtn = document.querySelector('#left')



const setBgBody = () => {

    banner__area.setAttribute
    banner__area.style.backgroundImage = `url(${movie__info__wrapper[activeSlide].querySelector('img').src})`
}
setBgBody()

const updateActiveThumbnail = (direction) => {

    if(direction == 'right')
    {
        leftBtn.disabled = false
        leftBtn.classList.remove('disabled')
        if (activeThumbnail[activeThumbnail.length - 1] === thumbnail_images.length - 1) {
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
    else
    {
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
    

    updateThumbnail()

}


const updateThumbnail = () => {

    let activemovieContainer = document.querySelectorAll('.movie__info--container.active')
    activemovieContainer.forEach(slides => {
        slides.classList.remove('active')
    }
    )
    activeThumbnail.forEach(id => {
        movie__info__container[id].classList.add('active')

    }
    )
}

rightBtn.addEventListener('click', () => {

    updateActiveThumbnail('right')

})
leftBtn.addEventListener('click', () => {

    updateActiveThumbnail('left')

})
const nextSlide = () => {
    activeSlide++
    if (activeSlide > movie__info__wrapper.length - 1) {
        activeSlide = 0
    }
}
const setActiveSlide = () => {

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