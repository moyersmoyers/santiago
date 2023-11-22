window.addEventListener('load', () =>{
    document.querySelector('.loader').style.display = "none";
    document.body.classList.remove('no-scroll');
});

const nextBtn = document.querySelectorAll(".btn-next");
const backBtn = document.querySelectorAll(".btn-back");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-steps");
const progressSteps = document.querySelectorAll(".progress-step");

let formStepsNum = 0;

nextBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        formStepsNum++;
        updateFormSteps();
        updateProgressbar();
        scrollToTop();
    });
});

backBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        formStepsNum--;
        updateFormSteps();
        updateProgressbar();
        scrollToTop();
    });
});

function updateFormSteps(){
    formSteps.forEach((formStep) => {
        formStep.classList.contains("form-steps-active") && formStep.classList.remove("form-steps-active");
    });

    formSteps[formStepsNum].classList.add("form-steps-active");
}

function updateProgressbar(){
    progressSteps.forEach((progressStep, index) => {
        if(index < formStepsNum + 1){
            progressStep.classList.add("progress-step-active");
        }
        else{
            progressStep.classList.remove("progress-step-active");
        }
    });

    const progressActive = document.querySelectorAll(".progress-step-active");

    progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

function scrollToTop(){
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function resetItems(){
    newSelectedRoomsCottages = [];
    tempSelectedRoomsCottages = [];

    // REMOVE ALL ITEMS IN SUMMARY
    for(let i = 0; i < $('.room-item').length; i++){
        $('.room-item').remove();
    }

    // UNCHECKS ALL ADD-ONS CHECKBOXES
    $('.addons input').each(function() {
        $(this).prop('checked', false);
    });

    $('.accomodation-select').get(0).selectedIndex = 0;
    $('.time-select').get(0).selectedIndex = 0;
    $('#adult-select').get(0).selectedIndex = 0;
    $('#kids-select').get(0).selectedIndex = 0;

    $('.room1').css('display', 'none');
    $('.room2').css('display', 'none');
    $('.display-total').html('0');

    numOfRes = 0;
}

/* -------------------- DATEPICKER -------------------- */
let startDate, endDate;
let startDateArray, endDateArray, cur, end, diff;

$('input[name="datepicker"]').daterangepicker({
    minDate: moment().format('MM/DD/YYYY'),
    startDate: moment().format('MM/DD/YYYY'),
    endDate: moment().add(1, 'days').format('MM/DD/YYYY')
}, function(start, end, label) {
    startDate = start.format('MM-DD-YYYY');
    endDate = end.format('MM-DD-YYYY');

    startDateArray = start.toArray()[1]+1 + '/' + start.toArray()[2] + '/' + start.toArray()[0];
    endDateArray = end.toArray()[1]+1 + '/' + end.toArray()[2] + '/' + end.toArray()[0];

    $('.display-check-in').html(startDate);
    $('.display-check-out').html(endDate);

    resetItems();

});

startDate = moment($('.datepicker').val().split('-')[0]).format('MM-DD-YYYY');
endDate = moment($('.datepicker').val().split('-')[1]).format('MM-DD-YYYY');

function getNumOfDaysDifference(){
    // IF DATES WEREN'T CHANGED, SET THE DATE TODAY AND TOMORROW
    if(!startDateArray && !endDateArray){
        let newCur = moment().toArray()[1]+1 + '/' + moment().toArray()[2] + '/' + moment().toArray()[0];
        let newEnd = moment().add(1, 'days').toArray()[1]+1 + '/' + moment().add(1, 'days').toArray()[2] + '/' + moment().add(1, 'days').toArray()[0];
        cur = moment(new Date(newCur));
        end = moment(new Date(newEnd));
    }
    else{
        cur = moment(new Date(startDateArray));
        end = moment(new Date(endDateArray));
    }

    diff = end.diff(cur, 'days');
    return diff;
}


/* -------------------- ACCOMODATION -------------------- */
$(document).ready(function(){
    $('.regular').css('display', 'none');
    $('.big').css('display', 'none');

    $('.display-check-in').html(moment().format('MM/DD/YYYY'));
    $('.display-check-out').html(moment().add(1, 'days').format('MM/DD/YYYY'));
});

let discard_text, isChanged = false;
$('.accomodation-select').change(function(){
    $('.accomodation-error').css('display', 'none');
    $('.select-time-error').css('display', 'none');

    if($(this).val() === "regular"){
        $('.regular').css('display', 'block');
        $('.big').css('display', 'none');
    }
    else{
        $('.big').css('display', 'block');
        $('.regular').css('display', 'none');
    }
});

let tempSelectedRoomsCottages = [], newSelectedRoomsCottages = [];
let roomId, roomName, roomPrice, numOfAdult, numOfKids, selectedAddOns, subtotal, total = 0;
let numOfRes = 0;

$('.select-this-room').click(function(e){
    e.preventDefault();

    /*$('.added-modal').modal('show');
    setTimeout(function(){
        $(".added-modal").modal('hide');
    }, 2000);*/


    if(!$(this).parent().siblings().find('.time-select').val()){
        $('.select-time-error').css('display', 'block');
    }
    else{
        $('.select-time-error').css('display', 'none');
        numOfRes++;
        tempSelectedRoomsCottages = [];
        subtotal = 0;
        selectedAddOns = [];

        roomId = numOfRes;
        roomName = $(this).parent().parent().siblings().find('.card-title').text();
        time = $(this).parent().siblings().find('.time-select').val();
        numOfAdult = $(this).parent().siblings().find('#adult-select').val();
        extra = $(this).parent().siblings().find('#extra').val();
        /*numOfKids = $(this).parent().siblings().find('#kids-select').val();*/
        roomPrice = $(this).parent().parent().siblings().find('.price').text();

        /*$('.addons input:checked').each(function() {
            selectedAddOns.push($(this).attr('name'));

            if($(this).attr('name') === 'Karaoke'){
                subtotal += 200;
            }
            if($(this).attr('name') === 'Dirty Kitchen'){
                subtotal += 250;
            }
            if($(this).attr('name') === 'Gasul'){
                subtotal += 300;
            }
        });*/

        reserve();
    }
});

$('.time-select').change(function(){
    $('.select-time-error').css('display', 'none');
});


let isAddonsEmpty;
function reserve(){
    for(let i = 1; i < parseInt(numOfAdult); i++){
        subtotal += 150;
    }
    for(let i = 0; i < parseInt(extra); i++){
        subtotal += 250;
    }
    /*for(let i = 0; i < parseInt(numOfKids); i++){
        subtotal += 100;
    }*/
    /*for(let i = 0; i < selectedAddOns.length; i++){
        if($.inArray('Karaoke', selectedAddOns) !== -1){
            subtotal += 200;
        }
        else if($.inArray('Dirty Kitchen', selectedAddOns) !== -1){
            subtotal += 250;
        }
    }*/


    subtotal += parseInt(roomPrice * getNumOfDaysDifference());
    total += subtotal;
    tempSelectedRoomsCottages.push({roomId, roomName, time, roomPrice, numOfAdult, numOfKids, selectedAddOns, subtotal});
    newSelectedRoomsCottages = newSelectedRoomsCottages.concat(tempSelectedRoomsCottages);

    if(tempSelectedRoomsCottages[0].selectedAddOns.length === 0){
        isAddonsEmpty = 'None';
    }
    else{
        isAddonsEmpty = tempSelectedRoomsCottages[0].selectedAddOns;
    }

    let roomSummary = $(`<div class="room-item">
                        <div class="selected-room-name">
                            <span class="room-id" name="`+tempSelectedRoomsCottages[0].roomId+`" style="display: none;"></span>
                            <b class="display-room fs-6">`+tempSelectedRoomsCottages[0].roomName+`</b>
                        </div>
                        <div class="selected-price">
                            Price Per Night: <span class="display-price">`+tempSelectedRoomsCottages[0].roomPrice+`</span>
                        </div>
                        <div class="selected-time">
                            Time: <span class="display-time">`+tempSelectedRoomsCottages[0].time+`</span>
                        </div>
                        <div class="selected-number-of-people">
                            Guest(s):
                            <span class="selected-number-of-adult">
                                <span class="display-adult">`+tempSelectedRoomsCottages[0].numOfAdult+`</span> Adult(s),
                            </span>
                        </div>
                        <div class="sub-total">
                            Sub Total: <span class="display-sub-total">`+subtotal+`</span>
                        </div>
                        <div>
                            <a href="#" style="color:red" class="room-remove" onclick="roomRemove(event, this)">Remove</a>
                        </div>
                    </div>`);
    $('.room-selected .room-summary').append(roomSummary.clone());
    $('.display-total').html(total);
}

function roomRemove(e, el){
    e.preventDefault();

    let parentEl = $(el).parent().parent();
    let getRoomId = parentEl.find('.room-id').attr('name');
    let getRoomIndex = newSelectedRoomsCottages.findIndex(x => x.roomId === parseInt(getRoomId));

    // REMOVE FROM ROOM LIST HTML
    parentEl.fadeOut(500, function(){ parentEl.remove(); });

    // UPDATE TOTAL PRICE
    let price = newSelectedRoomsCottages[getRoomIndex].subtotal;
    total = total - parseInt(price);
    $('.display-total').html(total);

    // REMOVE FROM ROOM ARRAY
    newSelectedRoomsCottages.splice(getRoomIndex,1);
}

$('.discard-modal').click(function(e){
    if (e.target === e.currentTarget) {
        /* TO PUBLIC */
        if($('.accomodation-select').val() === "public"){
            $('.accomodation-select').get(0).selectedIndex = 2;
        }
        /* TO PRIVATE */
        else{
            $('.accomodation-select').get(0).selectedIndex = 1;
        }
    }
});

$('.discard-changes').click(function(){
    resetItems();

    setTimeout(function(){
        $(".discard-modal").modal('hide');
    }, 100);
});

$('.discard-changes').siblings().click(function(){
    alert('no');
});

$('.date-next').click(function(e){
    e.preventDefault();


    if($('.accomodation-select').val()){
        $('.accomodation-error').css('display', 'none');

        if(newSelectedRoomsCottages.length === 0){
            $('.select-atleast-modal').modal('show');
        }
        else{
            formStepsNum++;
            updateFormSteps();
            updateProgressbar();
            scrollToTop();
        }
    }
    else{
        $('.accomodation-error').css('display', 'block');
    }
});


/* -------------------- GUEST INFO -------------------- */
$('.guest-info-next').click(function(e){
    e.preventDefault();

    let valid = 0;
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let inputs = document.querySelectorAll('.guest-info-input');
    inputs.forEach(function(el){
        if(el.value === ""){
            el.nextElementSibling.nextElementSibling.style.display = "block";
            if(!(valid === 0)){
                valid -= 1;
            }
        }
        else{
            if(el.name === "e_mail"){
                if(el.value.match(emailRegex)){
                    el.nextElementSibling.nextElementSibling.style.display = "none";
                    valid += 1;
                }
                else{
                    el.nextElementSibling.nextElementSibling.style.display = "block";
                    if(!(valid === 0)){
                        valid -= 1;
                    }
                }
            }
            else{
                el.nextElementSibling.nextElementSibling.style.display = "none";
                valid += 1;
            }
        }
    });

    if(valid === 5){
        formStepsNum++;
        updateFormSteps();
        updateProgressbar();
        scrollToTop();
    }
});

// LETTERS ONLY
function lettersOnly(evt, el){
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    
    var regex = /^[A-Za-z]+$/;
    if(!regex.test(key)) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault){
            theEvent.preventDefault();
        } 
    }
    /*else{
        el.nextElementSibling.nextElementSibling.style.display = "none";
    }*/
}

