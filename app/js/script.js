
let activeSlide = 1


const slider_images = [
    'app/img/bad-boys.jpg',
    'app/img/deadpool.jpg',
    'app/img/insideout2.jpg',
    'app/img/jl3.jpg',
]


function getVariables() {
    const body = document.body;
    const sliders = document.querySelectorAll('.slide')
    const leftBtn = document.querySelector('#left')
    const rightBtn = document.querySelector('#right')

    setBgBody(body, sliders)
}
const slider_div = document.querySelector('.slider__container')

function main(images, callback) {
    setTimeout(() => {
        addSliderImg(images)
        callback()
    }, 2000)
}


const setBgBody = (body, sliders) => {
    body.style.backgroundImage = sliders[activeSlide].style.backgroundImage
}

const setActiveSlide=(body,sliders)=>{
    body.style.backgroundImage = sliders[activeSlide].style.backgroundImage
}

main(slider_images, getVariables)




const addSliderImg = (images) => {
    let active = images[activeSlide];

    let sliderHTML = images.map((image) => {
        if (active === image) {
            return `<div class="slide active" style="background-image:url('${image}')"></div>`;
        }
        return `<div class="slide" style="background-image:url('${window.location.origin}/${image}')"></div>`;
    }).join('')

    sliderHTML += `<button class="arrow left__arrow" id="left"><i class="fas fa-arrow-left"></i></button>
        <button class="arrow right__arrow" id="right"><i class="fas fa-arrow-right"></i></button>`

    slider_div.innerHTML = sliderHTML
}




