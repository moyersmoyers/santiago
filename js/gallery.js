window.addEventListener('load', () =>{
    document.querySelector('.loader').style.display = "none";
    document.body.classList.remove('no-scroll');
});

AOS.init({
    once: true
});

gridGallery({
    selector: "#image-gallery-gg",
    layout: "square"
});

/*gridGallery({
    selector: "#video-gallery-gg",
    layout: "square"
});

$('.filter-all').click(function(){
    $('.images').removeClass('filter-hide');
    $('.videos').removeClass('filter-hide');
});

$('.filter-images').click(function(){
    $('.videos').toggleClass('filter-hide');
});

$('.filter-videos').click(function(){
    $('.images').toggleClass('filter-hide');
});*/

/*$(document).ready(function() {
    $('.gg-box').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true,
            preload: [0,1],
            tPrev: 'Previous (Left arrow key)', // title for left button
            tNext: 'Next (Right arrow key)', // title for right button
            tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
        }
    });
});*/


let gallery = document.querySelector('.gg-box');
let modal = document.querySelector('#modal');
let modalContent = document.querySelector('.modal-content');
let modalClose = document.querySelector('#modal-close');
let prev = document.querySelector('#prev-btn');
let next = document.querySelector('#next-btn');
let currentImageIndex = 0;

gallery.addEventListener('click', (e) => {
    prev.style.display = "block";
    prev.removeAttribute('disabled', '');
    next.style.display = "block";
    next.removeAttribute('disabled', '');
    document.body.classList.add('no-scroll');
    
    const image = e.target;

    if (image.className === 'modal-target') {
        currentImageIndex = image.dataset.index;
        modalContent.src = image.src;
        modal.style.display = 'block';
    }

    if(parseInt(currentImageIndex) === gallery.children.length-1){
        next.setAttribute('disabled', '');
        next.style.display = "none";
    }

    if(parseInt(currentImageIndex) === 0){
        prev.setAttribute('disabled', '');
        prev.style.display = "none";
    }
});

next.addEventListener('click', function(){
    currentImageIndex++;

    if (currentImageIndex >= gallery.children.length) {
        currentImageIndex = 0;
    }
    modalContent.src = gallery.children[currentImageIndex].src;

    if(currentImageIndex === gallery.children.length-1){
        next.setAttribute('disabled', '');
        next.style.display = "none";
    }
    else{
        prev.removeAttribute('disabled', '');
        prev.style.display = "block";
    }
});

prev.addEventListener('click', function(){
    currentImageIndex--;

    if (currentImageIndex < 0) {
        currentImageIndex = gallery.children.length - 1;
    }
    modalContent.src = gallery.children[currentImageIndex].src;

    if(currentImageIndex === 0){
        prev.setAttribute('disabled', '');
        prev.style.display = "none";
    }
    else{
        next.removeAttribute('disabled', '');
        next.style.display = "block";
    }
});

modalClose.addEventListener('click', function() { 
    modal.style.display = "none";
    document.body.classList.remove('no-scroll');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.classList.remove('no-scroll');
    }
});



/*document.addEventListener('click', function (e) { 
  if (e.target.className.indexOf('modal-target') !== -1) {
      var img = e.target;
      var modalImg = document.getElementById("modal-content");
      var captionText = document.getElementById("modal-caption");
      modal.style.display = "block";
      modalImg.src = img.src;
      captionText.innerHTML = img.alt;
   }
});
*/