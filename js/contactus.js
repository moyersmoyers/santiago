AOS.init({
    once: true
});

const subjectSelect = document.querySelector('.form-select');
const othersDiv = document.querySelector('.specify');
const othersTextbox = document.querySelector('.specify-textbox');

window.addEventListener('load', () =>{
    document.querySelector('.loader').style.display = "none";
    document.body.classList.remove('no-scroll');
	othersDiv.style.display = "none";
});

subjectSelect.addEventListener('change', () => {
	if(subjectSelect.value === "Others"){
		othersDiv.style.display = "block";
		othersTextbox.setAttribute("required", "");
	}
	else{
		othersDiv.style.display = "none";
		othersTextbox.removeAttribute("required", "");
	}
});


$('#submit-form').submit(function(){
	$('.submit-modal').modal('show');
	return false;
});