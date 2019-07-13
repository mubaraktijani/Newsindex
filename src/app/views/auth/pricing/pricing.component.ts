import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
declare var jQuery: any;

@Component({
	selector: 'app-pricing',
	templateUrl: './pricing.component.html',
	styleUrls: ['./pricing.component.scss']
})

export class PricingComponent implements OnInit, AfterViewInit, OnDestroy {

	constructor() { }

	ngOnInit() {
	}

	ngAfterViewInit() {
		// jQuery('body').addClass('landing-page');
	}

	ngOnDestroy() {
		// jQuery('body').removeClass('landing-page');
	}

}
