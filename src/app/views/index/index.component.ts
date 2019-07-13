import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { initLandingPage } from 'src/app/app.helpers';
import { WOW } from './../../../../vendor/wow/wow.min.js';
import { Config } from 'src/app/app.config.js';

declare var jQuery: any;

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styles: [``],
})

export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {

	config = Config;

	constructor() { }

	ngOnInit() {
		initLandingPage();
	}

	ngAfterViewInit() {
		jQuery('body').attr('id', 'page-top');
		jQuery('body').addClass('landing-page no-skin-config');
		const wow = new WOW({
			live: false
		});
		wow.init();
		// Synchronise WoW
		// wow.sync();
	}

	ngOnDestroy() {
		jQuery('body').removeClass('landing-page no-skin-config');
		jQuery('body').removeAttr('id');
	}
}
