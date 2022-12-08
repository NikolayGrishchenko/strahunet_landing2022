(function ($) {

	"use strict";
	
	// $(window).on('load', function () {
	// 	$('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
	// 	$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
	// 	$('body').delay(350);
	// 	$('.hero_in h1,.hero_in form').addClass('animated');
	// 	$('.hero_single, .hero_in').addClass('start_bg_zoom');
	// 	$(window).scroll();
	// });

	const observer = lozad('._lazy');
	observer.observe();
	
	// Sticky nav
	$(window).on('scroll', function () {
		if ($(window).width() > 360) {
			if ($(this).scrollTop() > 1) {
				$('.header').addClass("sticky");
			} else {
				$('.header').removeClass("sticky");
			}
			$('.header').removeClass('position-absolute');
		} else {
			$('.header').addClass('position-absolute');
		}
	});
	
	// Sticky sidebar
	$('#sidebar').theiaStickySidebar({
		additionalMarginTop: 150
	});

	// Sticky titles
	$('.fixed_title').theiaStickySidebar({
		additionalMarginTop: 180
	});
	
	// Mobile Mmenu
	var $menu = $("nav#menu").mmenu({
		"extensions": ["pagedim-black"],
		counters: true,
		keyboardNavigation: {
			enable: true,
			enhance: true
		},
		navbar: {
			title: 'MENU'
		},
		navbars: [{position:'bottom',content: ['<a href="#0">© 2022 Panagea</a>']}]}, 
		{
		// configuration
		clone: true,
		classNames: {
			fixedElements: {
				fixed: "menu_fixed",
				sticky: "sticky"
			}
		}
	});
	var $icon = $("#hamburger");
	var API = $menu.data("mmenu");
	$icon.on("click", function () {
		API.open();
	});
	API.bind("open:finish", function () {
		setTimeout(function () {
			$icon.addClass("is-active");
		}, 100);
	});
	API.bind("close:finish", function () {
		setTimeout(function () {
			$icon.removeClass("is-active");
		}, 100);
	});
	
	// WoW - animation on scroll
	var wow = new WOW(
	  {
		boxClass:     'wow',      // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset:       0,          // distance to the element when triggering the animation (default is 0)
		mobile:       true,       // trigger animations on mobile devices (default is true)
		live:         true,       // act on asynchronously loaded content (default is true)
		callback:     function(box) {
		  // the callback is fired every time an animation is started
		  // the argument that is passed in is the DOM node being animated
		},
		scrollContainer: null // optional scroll container selector, otherwise use window
	  }
	);
	wow.init();
	
	//  Video popups
	// $('.video').magnificPopup({type:'iframe'});	/* video modal*/
	$('.video').magnificPopup({
		type: 'iframe',
		iframe: {
			markup: '<div class="mfp-iframe-scaler">'+
				'<div class="mfp-close"></div>'+
				'<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'+
				'</div>', 
			patterns: {
				youtube: {
					index: 'youtube.com/', 
					id: 'v=', 
					src: 'https://www.youtube.com/embed/%id%?rel=0&iv_load_policy=3&autoplay=1',
				}
			},
			srcAction: 'iframe_src',
		}
	});

	// Image popups
	$('.magnific-gallery').each(function () {
		$(this).magnificPopup({
			delegate: 'a',
			type: 'image',
            preloader: true,
			gallery: {
				enabled: true
			},
			removalDelay: 500, //delay removal by X to allow out-animation
			callbacks: {
				beforeOpen: function () {
					// just a hack that adds mfp-anim class to markup 
					this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
					this.st.mainClass = this.st.el.attr('data-effect');
				}
			},
			closeOnContentClick: true,
			midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
		});
	});
	
	// Modal Sign In
	$('#sign-in').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
		mainClass: 'my-mfp-zoom-in'
	});

	// Modal generic
	$('#modal').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
		mainClass: 'my-mfp-zoom-in'
	});
	
	// Show Password
	$('#password').hidePassword('focus', {
		toggle: {
			className: 'my-toggle'
		}
	});

	// Forgot Password
	$("#forgot").click(function () {
		$("#forgot_pw").fadeToggle("fast");
	});
	
	// Accordion
	function toggleChevron(e) {
		$(e.target)
			.prev('.card-header')
			.find("i.indicator")
			.toggleClass('ti-minus ti-plus');
	}
	$('.accordion_2').on('hidden.bs.collapse shown.bs.collapse', toggleChevron);
		function toggleIcon(e) {
        $(e.target)
            .prev('.panel-heading')
            .find(".indicator")
            .toggleClass('ti-minus ti-plus');
    }
	
	// Jquery select
	$('.custom-search-input-2 select, .custom-select-form select').niceSelect();
	
	// Atltenative checkbox styles - Switchery
	var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
	elems.forEach(function (html) {
		var switchery = new Switchery(html, {
			size: 'small'
		});
	});
	
	// Like Icon
    $('.wish_bt').on('click', function(e){
    	e.preventDefault();
		$(this).toggleClass('liked');
	});
	
	// Collapse filters
	$(window).bind('load resize', function () {
		var width = $(window).width();
		if ($(this).width() < 991) {
			$('.collapse#collapseFilters').removeClass('show');
		} else {
			$('.collapse#collapseFilters').addClass('show');
		};
	});
	
	//Scroll to top
	$(window).on('scroll', function () {
		'use strict';
		if ($(this).scrollTop() != 0) {
			$('#toTop').fadeIn();
		} else {
			$('#toTop').fadeOut();
		}
	});
	$('#toTop').on('click', function () {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
	});
	
	// Carousels
	$('#carousel').owlCarousel({
		center: true,
		items: 2,
		loop: true,
		margin: 10,
		responsive: {
			0: {
				items: 1,
				dots:false
			},
			600: {
				items: 2
			},
			1000: {
				items: 4
			}
		}
	});
	$('#reccomended').owlCarousel({
		center: true,
		items: 2,
		loop: true,
		margin: 0,
		responsive: {
			0: {
				items: 1
			},
			767: {
				items: 2
			},
			1000: {
				items: 3
			},
			1400: {
				items: 4
			}
		}
	});

	$('#reccomended_adventure').owlCarousel({
		center: false,
		items: 2,
		loop: false,
		margin: 15,
		responsive: {
			0: {
				items: 1
			},
			767: {
				items: 3
			},
			1000: {
				items: 4
			},
			1400: {
				items: 5
			}
		}
	});

	// Sticky filters
	$(window).bind('load resize', function () {
		var width = $(window).width();
		if (width <= 991) {
			$('.sticky_horizontal').stick_in_parent({
				bottoming:false,
				offset_top: 50
			});
		} else {
			$('.sticky_horizontal').stick_in_parent({
				bottoming:false,
				offset_top: 67
			});
		}
	});

	// Opacity mask
	$('.opacity-mask').each(function(){
		$(this).css('background-color', $(this).attr('data-opacity-mask'));
	});

	// Aside panel
	$(".aside-panel-bt").on("click", function () {
		$("#panel_dates").toggleClass("show")
		$(".layer").toggleClass("layer-is-visible")
	});

	// Show more button
	$(".content_more").hide();
    $(".show_hide").on("click", function () {
        var txt = $(".content_more").is(':visible') ? 'Read More' : 'Read Less';
        $(this).text(txt);
        $(this).prev('.content_more').slideToggle(200);
    });
	            
	// Secondary nav scroll
	var $sticky_nav= $('.secondary_nav');
	$sticky_nav.find('a').on('click', function(e) {
		e.preventDefault();
		var target = this.hash;
		var $target = $(target);
		$('html, body').animate({
			'scrollTop': $target.offset().top - 140
		}, 400, 'swing');
	});
	$sticky_nav.find('ul li a').on('click', function () {
		$sticky_nav.find('ul li a.active').removeClass('active');
		$(this).addClass('active');
	});
	
	// Faq section
	$('#faq_box a[href^="#"]').on('click', function () {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
			|| location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			   if (target.length) {
				 $('html,body').animate({
					 scrollTop: target.offset().top -185
				}, 400);
				return false;
			}
		}
	});
	$('ul#cat_nav li a').on('click', function () {
		$('ul#cat_nav li a.active').removeClass('active');
		$(this).addClass('active');
	});
	
	// Button show/hide map
	$(".btn_map, .btn_map_in").on("click", function () {
		var el = $(this);
		el.text() == el.data("text-swap") ? el.text(el.data("text-original")) : el.text(el.data("text-swap"));
		$('html, body').animate({
			scrollTop: $("body").offset().top +385
		}, 400);
	});
	
	// Panel Dropdown
    function close_panel_dropdown() {
		$('.panel-dropdown').removeClass("active");
    }
    $('.panel-dropdown a').on('click', function(e) {
		if ( $(this).parent().is(".active") ) {
            close_panel_dropdown();
        } else {
            close_panel_dropdown();
            $(this).parent().addClass('active');
        }
        e.preventDefault();
    });

    // Closes dropdown on click outside the conatainer
	var mouse_is_inside = false;

	$('.panel-dropdown').hover(function(){
	    mouse_is_inside=true;
	}, function(){
	    mouse_is_inside=false;
	});

	$("body").mouseup(function(){
	    if(! mouse_is_inside) close_panel_dropdown();
	});
	
	/* Dropdown user logged */
	$('.dropdown-user').hover(function () {
		$(this).find('.dropdown-menu').stop(true, true).delay(50).fadeIn(300);
	}, function () {
		$(this).find('.dropdown-menu').stop(true, true).delay(50).fadeOut(300);
	});

	// Search half screen map
	$('a.search_map').on('click',function () {
		$('.search_map_wp').slideToggle("fast");
	});

	// Range slider half screen map
	$('input[type="range"]').rangeslider({
		polyfill: false,
		onInit: function () {
			this.output = $(".distance span").html(this.$element.val());
		},
		onSlide: function (
			position, value) {
			this.output.html(value);
		}
	});

	// Range DatePicker scroll fix
	$(function () {
	    $(window).bind("resize", function () {
	        if ($(this).width() < 768) {
	            $('.input-dates').removeClass('scroll-fix')
	        } else {
	            $('.input-dates').addClass('scroll-fix')
	        }
	    }).trigger('resize');
	});

	// Header button explore
    $('a[href^="#"].btn_explore').on('click', function (e) {
			e.preventDefault();
			var target = this.hash;
			var $target = $(target);
			$('html, body').stop().animate({
				'scrollTop': $target.offset().top -50
			}, 300, 'swing', function () {
				window.location.hash = target;
			});
		});


    // Menu hover effect
    $(".main-menu > ul > li").hover(function() {
	  $(this).siblings().stop().fadeTo(300, 0.6);
	  $(this).parent().siblings().stop().fadeTo(300, 0.3); 
	}, function() { // Mouse out
	  $(this).siblings().stop().fadeTo(300, 1);
	  $(this).parent().siblings().stop().fadeTo(300, 1);
	});

	$('#tour-book-carousel').owlCarousel({
		loop: true,
		margin: 8,
		nav: true,
		dots: false,
		pagination: false,
	    navText: [
	        '<i class="tour-book-carousel-arrow --right"></i>',
	        '<i class="tour-book-carousel-arrow --left"></i>',
	    ],
	    navContainer: '#tour-book-carousel + .owl-theme .owl-nav',
		responsive: {
			0: {
				items: 1,
				stagePadding: 16,
			},
			375: {
				items: 1,
				stagePadding: 44,
			},
			767: {
				items: 3,
				margin: 8,
				stagePadding: 40,
			},
			1000: {
				margin: 8,
				items: 3,
				stagePadding: 10,
			},
			1400: {
				items: 4
			}
		}
	});

	$('.js-sn-carousel [data-heading]').on('click', function (e) {
		let $heading = $(e.target || e.srcElement);
		let $item = $heading.closest('[data-item]');
		$item.toggleClass('--visible');
		$item.siblings().removeClass('--visible');
	});

	$('.js-sn-carousel [data-show-all]').on('click', function (e) {
		let $btn = $(e.target || e.srcElement);
		let $items = $btn.closest('.js-sn-carousel').find('[data-item]');
		$items.addClass('--visible');
	});

	let isOpenedSelect = false;
	$(document).on('select2:open', '.js-sn-menu-select', function (e) {
		let $select = $(e.target || e.srcElement);
		let $container = $select.closest('[data-body-class]');
		isOpenedSelect = true;
		$('body').attr('data-select2-active', $container.data('body-class'));
	});
	$(document).on('select2:close', '.js-sn-menu-select', function (e) {
		let $select = $(e.target || e.srcElement);
		let $container = $select.closest('[data-body-class]');
		setTimeout(function () {
			if (!isOpenedSelect)
			{
				isOpenedSelect = false;
				$('body').removeAttr('data-select2-active');
			}
		}, 150)
	});

	$('.js-sn-menu-select select').select2();


	$('#m-tour-header-carousel').owlCarousel({
		items: 1,
		loop: true,
		center: true,
		dots: false,
		stagePadding: 16,
		margin: 8,
	});

	$('#m-tour-detail-schedule-carousel').owlCarousel({
		items: 1,
		loop: true,
		center: true,
		dots: false,
		stagePadding: 16,
		margin: 8,
	});

	$('#m-tour-detail-tariff-carousel').owlCarousel({
		items: 1,
		loop: true,
		center: true,
		dots: false,
		stagePadding: 16,
		margin: 8,
		responsive: {
			375: {
				stagePadding: 44,
			},
			767: {
				margin: 19,
				stagePadding: 210,
			},
			1200: {
				items: 3,
				margin: 21,
				stagePadding: 80,
				loop: false,
				center: false,
			},
		}
	});

	$('.js-sn-menu-select select').select2();

	$('[class*="__variant_"]:not(.__variant_0)').css('display', 'none');
	var __variant_num = 0;
	$(window).on('keyup', function (e) {
		if (e.keyCode === 86 && e.shiftKey) {
			__variant_num = __variant_num > 5 ? 0 : __variant_num+1;
			console.log('Current variant:', __variant_num);
			$('[class*="__variant_"]').css('display', 'none');
			$('.__variant_'+__variant_num+'').css('display', '');
		}
	});

	let $yaMapRating = $('[data-sn-rating="yandex"]');
	ymaps.ready(function () {
		ymaps.findOrganization('127838508707').then(function (orgGeoObject) {
			let rating = orgGeoObject.properties.get('rating');

			let $starContainer = $yaMapRating.find('.stars');
			let starIndex = 0;
			$starContainer.html('');
			for (; starIndex < Math.floor(rating.score); starIndex++) {
				$starContainer.append($('<span class="sn-rate-star">'));
			}

			let fractional = Math.floor((rating.score % 1) * Math.pow(10, 2));
			if (fractional > 0) {
				$starContainer.append($('<span class="sn-rate-star sn-rate-star--half">'));
				starIndex++;
			}

			for (; starIndex < 5; starIndex++) {
				$starContainer.append($('<span class="sn-rate-star sn-rate-star--empty">'));
			}

			$yaMapRating.addClass('loaded');
			$yaMapRating.find('.count').text(rating.ratings);

			if (fractional == 0) {
				$yaMapRating.find('.score').text(rating.score+'.0');
			} else {
				$yaMapRating.find('.score').text(rating.score);
			}
		});
	});
})(window.jQuery); 

