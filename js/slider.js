// Copyright 2013 Drawmer Electronics Ltd

function doControls(currentPosition) {

	$('div#pagination ul li').removeClass();

	if (currentPosition >= 4) {
		$('#controlright').hide();
		$('#pos4').addClass('active disabled');
	} else {
		$('#controlright').show();
	}
	
	if (currentPosition == 3) {
		$('#pos3').addClass('active disabled');
	}
	
	if (currentPosition == 2) {
		$('#pos2').addClass('active disabled');
	}
	
	if (currentPosition == 1) {
		$('#pos1').addClass('active disabled');
	}

	if (currentPosition <= 0) {
		$('#controlleft').hide();
		$('#pos0').addClass('active disabled');
	} else {
		$('#controlleft').show();
	}

}

function doMove(currentPosition, config) {

	config.elems.text.fadeOut(800, 'easeOutCirc', function() {
		config.elems.image.fadeOut(400, 'easeOutCirc');
		config.elems.slideWrap.delay(400).animate({ 'marginTop' : config.opts.slideHeight * (-currentPosition) }, 0, function() {
			doControls(currentPosition);
			config.elems.image.fadeIn(400, 'easeInCirc', function() {
				config.elems.text.fadeIn(800, 'easeInCirc');
			});
		});
	});
	$('#pagination, .control').fadeTo(400, 0.4).delay(1200).fadeTo(400, 1, function() {
		$('#pagination ul li a, .control').removeClass('disabled');
	});

}

function initElements(config) {

	config.elems.slideContainer.prepend('<a href="#" id="controlleft" class="control"><!-- null --></a>');
	config.elems.slideContainer.prepend('<a href="#" id="controlright" class="control"><!-- null --></a>');
	config.elems.slideContainer.append('<div id="pagination"><ul><li id="pos0"><a href="#"></a></li><li id="pos1"><a href="#"></a></li><li id="pos2"><a href="#"></a></li><li id="pos3"><a href="#"></a></li><li id="pos4"><a href="#"></a></li></ul></div>');
	$('#controlleft').hide();
	$('div#pagination ul li#pos0').addClass('active');
	
}

$(document).ready(function() {
  
	var config = {
	
		elems: {
			slideContainer: $('div#slide-container'),
			slideWrap: 		$('div#slide-wrap'),
			text: 			$('img.text'),
			image: 			$('img.image')
		},
		
		opts: {
			slideDelay: 	8000,
			slideWidth: 	959,
			slideHeight: 	299
		}
	
	}
	
	initElements(config);
	
	var currentPosition = 0;
	
	var slideIntervalID = setInterval(function() {
		if (currentPosition == 4) {
			currentPosition = 0;
		} else {
			currentPosition = currentPosition + 1;
		}
		doMove(currentPosition, config);
	}, config.opts.slideDelay);

	$('.control').on('click', function(e) {
		$(this).addClass('disabled');
		e.preventDefault(); clearInterval(slideIntervalID);
		currentPosition = ($(this).attr('id') == 'controlright' ? currentPosition + 1 : currentPosition - 1);
		doMove(currentPosition, config);
	});
		
	$('#pagination ul li').on('click', function(e) {
		$(this).addClass('disabled');
		e.preventDefault(); clearInterval(slideIntervalID);
		currentPosition = ($(this).index());
		doMove(currentPosition, config);
	});

});