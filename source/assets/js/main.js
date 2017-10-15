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
	$(sliderNav).not('.slick-initialized').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  dots: false,
	  centerPadding: 30,
	  centerMode: true,
	  mouseDrage: false,
	  prevArrow: '<span class="nav-carousel left"><i class="icon icon-caret-left"></i></span>',
	  nextArrow: '<span class="nav-carousel right"><i class="icon icon-caret-right"></i></span>',
	  mobileFirst: true,
	  responsive: [
	  	{
	  		breakpoint: 992,
	  		settings: {
	  			slidesToShow: 3,
	  			slidesToScroll: 3,
	  		}
	  	},
	  	{
	  		breakpoint: 576,
	  		settings: {
	  			slidesToShow: 2,
	  			slidesToScroll: 2,
	  		}
	  	}
	  ]
	});
	
	$('#coachModal').on('hidden.bs.modal', function(e) {
		$(sliderNav).slick('refresh');
	});

	$('#coachModal').on('show.bs.modal', function(e) {
		var button = $(e.relatedTarget),
				index = $(button).data('index');

		var modalCoach = $('.coach-modal > div')

		$(modalCoach).not('.slick-initialized').slick({
			slidesToShow: 1,
		  slidesToScroll: 1,
		  dots: false,
		  mouseDrage: false,
		  centerPadding: 120,
		  fade: true,
		  prevArrow: '<span class="nav-carousel left"><i class="icon icon-caret-left"></i></span>',
		  nextArrow: '<span class="nav-carousel right"><i class="icon icon-caret-right"></i></span>'
		});

		setTimeout(function() {
			$(modalCoach).slick('slickGoTo', index);
		}, 10);
	});
});

$(document).ready(function() {
	var imgBg = $('.img-bg');
	if (imgBg.length > 0) {
		$('.img-bg').imgBg();
	}
});

// Smooth croll
$('.btn-scroll')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

  // https://script.google.com/macros/s/AKfycbx0khILC57Nybfjhgz0_ichxjG2uwtWkrWjtQpZ0fcdfeOOTw8/exec
/**
 * Submit button
 */
$(document).ready(function() {
  var alertBox = $('#alert-box');
  $(alertBox).hide();
  
  var validator = new FormValidator('form-register', [{
    name: 'name',
    display: 'Vui lòng điền đầy đủ họ tên!',
    rules: 'required'
  }, {
    name: 'mobile',
    rules: 'required|min_length[8]',
    display: 'Số điện thoại chưa đúng định dạng!'
  }, {
    name: 'email',
    rules: 'valid_email',
    display: 'Bạn chưa điền email hoặc Email chưa đúng định dạng!'
  }], function(error, event) {
    if (error.length > 0) {
      /**
       * Show message alert in box
       */
      var msg = error[0].display;
      $(alertBox).show().addClass('alert-danger').html(msg);
    } else {
      /**
       * Check event of button submit
       */
      if (event && event.preventDefault()) {
        event.preventDefault();
      } else if (event) {
        event.returnValue = false;
      }
      /**
       * Send form data
       */
      var form = $(event.target).closest('form');
      var inputs = $(form).find('.form-control');
      var data = {};

      $(inputs).each(function(index, input) {
        var name = $(input).attr('name');
        var value = $(input).val();
        data[name] = value;
      });

      setTimeout(function() {
        var api = '//script.google.com/macros/s/AKfycbx0khILC57Nybfjhgz0_ichxjG2uwtWkrWjtQpZ0fcdfeOOTw8/exec';
		    var jqxhr = $.ajax({
		      url: api,
		      method: "POST",
		      dataType: "json",
		      data: {
		        name: data.name,
	          mobile: data.mobile,
	          email: data.email
		      },
		      success: function(data) {
		        // $(alertBox).removeClass('alert-danger').html('Đăng ký thành công!').addClass('alert-success').show();
		        $(alertBox).removeClass('alert-danger');
		        alert('Đăng ký thành công!');
		      },
		      error: function(data) {
		        alert('Lỗi đăng ký!');
		      }
		    });

      }, 300);
    }
  });
});
