import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-loading-layout',
	templateUrl: './loading.layout.html'
})

// tslint:disable-next-line:component-class-suffix
export class LoadingLayout implements OnInit {

	@Input() visibility = false;

	constructor() { }

	ngOnInit() {
	}

}
