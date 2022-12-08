// ==================================================
// Grishchenko's dragger for fancyBox
// ==================================================
(function (window, document, $, undefined) {
  "use strict";

  window.console = window.console || {
    info: function (stuff) {}
  };

  // If there's no jQuery, fancyBox can't work
  // =========================================

  if (!$) {
    return;
  }

  // Check if fancyBox is not initialized
  // ========================================

  if (!$.fn.fancybox) {
    console.info("fancyBox is not initialized to init custom dragger");
    return;
  }

  // Init
  // ========================================

  $.fancybox.dragger =
  {
    initEvents: function ()
    {
      let dirAttrValue, $showBtn;
      $('[data-touch^="drag-"]').each((i, showBtn) => {
        $showBtn = $(showBtn);
        dirAttrValue = $showBtn.attr('data-touch').substr(5);
        $showBtn.attr('data-touch-dir', dirAttrValue);
        $showBtn.attr('data-touch', 'false');
      });

      // Init scroll disabler
      // Modern Chrome requires { passive: false } when adding event
      let supportsPassive = false;
      try {
        window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
          get: function () { supportsPassive = true; } 
        }));
      } catch (e) {}

      this.wheelOpt = supportsPassive ? { passive: false } : false;
      this.wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

      $(document).on('touchstart', '[data-fancybox-dragclose]', e => $.proxy(this.onTouchStart(e)));
      $(document).on('touchmove', '[data-fancybox-dragclose]', e => $.proxy(this.onTouchMove(e)));
      $(document).on('touchend', '[data-fancybox-dragclose]', e => $.proxy(this.onTouchEnd(e)));
    },

    init: function ()
    {
      // left: 37, up: 38, right: 39, down: 40,
      // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
      this.keys = {37: 1, 38: 1, 39: 1, 40: 1};

      this.clientX = false;
      this.clientY = false;
      this.instance = false;
      this.direction = false;
      this.$refs = {};
      this.$refs.content = false;

      this.initEvents();
    },

    preventDefaultForScrollKeys: function (e)
    {
      if (this.keys[e.keyCode]) {
        this.preventDefault(e);
        return false;
      }
    },

    preventDefault: function (e)
    {
      e.preventDefault();
    },

    disableScroll: function ()
    {
      window.addEventListener('DOMMouseScroll', this.preventDefault, false); // older FF
      window.addEventListener(this.wheelEvent, this.preventDefault, this.wheelOpt); // modern desktop
      window.addEventListener('touchmove', this.preventDefault, this.wheelOpt); // mobile
      window.addEventListener('keydown', this.preventDefaultForScrollKeys, false);
    },

    enableScroll: function ()
    {
      window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
      window.removeEventListener(this.wheelEvent, this.preventDefault, this.wheelOpt); 
      window.removeEventListener('touchmove', this.preventDefault, this.wheelOpt);
      window.removeEventListener('keydown', this.preventDefaultForScrollKeys, false);
    },

    onTouchStart: function (e)
    {
      this.instance = $.fancybox.getInstance();
      if (!this.instance)
        return false;

      if (this.instance.$trigger[0]) {
        this.direction = $(this.instance.$trigger[0]).attr('data-touch-dir');

        this.$refs.content = $(this.instance.$refs.container[0]).find('.fancybox-content');

        $(this.instance.$refs.container[0])
          .find('.fancybox-content')
          .addClass('fancybox-content--draggable-'+this.direction)
          .closest('.fancybox-slide--current')
          .css('overflow', 'hidden');
        this.clientX = e.touches[0].clientX;
        this.clientY = e.touches[0].clientY;

        this.disableScroll();
      }
    },

    onTouchMove: function (e)
    {
      let deltaX = e.changedTouches[0].clientX - this.clientX;
      let deltaY = e.changedTouches[0].clientY - this.clientY;
      if (this.direction === 'bottom' && deltaY > 0) {
        this.$refs.content.css('transform', 'translateY('+deltaY+'px)');
      } else if (this.direction === 'top' && deltaY < 0) {
        this.$refs.content.css('transform', 'translateY('+deltaY+'px)');
      } else if (this.direction === 'left' && deltaX < 0) {
        this.$refs.content.css('transform', 'translateX('+deltaX+'px)');
      } else if (this.direction === 'right' && deltaX > 0) {
        this.$refs.content.css('transform', 'translateX('+deltaX+'px)');
      }
    },

    onTouchEnd: function (e)
    {
      if (!this.instance)
        return;

      this.$refs.content.removeClass('fancybox-content--draggable-'+this.direction);
      this.$refs.content.closest('.fancybox-slide--current')
        .css('overflow', 'hidden');

      let deltaX = e.changedTouches[0].clientX - this.clientX;
      let deltaY = e.changedTouches[0].clientY - this.clientY;
      if (
        this.direction === 'bottom' && deltaY > 40
        || this.direction === 'top' && deltaY > -40
        || this.direction === 'right' && deltaX > 40
        || this.direction === 'left' && deltaX > -40
      ) {
        this.instance.close();
        this.direction = false;
        this.instance = false;
        this.$refs.content = false;
      } else {
		this.$refs.content.css('transform', 'none');
      }
      
      this.enableScroll();
    },
  };

  $.fancybox.dragger.init();
})(window, document, jQuery);

