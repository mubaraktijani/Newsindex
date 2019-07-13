import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { smoothlyMenu } from './../../app.helpers';
declare var jQuery: any;

@Component({
	selector: 'app-topnavbar-layout',
	templateUrl: './topnavbar.layout.html'
})

// tslint:disable-next-line:component-class-suffix
export class TopnavbarLayout implements OnInit {

	// tslint:disable-next-line:no-output-on-prefix
	@Output() onLogout = new EventEmitter();

	constructor() { }

	ngOnInit() {
	}

	toggleNavigation(): void {
		jQuery('body').toggleClass('mini-navbar');
		smoothlyMenu();
	}

	logout() {
		this.onLogout.emit();
	}

}
