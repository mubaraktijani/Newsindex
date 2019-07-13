import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
	selector: 'app-tab-content-layout',
	templateUrl: './tab-content.layout.html',
})

// tslint:disable-next-line:component-class-suffix
export class TabContentLayout implements OnInit {

	@Input() id: string;
	@Input() icon: string;
	@Input() title: string;
	@Input() active: any = false;

	constructor() { }

	ngOnInit() {
		this.id = this.title
			.replace(new RegExp(' ', 'g'), '-')
			.toLowerCase();
	}

}
