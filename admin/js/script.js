/* SIDEBAR START */
let smallWidth = false;

function expandSidebar(){
	$('#sidebar').removeClass('collapse-nav');
	$('#main').removeClass('main-pd');
	$('#header').removeClass('header-pd');
}

function setWindowWidth(){
	let getwidth = $(window).width();
	
	if(getwidth <= 768){
		smallWidth = true;
		expandSidebar();
		$('.backdrop').css('display', 'none');
		$('.submenu').slideUp();
	}
	else{
		smallWidth = false;
	}
	$('#sidebar').removeClass('open');
}

$(window).on('load resize', function(){
	setWindowWidth();
});

$('#sidebar-toggle').click(function(){
	if(!smallWidth){
		$('#sidebar').toggleClass('collapse-nav');
		$('#header').toggleClass('header-pd');
		$('#main').toggleClass('main-pd');
		$('#sidebar-toggle').toggleClass('rotate');
	}
	else{
		$('#sidebar').addClass('open');
		$('.backdrop').css('display', 'block');
	}
});

$('.backdrop').click(function(){
	$('#sidebar').removeClass('open');
	$(this).css('display', 'none');
	$('.submenu').slideUp();
	$('.chev-down').removeClass('rotate');
});

/* SIDEBAR END */



/* DROPDOWN SIDEBAR NAV START */
$('.nav_list-item a').click(function(event){
	//selecting submenu
	$(this).siblings().slideToggle();
	$(this).find('.chev-down').toggleClass('rotate');

	//selecting other submenu
	$(this).parent().siblings().find('.submenu').first().slideUp();
	$(this).parent().siblings().find('a').find('.chev-down').removeClass('rotate');
});

$('#reservation, #cms').click(function(e){
	e.preventDefault();
});
/* DROPDOWN SIDEBAR NAV END */



/* USER SETTINGS START */
$(document).mouseup(function(e){
	let userSetting = $('.user-settings');
	let userSettingSubmenu = $('.user-settings-submenu');
	if (!userSetting.is(e.target) && userSetting.has(e.target).length === 0) 
    {
        userSettingSubmenu.removeClass('user-settings-sub-active');
    }
    else{
    	userSettingSubmenu.toggleClass('user-settings-sub-active');
    }

    let notification = $('.notification');
    let notificationSubmenu = $('.notification-submenu');
    if (!notification.is(e.target) && notification.has(e.target).length === 0) 
    {
        notificationSubmenu.removeClass('notification-submenu-active');
    }
    else{
    	notificationSubmenu.toggleClass('notification-submenu-active');
    }

    /*if($('#sidebar').hasClass('collapse-nav') || !$('.submenu').parent().is(e.target) && $('.submenu').parent().has(e.target).length === 0){
    	$('.nav_list-item a').parent().siblings().find('.submenu').slideUp();
		$('.nav_list-item a').parent().siblings().find('a').find('.chev-down').removeClass('rotate');
    }*/
});

$('body, .nav').on('scroll', function(){
	$('.user-settings-submenu').removeClass('user-settings-sub-active');
	if($('#sidebar').hasClass('collapse-nav')){
		$('.submenu').slideUp();
		$('.chev-down').removeClass('rotate');
	}
});
/* USER SETTINGS END */

const sidebar_loader = setTimeout(() => {
    document.querySelector('.sidebar-loader').style.display = "none";
}, 500);
const content_loader = setTimeout(() => {
    document.querySelector('.content-loader').style.display = "none";
}, 1000);


/* CHART JS START */
const mychart = document.querySelector('#chart');

new Chart(mychart, {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
	      {
	        label: 'Number of Reservations',
	        data: [5, 12, 10, 20, 21, 14, 14, 13, 19, 9],
	        borderWidth: 2
	      },
	      {
	      	label: 'Number of Cancellations',
	      	data: [2, 4, 1, 3, 8, 0, 0, 10, 2, 5],
	        borderWidth: 2
	      }
      ]
    },
    options: {
    	responsive: true,
    	plugins: {
    		legend: {
    			position: 'top',
    		}
    	}
    }
});
/* CHART JS END*/


