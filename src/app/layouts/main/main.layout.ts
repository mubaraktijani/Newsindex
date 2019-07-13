import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { detectBody } from '../../app.helpers';
import { App } from '../../app.config';

declare var jQuery: any;

@Component({
	selector: 'app-main-layout',
	templateUrl: './main.layout.html',
	// tslint:disable-next-line:use-host-property-decorator
	host: {
		'(window:resize)': 'onResize()'
	}
})

// tslint:disable-next-line:component-class-suffix
export class MainLayout implements OnInit, OnDestroy {

	loading = false;
	nav: any;
	body: any;

	constructor(private router: Router, private auth: AuthService) {
	}

	ngOnInit() {
		detectBody();
		this.body = document.querySelector('body');
		this.nav = document.querySelector('nav.navbar');

		this.body.className += ' my-skin';
		this.nav.className += ' white-bg';
	}

	ngOnDestroy(): any {
		this.body.classList.remove('my-skin');
		this.nav.classList.remove('white-bg');
	}

	onResize() {
		detectBody();
	}

	logout() {
		this.loading = true;
		this.auth.logout().subscribe(
			response => {
				App.__success(response);
				this.router.navigateByUrl('/auth/login');
			},
			error => {
				App.__error(error);
				this.loading = false;
			}
		);
	}

}