// Touch left to show mobile popup
let clientX, windowWidth, allow2triggerMMenu;
$(document).on('touchstart', '#page', (e) => {
  clientX = e.touches[0].clientX;
});
$(document).on('touchend', '#page', (e) => {
  windowWidth = $(window).width();
  allow2triggerMMenu = $(e.target).closest('.owl-carousel, .owl-theme, .tdb-ya-reviews').length < 1;
  if (allow2triggerMMenu && windowWidth < 992) {
    let hasActivePopup = jQuery.fancybox && jQuery.fancybox.getInstance();
    let deltaX = e.changedTouches[0].clientX - clientX;
    if (deltaX < -160 && !hasActivePopup) {
      $('.js-m-menu-show').trigger('click');
    }
  }
});

// ==================================================
// Grishchenko's custom functions
// ==================================================
$.grishchenk = $.grishchenk || {};
$.grishchenk.eTarget = function (event)
{
  if (event.target)
    return $(event.target);
  else if (event.srcElement)
    return $(event.srcElement);
  return null;
};

//Returns true if it is a DOM node
$.grishchenk.isNode = function (o) {
  return (
    typeof Node === "object" ? o instanceof Node : 
    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
  );
}

//Returns true if it is a DOM element    
$.grishchenk.isElement = function (o) {
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
  );
}

// ==================================================
// Grishchenko's notes
// ==================================================
$.grishchenk = $.grishchenk || {};
$.grishchenk.note = {
  init: function ()
  {
    this.noteClass = 'sn-note';
    this.noteSelector = '.'+this.noteClass;

    this.initEvents();
  },
  initEvents: function ()
  {
    $('[data-note]').hover(
      e => this.onHoverIn(e),
      e => this.onHoverOut(e)
    );
    $(document).on('click', '[data-note]', e => this.onHoverIn(e));
    $(document).on('touchstart', e => this.onHoverOut(e));
  },
  onHoverIn: function (e)
  {
    let $trigger = $(e.currentTarget || e.srcElement),
      text = $trigger.attr('data-note'),
      position = $trigger.attr('data-note-pos') || 'top';

    this.show($trigger, text, position);

  },
  onHoverOut: function (e)
  {
    $(this.noteSelector).remove();
  },
  createTitle: function (text)
  {
    let $noteTitle = $('<span>').addClass(this.noteClass+'__title');
    $noteTitle.text(text);
    return $noteTitle;
  },
  createArrow: function (position)
  {
    return $('<div>')
      .addClass('sn-note__arrow')
      .addClass('sn-note__arrow--'+position);
  },
  createContainer: function ()
  {
    return $('<div>').addClass('sn-note');
  },
  computeParams: function (element, $note, $noteArrow)
  {
    let structParams = {};
    let $element = $(element);

    let elementStyle = getComputedStyle($element.get(0));
    structParams.elementWidth = parseFloat(elementStyle.width);
    structParams.elementHeight = parseFloat(elementStyle.height);

    let triggerOffset = $element.offset();
    structParams.offsetLeft = triggerOffset.left;
    structParams.offsetTop = triggerOffset.top;

    let arrowStyle = getComputedStyle($($noteArrow).get(0));
    structParams.arrowWidth = parseFloat(arrowStyle.width);
    structParams.arrowHeight = parseFloat(arrowStyle.height);

    let containerStyle = getComputedStyle($($note).get(0));
    structParams.noteWidth = parseFloat(containerStyle.width) + structParams.arrowWidth;
    structParams.noteHeight = parseFloat(containerStyle.height);

    return structParams;
  },
  prepareNoteStyle: function (element, $note, $noteArrow, position)
  {
    let structParams = this.computeParams(element, $note, $noteArrow);
    let translateX, translateY;
    switch (position) {
      case 'left':
        translateX = -structParams.noteWidth;
        translateY = -8;
        break;
      case 'right':
        let triggerWidth = structParams.elementWidth + structParams.arrowWidth;
        translateX = structParams.elementWidth;
        translateY = 0;
        break;
      case 'bottom':
        let triggerHeight = structParams.elementHeight + structParams.arrowHeight;
        translateX = 0;
        translateY = triggerHeight;
        break;
      default: // top position
        translateX = 0;
        translateY = -structParams.noteHeight;
        break;
    }
    $note.css('left', structParams.offsetLeft + 'px');
    $note.css('top', structParams.offsetTop + 'px');
    $note.css('transform', 'translate('+translateX+'px, '+translateY+'px)');
  },
  show: function (element, text, position = 'left')
  {
    let $note, $noteArrow;
    $note = this.createContainer();
    $noteArrow = this.createArrow(position);
    $note.append($noteArrow);
    $note.append(this.createTitle(text));
    $('body').append($note);

    this.prepareNoteStyle(element, $note, $noteArrow, position);

    $note.animate({opacity: 1}, 200);
  },
};
$.grishchenk.note.init();

