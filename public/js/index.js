'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

	//Login Functionality
	$("#tologin").on('click', function(){
		var usrName = $('#login-username').val().trim();
		var usrPass = $('#login-password').val().trim();

		var loginData = {
			uN: usrName,
			uP: usrPass
		}

		$.post('/confirmLogin', loginData, function(res){
				if(res === 'false'){
					alert("An incorrect username/password has been entered. Please try again.");
				}else{
					document.location.href = '/loggedin/'+res;
				}
		});
	});


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
		var locationId = document.location.href.split('addEvents/')[1];

		var newTitle = ($('#event-title-input').val() != "");
		var newDate = ($('#event-date-input').val() != "");
		var newTime = ($('#event-time-input').val() != "");
		var newDesc = ($('#event-desc-input').val() != "");

		if(newTitle && newDate && newTime && newDesc ){
			var newEvent = {
				"summary": $('#event-title-input').val(),
				"start": {
					"date": $('#event-date-input').val(),
					"time": $('#event-time-input').val()
				},
				"description": $('#event-desc-input').val()
			}

			var sendData = {
				userId: locationId,
				event: newEvent
			}

			console.log("Clicked");
			$.ajax(
				{
					type: "POST",
					url: "/addEvent",
					crossDomain:true,
					dataType: "json",
					data: sendData,
					complete: function(res){ document.location.href = '/loggedin/'+res.responseText; }
				}
		 	);
		}else{
			var fillConfirm = confirm("Please fill out the entire form");
		}
	});

	$(".cancel-submit-container #cancel-btn").on('click', function(){
		var locationId = document.location.href.split('addEvents/')[1];
		document.location.href = '/loggedin/'+locationId;
	});

	$("#edit-btn").on('click', function(){
			var eventURL = String($('#event-title-input').val()) + '/'
			var locationId = document.location.href.split('/')[5];
			console.log(locationId);

			var newTitle = ($('#event-title-input').val() != "");
			var newDate = ($('#event-date-input').val() != "");
			var newTime = ($('#event-time-input').val() != "");
			var newDesc = ($('#event-desc-input').val() != "");

			if(newTitle && newDate && newTime && newDesc ){
		 			//Enter changed info first
		 			var newEvent = {
		 				"summary": $('#event-title-input').val(),
		 				"start": {
		 					"date": $('#event-date-input').val(),
		 					"time": $('#event-time-input').val()
		 				},
		 				"description": $('#event-desc-input').val()
		 			}

		 			var currURL = document.URL; //get the title of the event through the url coz they might've changed it
		 			var currEventAndName = currURL.split("editEvent/")[1];
					var currEvent = currEventAndName.split('/' + locationId)[0];

		 			currEvent = currEvent.replace( /%20/g, " "); //remove handlebar replacements for URL spaces

					//prep data to post
					var sendData = {
						userId: locationId,
						event: newEvent,
						oldEventTitle: currEvent
					}
					//post data and go back to previous URL with new data entered;
					$.post('/updateEvent', sendData, function(res) {
						//document.location.href = '/manageEvents/'+res;
						document.location.href = document.referrer; //go to previous URL

				});
		} else {
			var fillConfirm = confirm("Please fill out the entire form");
		}
	});


	$(".event-item-edit-delete__delete").on('click', function(){
			var eventObj = ($(this).parent()).siblings()[0].children[0].innerText;
			var eventTitle = eventObj.split(":")[1];
			var deleteConfirm = confirm("Are you sure you want to delete the event: "+eventTitle+"?");
			if(deleteConfirm){
				var locationId = document.location.href.split('manageEvents/')[1];
				var postData = {
					userId: locationId,
					event: eventTitle
				}

				$.post('/deleteEvent', postData, function(res){
					document.location.href = '/manageEvents/'+res;
				})
			}
	});

	$("#reg-submit").on('click', function(){

		var name1 = ($("#firstN-input").val() != "");
		var last1 = ($("lastN-input").val() != "");
		var user1 = ($("userN-input").val() != "");
		var pass1 = ($("pass-input").val() != "");

		if(name1 && last1 && user1 && pass1 ){
			var sendData = {
				"fN": $('#firstN-input').val(),
				"lN": $('#lastN-input').val(),
				"uN": $('#userN-input').val(),
				"pass": $('#pass-input').val()
			}

			console.log("Clicked");
			$.ajax(
				{
					type: "POST",
					url: "/register",
					crossDomain:true,
					dataType: "json",
					data: sendData,
					complete: function(res){
            console.log(res.responseText);
						// sessionStorage.setItem('userId', res.responseText);
						document.location.href = '/loggedin/'+res.responseText;
					}
				}
			);
		}else{
			var fillConfirm = confirm("Please fill out the entire form");
		}
	});

}
