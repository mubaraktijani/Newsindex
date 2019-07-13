import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ControlMenu } from '../browserControl/browserControl.layout';

// tslint:disable:component-selector
@Component({
	selector: 'app-browserNavigation-layout',
	templateUrl: './browserNavigation.layout.html'
})

// tslint:disable:component-class-suffix
export class BrowserNavigationLayout implements OnInit {

	@Input() href: string;
	@Input() data: Array<Navigation | any> = [];
	@Input() controlMenu: ControlMenu[] = [];

	viewType = 1;

	constructor(
		private router: Router
	) { }

	ngOnInit() {
		this.controlMenu[20] = {
			group: 'list',
			name: 'List View',
			icon: 'fa-bars',
			value: 'List View',
			showAsAction: false,
			showAsFullWidth: false,
			iconOnly: true,
			selected: (this.viewType === 1),
			onClick: (args: ControlMenu[]) => {
				this.viewType = 1;
				args[20].selected = true;
				args[21].selected = false;
			}
		};
		this.controlMenu[21] = {
			group: 'grid',
			name: 'Grid View',
			icon: 'fa-th',
			value: 'Grid View',
			showAsAction: false,
			showAsFullWidth: false,
			iconOnly: true,
			selected: (this.viewType === 2),
			onClick: (args: ControlMenu[]) => {
				this.viewType = 2;
				args[20].selected = false;
				args[21].selected = true;
			}
		};
	}

}

interface Navigation {
	id: number;
	slug: string;
	name: string;
	today_count: number;
}
