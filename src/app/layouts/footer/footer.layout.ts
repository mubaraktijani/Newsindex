import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-footer-layout',
	templateUrl: './footer.layout.html'
})

// tslint:disable-next-line:component-class-suffix
export class FooterLayout implements OnInit {

	date: Date = new Date();

	constructor() { }

	ngOnInit() {
	}

}
