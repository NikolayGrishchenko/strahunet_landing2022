(function ($) {
	"use strict";
	
	$(window).on('load', function () {
		$('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
		$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
		$('body').delay(350);
		$(window).scroll();
	});

	// not working, heh
	let onB24awaiterCall = function (e) {
		let b24callerAwaiter = setInterval(() => {
			if (window.b24form && $.grishchenk.b24customizer) {
				clearInterval(b24callerAwaiter);
				$(document).off('click', '.b24-callback-form-btn', onB24awaiterCall);
				$.grishchenk.b24customizer.showPopup();
			}
		}, 50);
	};
	$(document).on('click', '.b24-callback-form-btn', onB24awaiterCall);
	
	setTimeout(() => {
		$(window).on('scroll', function () {
			if ($(window).width() > 360) {
				if ($(this).scrollTop() > 25) {
					$('.header').addClass("sticky");
				} else {
					$('.header').removeClass("sticky");
				}
				$('.header').removeClass('position-absolute');
			} else {
				$('.header').addClass('position-absolute');
			}
		});
	}, 510);
	
	const observer = lozad('._lazy');
	observer.observe();
	window._lazy = observer;
	let onCarouselDragged = () => _lazy.observe();
	setTimeout(() => _lazy.observe(), 1200);

	$('#m-tour-header-carousel').owlCarousel({
		items: 1,
		loop: true,
		center: true,
		dots: false,
		stagePadding: 16,
		margin: 8,
		onDragged: onCarouselDragged,
	});

	setTimeout(() => {
		$('#tour-book-carousel').owlCarousel({
			// loop: true,
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
				380: {
					items: 1,
					stagePadding: 20,
				},
				450: {
					items: 1,
					stagePadding: 80,
				},
				576: {
					items: 1,
					stagePadding: 100,
				},
				767: {
					items: 3,
					margin: 8,
					stagePadding: 40,
				},
				992: {
					items: 2,
					margin: 8,
					stagePadding: 40,
				},
				1000: {
					margin: 8,
					items: 3,
					stagePadding: 25,
				},
				1400: {
					items: 4,
					stagePadding: 25,
				},
			},
			onDragged: onCarouselDragged,
		});
	}, 500);

	function initScroller()
	{
		let headerOuterOffset;
		if ($(window).width() >= 375)
			headerOuterOffset = $('header.header').outerHeight() + $('.tour-detail-section-nav').outerHeight() + 25;
		else
			headerOuterOffset = 25;

		let sections = [], section;
		let $scrollAnchors = $('.tdb-anchor'), $sect;
		$scrollAnchors.each((i, scrollAnchor) => 
		{
			$sect = $(scrollAnchor).closest('.tour-detail-block');
			if ($sect.outerHeight() > 10) {
				let from = $sect.find('.main_title_3 em').offset().top - 180;
				let scrollTop = $sect.find('.main_title_3 em').offset().top - headerOuterOffset;
				let to = $sect.find('.main_title_3 em').offset().top + 220;
				sections.push({
					index: i,
					from: from,
					to: to,
					scrollTo: scrollTop,
					element: $sect,
				});

				console.log(sections);

				// let t = document.createElement('div');
				// t.style.width = '16px';
				// t.style.height = '16px';
				// t.style.position = 'absolute';
				// t.style.left = '20px';
				// t.style.top = scrollTop + 'px';
				// t.style.backgroundColor = 'yellow';
				// t.style.zIndex = '99999';
				// t.classList.add('__test');
				// $(document.body).append(t);

				// t = document.createElement('div');
				// t.style.width = '40vw';
				// t.style.height = '2px';
				// t.style.position = 'absolute';
				// t.style.left = '20px';
				// t.style.top = from + 'px';
				// t.style.backgroundColor = 'red';
				// t.style.zIndex = '99999';
				// t.classList.add('__test');
				// $(document.body).append(t);

				// t = document.createElement('div');
				// t.style.width = '40vw';
				// t.style.height = '2px';
				// t.style.position = 'absolute';
				// t.style.right = '20px';
				// t.style.top = to + 'px';
				// t.style.backgroundColor = 'green';
				// t.style.zIndex = '99999';
				// t.classList.add('__test');
				// $(document.body).append(t);

				// t = document.createElement('div');
				// t.innerText = $sect.find('.tdb-heading').eq(0).text();
				// t.style.position = 'absolute';
				// t.style.left = '20px';
				// t.style.top = (from + 40) + 'px';
				// t.style.backgroundColor = 'white';
				// t.style.zIndex = '99999';
				// t.classList.add('__test');
				// $(document.body).append(t);

				// t = document.createElement('div');
				// t.innerText = $sect.find('.tdb-heading').eq(0).text();
				// t.style.position = 'absolute';
				// t.style.right = '20px';
				// t.style.top = (to - 40) + 'px';
				// t.style.backgroundColor = 'white';
				// t.style.zIndex = '99999';
				// t.classList.add('__test');
				// $(document.body).append(t);
			}
		});
		// console.log(sections);

		var checkScrollSpeed = (function(settings)
		{
		    settings = settings || {};
		  
		    var lastPos, newPos, timer, delta,
		    	// in "ms" (higher means lower fidelity )
		        delay = settings.delay || 300;
		  
		    function clear() {
				lastPos = null;
				delta = 0;
		    }
		    clear();
		    
		    return function() {
				newPos = window.scrollY;
				if ( lastPos != null ) {
					delta = newPos - lastPos;
				}
				lastPos = newPos;
				clearTimeout(timer);
				timer = setTimeout(clear, delay);
				return delta;
		    };
		})();

		let activeSection, blocked, scrollDirection, lastScrollTop, activeSections;
		let keys = {37: 1, 38: 1, 39: 1, 40: 1};
		let supportsPassive = false;
		try {
			window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
				get: function () { supportsPassive = true; } 
			}));
		} catch (e) {}

		let wheelOpt = supportsPassive ? { passive: false } : false;
		let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

		function preventDefaultForScrollKeys (e)
	    {
			if (keys[e.keyCode]) {
				preventDefault(e);
				return false;
			}
	    }

	    function preventDefault(e)
	    {
			e.preventDefault();
	    }

	    function disableScroll()
	    {
			window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
			window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
			window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
			window.addEventListener('keydown', preventDefaultForScrollKeys, false);
	    }

	    function enableScroll()
	    {
			window.removeEventListener('DOMMouseScroll', preventDefault, false);
			window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
			window.removeEventListener('touchmove', preventDefault, wheelOpt);
			window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
	    }

		$(window).scroll(e => {
			let speed = Math.abs(checkScrollSpeed());
			if (!blocked && speed > 2 && speed < 23)
			{
				var st = window.pageYOffset || document.documentElement.scrollTop;
				if (st > lastScrollTop){
					scrollDirection = 'down';
				} else {
					scrollDirection = 'up';
				}
				lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

				activeSections = [];
				if (
					activeSection
					&& (window.scrollY + headerOuterOffset < activeSection.from || window.scrollY + headerOuterOffset > activeSection.to)
				) {
					activeSection = false;
				}
				for (let section of sections) {
					if (
						window.scrollY + headerOuterOffset >= section.from
						&& window.scrollY + headerOuterOffset < section.to
						&& activeSection !== section
					) {
						activeSections.push(section);
					}
				}

				if (!activeSections.length)
					return;

				blocked = true;
				// console.log('blocked');

				let section;
				if (scrollDirection === 'down')
					section = activeSections[0];
				else
					section = activeSections[activeSections.length - 1];

				window.scrollTo({
					top: section.scrollTo,
					behavior: 'smooth',
				});
				let instantScrollInterval;
				setTimeout(() => {
					instantScrollInterval = setInterval(() => {
						window.scrollTo({
							top: section.scrollTo,
							behavior: 'smooth',
						});
					}, 100);
				}, 400);
				setTimeout(() => {
					clearInterval(instantScrollInterval);
					// console.log('non blocking');
					blocked = false;
					enableScroll();
				}, 900);

				activeSection = section;
				disableScroll();
				// console.log(scrollDirection, activeSections);
			}
		});
	}

	$(document).on('custom_js_ready', function () {
		$(document).magnificPopup({
			delegate: '.video',
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

		$('body').addClass('__custom_js_ready');
		$('a[data-type="ajax"]').each((i, el) => {
			$(el).attr('href', $(el).attr('data-await-href'));
			$(el).removeAttr('data-await-href');
		});
	    $('a[data-type="ajax"]').off('click', awaitFancyboxLoad);
    	$('.sn-loading').removeClass('sn-loading');

		// Popup custom settings
		$('[data-fancybox]').fancybox({
			afterLoad: function (e) {
				if (!e.$trigger[0])
					return;

				let $trigger = $(e.$trigger[0]), title, $content;
				$content = $(e.$refs.container).find('.fancybox-content');
				if (title = $trigger.data('title')) {
					$content.find('.sn-popup__heading').html('<span>'+title+'</span>');
				}
			},
			beforeShow: function () {
				$('.m-tour-detail-actions').css('display', 'none');
				$("body").css({'overflow-y': 'hidden'});
			},
			beforeClose: function () {
				$('.m-tour-detail-actions').removeAttr('style');
				$("body").css({'overflow-y': ''});
			},
		});

		// if ($(window).width() < 768) {
		// 	let scrollerAwaiter = setInterval(() => {
		// 		if ($('[data-app] .sw-app-body').length) {
		// 			clearInterval(scrollerAwaiter);
		// 			setTimeout(initScroller, 100);
		// 		}
		// 	}, 40);
		// }
	});

	setTimeout(() => {
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
				if (!isOpenedSelect) {
					isOpenedSelect = false;
					$('body').removeAttr('data-select2-active');
				}
			}, 150)
		});

		$('.js-sn-menu-select select').select2();
	}, 600);

	setTimeout(() => {
		$('#m-tour-detail-schedule-carousel').owlCarousel({
			items: 1,
			// loop: true,
			// center: true,
			dots: false,
			stagePadding: 16,
			margin: 8,
			onDragged: onCarouselDragged,
		});

		$('#m-tour-detail-tariff-carousel').owlCarousel({
			items: 1,
			// loop: true,
			// center: true,
			dots: false,
			stagePadding: 16,
			margin: 8,
			responsive: {
				375: {
					stagePadding: 15,
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
			},
			onDragged: onCarouselDragged,
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
	}, 360);

	$(document).on('custom_js_ready', function () {
		// Image popups
		$('.magnific-gallery').each(function () {
			$(this).magnificPopup({
				delegate: 'a',
				type: 'image',
	            preloader: true,
				gallery: {
					enabled: true
				},
				removalDelay: 500,
				callbacks: {
					beforeOpen: function () {
						this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
						this.st.mainClass = this.st.el.attr('data-effect');
					},
				},
				closeOnContentClick: true,
				midClick: true,
			});
		});

		$(document).on('click', '.js-callback-contact-form [type="submit"]', function(e) {
			e.preventDefault();

		    var $validateForm = $(e.target || e.srcElement).closest('form');
		    $validateForm.validate({
		        rules: {
		            name: {
		                required: true,
		                minlength: 2
		            },
		            phone: {
		                required: true,
		                minlength: 12,
		                maxlength: 13,
		            }
		        },
		        messages: {
		            name: {
		                required: "Заполните поле",
		                minlength: "Имя должно быть более 2-х символов"
		            },
		            phone: {
		                required: "Введите телефон",
		                minlength: "Введен неверный номер телефона",
		                maxlength: "Введен неверный номер телефона",
		            }
		        },
		        submitHandler: function (form) {
		        	console.log(form);             
		        },
		        errorPlacement: function (error, element) { },
		        invalidHandler: function (form, validator) {
		        	var hasErrors = !!validator.numberOfInvalids(), error;
					if (hasErrors) {
						for (error of validator.errorList) {
							$(error.element).siblings('small').text(error.message);
						}
					}

		        },
		    });
		 
		    $validateForm.submit();
		});

		$(document).on('keyup', '.js-phone-input-autoprefix', function (e) {
			let $phoneInput = $(e.target || e.srcElement);
			let originalValue = $phoneInput.val();
			if (originalValue[0] !== '+') {
				originalValue = '+' + originalValue;
			}
			$phoneInput.val(originalValue.replace(/[^\d+]/g, ''));
		});

		$(document).on('click', '.js-add2favorite', function (e) {
			let $favBtn = $(e.currentTarget || e.srcElement);
			if ($favBtn.hasClass('active')) {
				$favBtn.removeClass('active');
			} else {
				$favBtn.addClass('active');
			}
		});
	});

	let currentUrl = location.protocol + '//' + location.host + location.pathname;
	jQuery.getCss = function (url, media, callback) {
	    jQuery('<link>').attr({
			href: url,
			media: media || 'screen',
			type: 'text/css',
			rel: 'stylesheet',
			'data-loaded': true,
	    }).insertAfter('#noncritical_resources');
	    jQuery('<img>').attr('src', url)
	   		.on("error", callback);
	};
	jQuery.getJs = function (url, params) {
		if (params) {
			(window.jsResources = window.jsResources || []).push({
				name: params.name, 
				order: window.jsResources.length, 
				type: params.type, 
				loadType: params.loadType,
				url: url, 
			});
		}
		var s = document.createElement('script');
		s.src = url;
		var h = document.getElementById('noncritical_resources');
		h.parentNode.insertBefore(s, h);
	}
	setTimeout(() => $.getCss('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap'), 400);
	setTimeout(() => $.getCss(currentUrl+'css/bootstrap-noncritical.min.css'), 430);

	let awaitFancyboxLoad = function (e) {
		let $modalTrigger = $(e.currentTarget || e.srcElement);
		$modalTrigger.addClass('sn-loading');
		let loadAwaiter = setInterval(() => {
			if (jQuery && jQuery.fancybox && jQuery.fancybox.dragger) {
				clearInterval(loadAwaiter);
				$('a[data-fancybox-href]').off('click', awaitFancyboxLoad);
				$modalTrigger.attr('href', $modalTrigger.attr('data-fancybox-href'));
				$modalTrigger.removeAttr('data-fancybox-href');
				$modalTrigger.attr('data-fancybox', true);
				$modalTrigger.attr('data-type', 'ajax');
				$modalTrigger.trigger('click');
			}
		}, 25);
		e.preventDefault();
		return false;
	}
    $('a[data-fancybox-href]').on('click', awaitFancyboxLoad);

	let interactionEvents = 'keydown mouseover touchmove touchstart wheel';
	function detectUserInteraction() {
		$.getCss(currentUrl+'css/vendors-noncritical.css');
		$.getCss(currentUrl+'css/jquery.fancybox.min.css');
		$.getJs(currentUrl+'js/common_scripts_lazy.js');
		$.getJs('https://api-maps.yandex.ru/2.1/?apikey=aa513688-f5e1-482a-a563-8cc45d3879d4&lang=ru_RU', {
			name: 'ymaps',
			version: '2.1',
			loadType: 'interacted',
			type: 'vendor',
		});
		setTimeout(() => $.getJs('https://res.smartwidgets.ru/app.js'), 50);

		let $document = $('document');
		let mainLazyAwaiter = setInterval(() => {
			if (
				$.fancybox
				&& window.ymaps
				&& $.magnificPopup
				&& typeof $document.swipe === 'function'
			) {
				clearInterval(mainLazyAwaiter);
				$.getJs(currentUrl+'js/main_lazy.js');
			}
		}, 25);

		if ($(window).width() >= 768) {
			$('.__md-remove').remove();
		}

	    interactionEvents.split(' ').forEach(function (e) {
	        window.removeEventListener(e, detectUserInteraction, false);
	    });
	}
	interactionEvents.split(' ').forEach(function (e) {
        window.addEventListener(e, detectUserInteraction, false);
    });
})(window.jQuery);