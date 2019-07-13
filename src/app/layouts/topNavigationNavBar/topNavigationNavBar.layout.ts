import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { smoothlyMenu } from '../../app.helpers';
declare var jQuery: any;

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'app-topNavigationNavBar-layout',
	templateUrl: './topNavigationNavBar.layout.html'
})

// tslint:disable-next-line:component-class-suffix
export class TopNavigationNavBarLayout implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	toggleNavigation(): void {
		jQuery('body').toggleClass('mini-navbar');
		smoothlyMenu();
	}

}
