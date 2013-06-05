function controlMechanism(currentPosition) {

	$('div#pagination ul li').removeClass();

	if (currentPosition >= 4) {
		$('#controlRight').fadeOut(500);
		$('div#pagination ul li#4').addClass('active');
	} else {
		$('#controlRight').fadeIn(500);	
	}
	
	if (currentPosition == 3) {
		$('div#pagination ul li#3').addClass('active');
	}
	
	if (currentPosition == 2) {
		$('div#pagination ul li#2').addClass('active');
	}
	
	if (currentPosition == 1) {
		$('div#pagination ul li#1').addClass('active');
	}

	if (currentPosition <= 0) {
		$('#controlLeft').fadeOut(500);
		$('div#pagination ul li#0').addClass('active');
	} else {
		$('#controlLeft').fadeIn(500);
	}

}

function doMove(slideHeight, currentPosition) {

		$('.text').fadeOut(800, function() {
			$('.image').fadeOut(200);
			$('#slideWrap').animate({'marginTop' : slideHeight*(-currentPosition)}, function() {
				$('.image').fadeIn(800, function() {
					$('.text').fadeIn(1600);
				});
			});
		});

}

$(document).ready(function() {
  
	$('#controlLeft').hide();
	$('div#pagination ul li').append('<img src="../images/slider/button_mask.png" alt="Click for next" />');
	$('div#pagination ul li#0').addClass('active');
	
 	var currentPosition = 0;
 	var delayLength = 8000; // set speed of slide: 1000 = 1s
	var slideWidth = 959;
	var slideHeight = 299;
	
	var slideIntervalID = setInterval(function(){
		if (currentPosition == 4) {
			currentPosition = 0;
		} else {
			currentPosition = currentPosition+1;
		}
		doMove(slideHeight, currentPosition);
		controlMechanism(currentPosition);
	}, delayLength);
		
	$('.controls').click(function() {
		clearInterval(slideIntervalID);
		currentPosition = ($(this).attr('id') == 'controlRight' ? currentPosition+1 : currentPosition-1);
		doMove(slideHeight, currentPosition);
 		controlMechanism(currentPosition);
	});
		
	$('#pagination ul li').click(function() {
		clearInterval(slideIntervalID);
		currentPosition = ($(this).index());
		doMove(slideHeight, currentPosition);
 		controlMechanism(currentPosition);
	});
  
});