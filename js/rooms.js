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
    
    if(trgt.parentNode.classList.contains("standard") || trgt.parentNode.parentNode.classList.contains("standard")){
        $('.standard-modal').modal('show');
    }
    else if(trgt.parentNode.classList.contains("windmill") || trgt.parentNode.parentNode.classList.contains("windmill")){
        $('.windmill-modal').modal('show');
    }
    else if(trgt.parentNode.classList.contains("lakeview") || trgt.parentNode.parentNode.classList.contains("lakeview")){
        $('.lakeview-modal').modal('show');
    }
    else if(trgt.parentNode.classList.contains("family") || trgt.parentNode.parentNode.classList.contains("family")){
        $('.family-modal').modal('show');
    }
    else if(trgt.parentNode.classList.contains("king") || trgt.parentNode.parentNode.classList.contains("king")){
        $('.king-modal').modal('show');
    }
    else if(trgt.parentNode.classList.contains("queen") || trgt.parentNode.parentNode.classList.contains("queen")){
        $('.queen-modal').modal('show');
    }
    else if(trgt.parentNode.classList.contains("dorm") || trgt.parentNode.parentNode.classList.contains("dorm")){
        $('.dorm-modal').modal('show');
    }
});
