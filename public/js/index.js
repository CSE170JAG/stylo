'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$(".header__hamburger-menu").on('click', function(){
		 $(".menu-container").removeClass('close', 1000);
	});
	$('.drawer-menu__close-btn').on('click', function(){
		$(".menu-container").addClass('close', 1000);
	});

	$(".toggle__calendar").on('click', function(){
			$(".toggle__events").removeClass('active');
			$(this).addClass('active');
			$('.calendar-container .calendar').show();
			$('.calendar-container .events').hide();
	});
	$(".toggle__events").on('click', function(){
			$(".toggle__calendar").removeClass('active');
			$(this).addClass('active');
			$('.calendar-container .events').show();
			$('.calendar-container .calendar').hide();
	});


	$("#testBTN").on('click', function(){
		console.log("hi");
		$.ajax(
			{
		  type: "POST",
		  url: "https://styloappstag.herokuapp.com/test",
		  crossDomain:true,
		  dataType: "json",
		  data:JSON.stringify({name: "Dennis", address: {city: "Dub", country: "IE"}})
		 }
	  );
	});
}
