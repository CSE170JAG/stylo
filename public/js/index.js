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

	$(".footer-navigation__clothes").on('click', function(){
		 $(".footer-navigation__event-list").removeClass('active');
		 $(".cloth-events-container__events").hide();
		 $(this).addClass('active');
		 $(".cloth-events-container__clothes").show();
	});
	$(".footer-navigation__event-list").on('click', function(){
			$(".footer-navigation__clothes").removeClass('active');
			 $(".cloth-events-container__clothes").hide();
			$(this).addClass('active');
			$(".cloth-events-container__events").show();
	});
	// https://styloappstag.herokuapp.com/test
	//http://localhost:3000/test
	$("#submit-btn").on('click', function(){

		var sendData = {
			"summary": $('#event-title-input').val(),
			"start": {
				"date": $('#event-date-input').val(),
				"time": $('#event-time-input').val()
			},
			"description": $('#event-desc-input').val()
		}
		console.log("Clicked");
		$.ajax(
			{
				type: "POST",
				url: "/addEvent",
				crossDomain:true,
				dataType: "json",
				data: sendData,
				complete: function(){ document.location.href = '/'; }
			}
	 );
	});


	$(".event-item-edit-delete__delete").on('click', function(){
			var eventObj = ($(this).parent()).siblings()[0].children[0].children[0].innerText;
			var eventTitle = eventObj.split(":")[1]
			var deleteConfirm = confirm("Are you sure you want to delete the event: "+eventTitle+"?");
			if(deleteConfirm){
				var postData = {
					toDelete: eventTitle
				}

				$.post('/deleteEvent', postData, function(res){
					document.location.href = '/manageEvents';
					console.log(res)
				})
			}
	});

}
