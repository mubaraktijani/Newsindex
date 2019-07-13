import { Component, OnInit } from '@angular/core';
import { detectBody } from 'src/app/app.helpers';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'app-topNavigation-layout',
	templateUrl: './topNavigation.layout.html',
	// tslint:disable-next-line:use-host-property-decorator
	host: {
		'(window:resize)': 'onResize()'
	}
})

// tslint:disable-next-line:component-class-suffix
export class TopNavigationLayout implements OnInit {

	constructor() { }

	ngOnInit() {
		detectBody();
	}

	onResize() {
		detectBody();
	}

}