// NUMBERS ONLY
function validate(evt, el){
    var theEvent = evt || window.event;

    if (theEvent.type === 'paste'){
        key = event.clipboardData.getData('text/plain');
    } 
    else{
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }

    var regex = /[0-9]/;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) {
            theEvent.preventDefault();
        }
    }
    /*else{
        el.nextElementSibling.nextElementSibling.style.display = "none";
    }*/
}


/* -------------------- PAYMENT -------------------- */
$('.method-select').change(function(){
    $('.payment-info').css('display', 'block');
    if($(this).val() === "gcash"){
        $('.bdo').css('display','none');
        $('.gcash').css('display','block');
    }
    else{
        $('.bdo').css('display','block');
        $('.gcash').css('display','none');
    }
});

$('.payment-next').click(function(e){
    e.preventDefault();

    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
    scrollToTop();
    
    /*if(document.querySelector("input[type='file']").files.length === 0){
        $('.file-error').css('display', 'block');
    }
    else{
        $('.file-error').css('display', 'none');
    }*/

    let randomNum = Math.floor((Math.random() * 10000) + 1000);
    $('.r_id').text(randomNum);
    $('.checkin').text(startDate);
    $('.checkout').text(endDate);
    $('.first_name').text($('input[name="firstname"]').val());
    $('.last_name').text($('input[name="lastname"]').val());

    $('.summary-total').text($('.display-total').text());
});


/* -------------------- CONFIRM -------------------- */
$('.view-full-details').click(function(e){
    e.preventDefault();
    let details, rooms, footerTotal;
    
    

    $('.view-full-modal').modal('show');
});

$('.final-confirm').click(function(){
    if(!$('.i-have-read-check').is(':checked')){
        $('.check-error').css('display', 'block');
    }
    else{
        $('.check-error').css('display', 'none');
        $('.confirmation-modal').modal('show');
    }
});
$('.i-have-read-check').change(function(){
    $('.check-error').css('display', 'none');
});