// ==================================================
// Grishchenko's Bitrix24 popup customizer
// ==================================================
$.grishchenk = $.grishchenk || {};
$.grishchenk.b24customizer = {
  init: function ()
  {
    this.elements = {};
    this.activeFormSelector = '[data-styles-apllied] .b24-window';

    this.initTrigger();
    this.initEvents();
    this.inited = false;
    this.allowFancyboxClose = true;
  },
  initEvents: function ()
  {
    $(document).on('click', '.b24-callback-form-btn', e => this.showPopup(e));
    $(document).on('click', '.b24-window-back', e => this.onBackBtnClick(e));
    $(document).on('click', '.b24-window-close', e => this.onCloseBtnClick(e));
  },
  initElements: function ()
  {
    let $container = $(this.activeFormSelector);
    this.elements.$container = $container;
    this.elements.$title = $container.find('.b24-form-header-title');
    this.elements.$description = $container.find('.b24-form-header-description');
    this.elements.$submit = $container.find('[type="submit"]');
    this.elements.$close = $container.find('.b24-window-close');
    this.elements.$agreement = $container.find('label.b24-form-control-container');
    this.elements.$agreementCheckbox = $container.find('label.b24-form-control-container [type=checkbox]');
    this.elements.$agreementLink = this.elements.$agreement.find('.b24-form-field-agreement-link');

    let $arrowLeft = $('<button>').addClass('b24-window-back');
    this.elements.$close.before($arrowLeft);
    this.elements.$arrowLeft = $arrowLeft;
  },
  initTrigger: function ()
  {
    if (this.inited)
      return;

    let b24script = `
      (function(w,d,u){
        var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);
        var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
      })(window,document,'https://strahunet.com/upload/crm/form/loader_6_svj5fl.js');
    `;
    let $b24script = $('<script>')
      .attr('data-b24-form', 'click/6/svj5fl')
      .html(b24script);
    let $b24trigger = $('<button>')
      .attr('id', 'b24-callback-form-btn');
    let $b24triggerContainer = $('<div>')
      .css('display', 'none')
      .append($b24script)
      .append($b24trigger);
    $('body')
      .append($b24triggerContainer);

    this.elements.$trigger = $b24trigger;
  },
  showPopup: function ()
  {
    this.elements.$trigger.trigger('click');
    if (!this.inited) {
      this.catchPopupShow();
      this.inited = true;
    }
  },
  onBackBtnClick: function ()
  {
    this.allowFancyboxClose = false;
    this.elements.$close.trigger('click');
  },
  onCloseBtnClick: function ()
  {
    if ($.fancybox && this.allowFancyboxClose) {
      $.fancybox.close();
      this.allowFancyboxClose = true;
    }
  },
  catchPopupShow: function ()
  {
    let awaiter = setInterval(() => {
      if (window.b24form && $(this.activeFormSelector).length) {
        clearInterval(awaiter);
        this.initElements();
        this.customizePopup();
        $(this.activeFormSelector + ' .b24-window-scrollable').animate({opacity: 1}, 350);

        this.customizeAgreementPopup();
      }
    }, 30);
  },
  customizePopup: function ()
  {
    this.elements.$container.addClass('b24-window--custom-fix');

    let $agreementBlock = this.elements.$agreement.closest('.b24-form-field').parent();
    $agreementBlock.addClass('b24-form-agreement');
    let $submitBlock = this.elements.$submit.closest('.b24-form-btn-container');
    $submitBlock.addClass('b24-form-submit');
    // $submitBlock.after($agreementBlock);

    this.elements.$description.text('Оставьте номер вашего телефона, и наш менеджер свяжется с вами.');
    this.elements.$agreementLink.text('Согласие с политикой конфиденциальности');

    $('body').addClass('__sn-b24-popup-show');

    let $checkboxContainer = $('<span>')
      .addClass('sn-checkbox');
    let $checkboxMark = $('<span>')
      .addClass('sn-checkbox__mark');
    this.elements.$agreementCheckbox.wrap($checkboxContainer);
    this.elements.$agreementCheckbox.after($checkboxMark);

    this.elements.$submit.text('Заказать звонок');
  },
  customizeAgreementPopup: function ()
  {
    let $b24window = $('.vue-portal-target .b24-window').eq(0);
    $b24window.addClass('b24-agreement-popup-customized');
  },
};
$.grishchenk.b24customizer.init();

