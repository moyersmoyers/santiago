window.addEventListener('load', () =>{
    document.querySelector('.loader').style.display = "none";
    document.body.classList.remove('no-scroll');
});

AOS.init({
    once: true
});

$('.card').click(function(e){
    e.preventDefault();
    const trgt = e.target;
    if(trgt.parentNode.classList.contains("regular") || trgt.parentNode.parentNode.classList.contains("regular")){
        $('.regular-modal').modal('show');
    }
    else if(trgt.parentNode.classList.contains("big") || trgt.parentNode.parentNode.classList.contains("big")){
        $('.big-modal').modal('show');
    }
    else if(trgt.parentNode.classList.contains("public") || trgt.parentNode.parentNode.classList.contains("public")){
        $('.public-modal').modal('show');
    }
    else if(trgt.parentNode.classList.contains("private") || trgt.parentNode.parentNode.classList.contains("private")){
        $('.private-modal').modal('show');
    }
});