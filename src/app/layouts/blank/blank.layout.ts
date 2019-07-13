import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

declare var jQuery: any;

@Component({
	selector: 'app-blank-layout',
	templateUrl: './blank.layout.html'
})

// tslint:disable-next-line:component-class-suffix
export class BlankLayout implements OnInit, AfterViewInit, OnDestroy {

	constructor() { }

	ngOnInit() {
	}

	ngAfterViewInit() {
		jQuery('body').addClass('gray-bg');
	}

	ngOnDestroy() {
		jQuery('body').removeClass('gray-bg');
	}

}
