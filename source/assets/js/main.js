/**
 * [imgBg description]
 * @return {string} [Not found]
 */
$.fn.imgBg = function() {
	var src = $(this).data('src');
  if (src.length > 0) {
    $(this).css({
      'background-image': 'url(' + src + ')'
    });
  } else {
    return src + 'not found!';
  }
};

/**
 * Fix bug for jquery 3.0 in Owl Carousel
 */
$.fn.andSelf = function() {
  return this.addBack.apply(this, arguments);
};

/**
 * Benefit carousel
 */
$(document).ready(function() {
  // $('.benefit-item-model').imgBg();
  
	var config = {
		loop: true,
		margin: 0,
		nav: false,
		responsive: {
			0: {
				items: 1,
			},
			600: {
				items: 2,
			},
			767: {
				items: 3
			},
			1200: {
				items: 4
			},
			1701: {
				items: 5
			}
		}
	};

	$('.benefit-carousel').owlCarousel(config);
});

/**
 * Carousel process
 */
$(document).ready(function() {
	var config = {
		items: 4,
		nav: false,
		responsive: {
			0: {
				items: 1,
				dots: true,
				loop: true
			},
			480: {
				items: 2
			},
			600: {
				items: 3
			},
			992: {
				items: 4,
				dots: false,
				loop: false
			}
		}
	};

	$('.process-carousel').owlCarousel(config);
});

/**
 * form
 */
$(document).ready(function() {
	$('.form-control').focus(function() {
		$(this).next().addClass('active');
		$(this).closest('.form-group').addClass('active');
	});

	$('.form-control').blur(function() {
		if ($(this).val().length === 0) {
			$(this).next().removeClass('active');
			$(this).closest('.form-group').removeClass('active');
		};
	});

	$('.form-group')
		.mouseenter(function(e) {
			$(this).removeClass('stay');
		})
		.mouseleave(function(e) {
			if ($(this).find('.form-control').is(':focus')) {
				console.log(e);
			}
		});
});

/**
 * Coach carousel
 */
$(document).ready(function() {
	var sliderNav = '.coach-carousel-control > div';
	$(sliderNav).slick({
	  slidesToShow: 3,
	  slidesToScroll: 1,
	  dots: false,
	  centerPadding: 30,
	  centerMode: true,
	  mouseDrage: false,
	  prevArrow: '<span class="nav-carousel left"><i class="icon icon-caret-left"></i></span>',
	  nextArrow: '<span class="nav-carousel right"><i class="icon icon-caret-right"></i></span>'
	});
});

$(document).ready(function() {
	var imgBg = $('.img-bg');
	if (imgBg.length > 0) {
		$('.img-bg').imgBg();
	}
});
