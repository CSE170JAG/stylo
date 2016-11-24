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
					document.location.href = '/loggedin/?user='+res;
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
		 sessionStorage.isEvents = false;
		 //console.log( "sessionStorage.isEvents is now " + sessionStorage.isEvents);
	});
	$(".footer-navigation__event-list").on('click', function(){
			$(".footer-navigation__clothes").removeClass('active');
			 $(".cloth-events-container__clothes").hide();
			$(this).addClass('active');
			$(".cloth-events-container__events").show();
			sessionStorage.isEvents = true;
			//console.log( "sessionStorage.isEvents is now " + sessionStorage.isEvents);
	});
	// https://styloappstag.herokuapp.com/test
	//http://localhost:3000/test
	$("#submit-btn").on('click', function(){
		var locationId = document.location.href.split('addEvents/?user=')[1];

		var newTitle = $('#event-title-input').val().trim();
		var newDate = $('#event-date-input').val();
		var newTime = $('#event-time-input').val();
		var newDesc = $('#event-desc-input').val();

		if(newTitle != '' && newDate != '' && newTime != '' && newDesc != '' ){
			var newEvent = {
				"summary": newTitle,
				"start": {
					"date": newDate,
					"time": newTime
				},
				"description": newDesc
			}

			var sendData = {
				userId: locationId,
				event: newEvent
			}

			$.ajax(
				{
					type: "POST",
					url: "/addEvent",
					crossDomain:true,
					dataType: "json",
					data: sendData,
					complete: function(res){ document.location.href = '/loggedin/?user='+res.responseText; }
				}
		 	);
		}else{
			var fillConfirm = confirm("Please fill out the entire form");
		}
	});

	$(".cancel-submit-container #cancel-btn").on('click', function(){
		var locationId = document.location.href.split('addEvents/?user=')[1];
		document.location.href = '/loggedin/?user='+locationId;
	});

	$("#edit-btn").on('click', function(){
			var locationId = document.location.href.split('/?user=')[1];

			var newTitle = $('#event-title-input').val().trim();
			var newDate = $('#event-date-input').val();
			var newTime = $('#event-time-input').val();
			var newDesc = $('#event-desc-input').val();
			if(newTitle != '' && newDate != '' && newTime != '' && newDesc != '' ){
		 			//Enter changed info first
		 			var newEvent = {
		 				"summary": newTitle,
		 				"start": {
		 					"date": newDate,
		 					"time": newTime
		 				},
		 				"description": newDesc
		 			}

		 			var currURL = document.URL.split("/?user="); //get the title of the event through the url coz they might've changed it
		 			var currEventAndName = currURL[1];


					var currEvent = currURL[0].split('/')[4]

		 			currEvent = currEvent.replace( /%20/g, " "); //remove handlebar replacements for URL spaces

					console.log(currEvent);
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
				var locationId = document.location.href.split('manageEvents/?user=')[1];
				var postData = {
					userId: locationId,
					event: eventTitle
				}

				$.post('/deleteEvent', postData, function(res){
					document.location.href = '/manageEvents/?user='+res;
				})
			}
	});

	//Delete an event from the homepage event list
	$('.event-item__delete').on('click', function(){
		var eventObj = $(this).siblings().children()[0].children[0].innerText;
		var eventTitle = eventObj.split(":")[1];
		var deleteConfirm = confirm("Are you sure you want to delete the event: "+eventTitle+"?");
		if(deleteConfirm){
			var locationId = document.location.href.split('loggedin/?user=')[1];
			var postData = {
				userId: locationId,
				event: eventTitle
			}

			$.post('/deleteEvent', postData, function(res){
				document.location.href = '/loggedin/?user='+res;
			})
		}
	});

	// For use in A/B Testing
	$(".indexEvents__delete").on('click', function() {
		// var eventObj = ($(this).parent()).siblings()[0].children[0].innerText;
		var eventObj = ($(this).siblings()[0]).children[0].children[0].innerText;
		var eventTitle = eventObj.split(":")[1];
		var deleteConfirm = confirm("Are you sure you want to delete the event: "+eventTitle+"?");
		if(deleteConfirm){
			var locationId = document.location.href.split('loggedin2/')[1];
			var postData = {
				userId: locationId,
				event: eventTitle
			}

			$.post('/deleteEvent', postData, function(res){
				 document.location.href = '/loggedin2/'+res;
				//location.reload();
			})
		}
	});

	$("#reg-submit").on('click', function(){

		var name1 = $("#firstN-input").val();
		var last1 = $("#lastN-input").val();
		var user1 = $("#userN-input").val();
		var pass1 = $("#pass-input").val();
		var passConfirm = $('#pass-input-confirm').val();

		if(name1 != '' && last1 != '' && user1 != '' && pass1 != '' ){
			if(pass1 === passConfirm){
				var sendData = {
					"fN": name1,
					"lN": name1,
					"uN": user1,
					"pass": pass1
				}

				$.ajax(
					{
						type: "POST",
						url: "/register",
						crossDomain:true,
						dataType: "json",
						data: sendData,
						complete: function(res){
							// sessionStorage.setItem('userId', res.responseText);
							document.location.href = '/loggedin/?user='+res.responseText;
						}
					}
				);
			}else{
				alert('Passwords do not match. Please enter again.');
				$('#pass-input-confirm').val('');
				$("#pass-input").css({
					'border': 'thin solid red'
				});
				$('#pass-input-confirm').css({
					'border': 'thin solid red'
				});
			}

		}else{
			var fillConfirm = confirm("Please fill out the entire form");
		}
	});

}
