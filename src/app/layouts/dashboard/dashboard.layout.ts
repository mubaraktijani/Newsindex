import { Component, OnInit } from '@angular/core';
import { detectBody } from 'src/app/app.helpers';

declare var jQuery: any;

@Component({
	selector: 'app-dashboard-layout',
	templateUrl: './dashboard.layout.html',
	// tslint:disable-next-line:use-host-property-decorator
	host: {
		'(window:resize)': 'onResize()'
	}
})

// tslint:disable-next-line:component-class-suffix
export class DashboardLayout implements OnInit {

	// nav: any;

	constructor() {
		// this.nav = document.querySelector('nav.navbar');
	}

	ngOnInit() {
		// this.nav.className += ' white-bg';
		detectBody();
	}

	onResize() {
		detectBody();
	}

}
