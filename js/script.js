window.addEventListener('load', () =>{
    document.querySelector('.loader').style.display = "none";
    document.body.classList.remove('no-scroll');
});

AOS.init({
    once: true
});

const navbar = document.querySelector('.navbar');
window.onscroll = window.onload = () => {
    if(this.scrollY >= 60){
        navbar.classList.add('nav-scrolled');
    }
    else{
        navbar.classList.remove('nav-scrolled');
    }
}

new Swiper(".headerSwiper", {
    slidesPerView: 1,
    loop: true,
    effect: "fade",
    noSwiping: true,
    noSwipingClass: "swiper-slide",
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

$('.owl-carousel').owlCarousel({
    nav: true,
    loop: false,
    center: false,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    navText: ["<a data-aos='fade-right' class='btn btn-primary btn-book' style='margin-right:15px'><i class='bi bi-arrow-left'></i></a>","<a  data-aos='fade-left' class='btn btn-primary btn-book' style='margin-left:15px'><i class='bi bi-arrow-right'></i></a>"],
    responsive:{
        0:{
            items: 1
        },
        768:{
            items:2
        },
        992:{
            items:3
        }
    }
});

let isDragging = false;
$('.owl-carousel').on('drag.owl.carousel', function() {
    isDragging = true;
});

$('.owl-carousel').on('dragged.owl.carousel', function() {
    setTimeout(() => {
        isDragging = false;
    },100);
});

const room_items = document.querySelectorAll('.room-item');
room_items.forEach(function(rooms, idx){
    if(!isDragging){
        rooms.addEventListener('click',() => {
            
        });
    }
    else{
        return;
    }
});