// ==================================================
// Yandex API apply
// ==================================================
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

// ==================================================
// Magnific gallery init swapper
// ==================================================
$(".magnific-gallery a").click(function (e) {
	setTimeout(function () {
		$(".mfp-container").swipe({
			swipeLeft: function (event, direction, distance, duration, fingerCount) {
				$.magnificPopup.instance.next();
			},
			swipeRight: function (event, direction, distance, duration, fingerCount) {
				console.log(fingerCount);
				$.magnificPopup.instance.prev();
			},
		});
	}, 300);
});

// ==================================================
// [Tour detail] mobile footer disappearing
// ==================================================
(function (window, document, $, undefined) {
	"use strict";
	
	$.grishchenk = $.grishchenk || {};
	$.grishchenk.stickyFooter = {
		init: function ()
		{
			this.displayOffset = 0;
			this.windowResizeInterval = false;

			this.initElements();
			this.initEvents();
			this.computeOffset();
		},
		initEvents: function ()
		{
			$(window).on('resize', $.proxy(this.onWindowResize, this));
			$(window).on('scroll', $.proxy(this.onWindowScroll, this));
		},
		initElements: function ()
		{
			this.$elements = {
				container: $('.tour-detail-section-container'),
				stickyFooter: $('.m-tour-detail-actions'),
			};
		},
		onWindowResize: function ()
		{
			window.clearInterval(this.windowResizeInterval);
			this.windowResizeInterval = window.setTimeout($.proxy(this.computeOffset, this), 300);
		},
		onWindowScroll: function ()
		{
			if ($(window).scrollTop() > this.displayOffset) {
				this.$elements.stickyFooter.css('display', 'none');
			} else {
				this.$elements.stickyFooter.css('display', 'flex');
			}
		},
		computeOffset: function ()
		{
			let stickyFooterHeight = this.$elements.stickyFooter.height();
			let bottomOffset = 0;
			// Отступ внизу сверху контейнера. Граница теперь сверху контейнера, расчет относительно верха экрана
			bottomOffset += this.$elements.container.offset().top;
			// Отступ внизу на высоту контейнера. Граница теперь внизу контейнера, расчет относительно верха экрана
			bottomOffset += this.$elements.container.height();
			// Отступ вверх на высоту окна. Граница так же внизу контейнера, но расчет уже относительно низа экрана
			bottomOffset -= $(window).height();
			// Отступ вниз на высоту липкого футера. Граница относительно низа экрана
			bottomOffset -= stickyFooterHeight;
			// Дополнительно поднимаем границу вверх
			bottomOffset -= 20;

			this.displayOffset = bottomOffset;
		},
	};
	$.grishchenk.stickyFooter.init();
})(window, document, jQuery);

