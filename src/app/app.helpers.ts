/*
 * Inspinia js helpers:
 *
 * correctHeight() - fix the height of main wrapper
 * detectBody() - detect windows size
 * smoothlyMenu() - add smooth fade in/out on navigation show/ide
 *
 */

declare var jQuery: any;

export function correctHeight() {

	const pageWrapper = jQuery('#page-wrapper');
	const navbarHeight = jQuery('nav.navbar-default').height();
	const wrapperHeight = pageWrapper.height();

	if (navbarHeight > wrapperHeight) {
		pageWrapper.css('min-height', navbarHeight + 'px');
	}

	if (navbarHeight <= wrapperHeight) {
		if (navbarHeight < jQuery(window).height()) {
			pageWrapper.css('min-height', jQuery(window).height() + 'px');
		} else {
			pageWrapper.css('min-height', navbarHeight + 'px');
		}
	}

	if (jQuery('body').hasClass('fixed-nav')) {
		if (navbarHeight > wrapperHeight) {
			pageWrapper.css('min-height', navbarHeight + 'px');
		} else {
			pageWrapper.css('min-height', jQuery(window).height() - 60 + 'px');
		}
	}
}

export function detectBody() {
	if (jQuery(document).width() < 769) {
		jQuery('body').addClass('body-small');
	} else {
		jQuery('body').removeClass('body-small');
	}
}

export function smoothlyMenu() {
	if (!jQuery('body').hasClass('mini-navbar') || jQuery('body').hasClass('body-small')) {
		// Hide menu in order to smoothly turn on when maximize menu
		jQuery('#side-menu').hide();
		// For smoothly turn on menu
		setTimeout(function () {
			jQuery('#side-menu').fadeIn(400);
		}, 200);
	} else if (jQuery('body').hasClass('fixed-sidebar')) {
		jQuery('#side-menu').hide();
		setTimeout(
			function () {
				jQuery('#side-menu').fadeIn(400);
			}, 100);
	} else {
		// Remove all inline style from jquery fadeIn function to reset menu state
		jQuery('#side-menu').removeAttr('style');
	}
}


export function initLandingPage() {

	let didScroll = false;
	const docElem = document.documentElement;
	const header = document.querySelector('.navbar-default');
	const changeHeaderOn = 200;

	jQuery('body').scrollspy({
		target: '.navbar-fixed-top',
		offset: 80
	});

	// Page scrolling feature
	jQuery('a.page-scroll').bind('click', function (event) {
		const link = jQuery(this);
		jQuery('html, body').stop().animate({
			scrollTop: jQuery(link.attr('href')).offset().top - 50
		}, 500);
		event.preventDefault();
		jQuery('#navbar').collapse('hide');
	});

	function init() {
		window.addEventListener('scroll', function (event) {
			if (!didScroll) {
				didScroll = true;
				setTimeout(scrollPage, 250);
			}
		}, false);
	}
	function scrollPage() {
		const sy = scrollY();
		if (sy >= changeHeaderOn) {
			jQuery(header).addClass('navbar-scroll');
		} else {
			jQuery(header).removeClass('navbar-scroll');
		}
		didScroll = false;
	}
	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}
	init();
}
