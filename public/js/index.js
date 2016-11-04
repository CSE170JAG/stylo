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



	$(".delete-edit__delete").on('click', function(){
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