// ==================================================
// Mobile Menu
// ==================================================
(function (window, document, $, undefined) {
  "use strict";
  
  $.grishchenk = $.grishchenk || {};
  $.grishchenk.mobileMenu = {
    init: function ()
    {
      $('.js-sn-menu-select select').select2();

      this.initElements();
      this.initEvents();
    },
    initEvents: function ()
    {

    },
    initElements: function ()
    {
      this.scrollable = new SimpleBar($('#m-menu-tour-list')[0]);
    },
  };
})(window, document, jQuery);

// ==================================================
// List Carousel
// ==================================================
(function (window, document, $, undefined) {
  "use strict";
  
  $.grishchenk = $.grishchenk || {};
  $.grishchenk.ListCarousel = ListCarousel;

  function ListCarousel(params) {
    this.params = params;

    this.init(params);
  };

  ListCarousel.prototype.init = function () {
    this.initElements();
    this.initEvents();
  }

  ListCarousel.prototype.initEvents = function (innerElement)
  {
    this.elements.$headings.on('click', e => this.onHeadingClick(e));
    this.elements.$showAllBtn.on('click', e => this.onShowAllBtnClick(e));
    this.elements.$hideAllBtn.on('click', e => this.onHideAllBtnClick(e));
  }

  ListCarousel.prototype.initElements = function ()
  {
    this.elements = {};

    let $instance;
    if (this.params && this.params.selector) {
      $instance = $(this.params.selector);
      if (!$instance.length) {
        throw '"'+this.params.selector+'" — This list carousel doesn\'t exists';
      }
      $instance = $instance.eq(0);
    } else if (this.params && $.grishchenk.isElement(this.params.element)) {
      $instance = $(this.params.element);
    } else if ($.grishchenk.isElement(this.params)) {
      $instance = $(this.params);
      this.params = {
        element: this.params,
      };
    } else {
      throw 'Cannot init ListCarousel without selector or element';
    }

    this.elements.$instance = $instance;
    this.elements.$showAllBtn = $instance.find('[data-show-all]');
    this.elements.$hideAllBtn = $instance.find('[data-hide-all]');
    this.elements.$items = $instance.find('[data-item]');
    this.elements.$headings = $instance.find('[data-heading]');

    this.classes = {};
    this.classes.visibleItem = this.params.visibilityClass || 'visible';

    this.selectors = {};
    this.selectors.visibleItem = '.'+this.classes.visibleItem;
  }

  ListCarousel.prototype.onHeadingClick = function (e) 
  {
    let $heading = $.grishchenk.eTarget(e);
    let $item = $heading.closest('[data-item]');
    $item.toggleClass(this.classes.visibleItem);

    // $item.siblings().removeClass('--visible');
    this.checkoutHiderState();
  }

  ListCarousel.prototype.onShowAllBtnClick = function (e)
  {
    let $btn = $.grishchenk.eTarget(e);
    this.elements.$items.addClass(this.classes.visibleItem);

    this.checkoutHiderState();
  }

  ListCarousel.prototype.onHideAllBtnClick = function (e) {
    let $btn = $.grishchenk.eTarget(e);
    this.elements.$items.removeClass(this.classes.visibleItem);

    this.checkoutHiderState();
  }

  ListCarousel.prototype.shouldHiderShow = function () 
  {
    let $items = this.elements.$instance.find('[data-item]');
    let $activeItems = $items.filter(this.selectors.visibleItem);

    return $items.length === $activeItems.length;
  }

  ListCarousel.prototype.checkoutHiderState = function () 
  {
    if (this.shouldHiderShow()) {
      this.elements.$hideAllBtn.removeAttr('style');
      this.elements.$showAllBtn.css('display', 'none');
    } else {
      this.elements.$hideAllBtn.css('display', 'none');
      this.elements.$showAllBtn.removeAttr('style');
    }
  }
})(window, document, jQuery);

$('.js-tdb-carousel-list').each((i, carouselList) => {
  new $.grishchenk.ListCarousel({
    element: carouselList,
    visibilityClass: '--visible',
  });
});

console.log('[js] Main lazy script loaded');
