import { Component, OnInit, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import 'jquery-slimscroll';
import { Auth } from 'src/app/helpers/auth.helper';
import { Role } from 'src/app/helpers/role.helper';

declare var jQuery: any;

@Component({
	selector: 'app-navigation-layout',
	templateUrl: './navigation.layout.html'
})

// tslint:disable:no-output-on-prefix
// tslint:disable-next-line:component-class-suffix
export class NavigationLayout implements OnInit, AfterViewInit {

	@Output() onLogout = new EventEmitter();

	auth = new Auth();
	role = new Role();
	loading = false;
	user: object | any = Auth.user();
	routeParam: Array<string> = [];

	constructor(private router: Router) {
		this.getRouteParam();

		router.events.subscribe((event: Event) => {

			if (event instanceof NavigationStart) {
				// Show loading indicator
			}

			if (event instanceof NavigationEnd) {
				// Hide loading indicator
				this.getRouteParam();
			}

			if (event instanceof NavigationError) {
				// Hide loading indicator
				// Present error to user
				console.log(event.error);
			}
		});
	}

	ngOnInit() {
	}

	ngAfterViewInit() {
		jQuery('#side-menu').metisMenu();

		if (jQuery('body').hasClass('fixed-sidebar')) {
			jQuery('.sidebar-collapse').slimscroll({
				height: '100%'
			});
		}
	}

	logout() {
		this.onLogout.emit();
	}

	activeRoute(routename: string | Array<string>, parent = true): boolean {
		if (typeof routename === 'string') {
			const url = this.router.url.split('/');
			url.shift();
			if (parent) {
				return (url[0] === routename) ? true : false;
			}
			return (url.join('/') === routename) ? true : false;
		}
		return this.router.url.indexOf(routename.join('/')) > -1;
	}

	getRouteParam() {
		const url = this.router.url.split('?')[0].split('/');

		if (url.length >= 2) {
			url.shift();
			this.routeParam = url;
		}
	}
}
