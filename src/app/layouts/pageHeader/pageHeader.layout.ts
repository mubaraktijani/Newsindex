import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { App } from '../../app.config';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'app-pageHeader-layout',
	templateUrl: './pageHeader.layout.html'
})

// tslint:disable-next-line:component-class-suffix
export class PageHeaderLayout implements OnInit {

	routerParams: object | any = {};

	@Input() href = '';
	@Input() name = 'Page Title';
	@Input() breadcrumb: Array<PageHeaderBreadcrumb> = [];
	@Input() icon;
	@Input() action: PageHeaderAction;

	constructor(private route: ActivatedRoute) { }

	ngOnInit() {

		const bCount = this.breadcrumb.length;

		this.route.paramMap.subscribe(
			(params: ParamMap) => {

				params.keys.forEach(key => {
					this.routerParams[key] = params.get(key);
				});

				if (params.has('one')) {
					this.breadcrumb[bCount] = { title: params.get('one'), router: this.href };
				}
				if (params.has('two')) {
					this.breadcrumb[bCount + 1] = { title: params.get('two'), router: this.href };
				}
				if (params.has('three')) {
					this.breadcrumb[bCount + 2] = { title: params.get('three'), router: this.href };
				}
			}
		);
		this.breadcrumb.forEach((key: PageHeaderBreadcrumb) => {
			key.title = App.__replace(key.title, '--', '');
			key.title = App.__replace(key.title, '-s', '`s');
			key.title = App.__replace(key.title, '-', ' ');
			key.title = key.title.replace(/\b\w/g, first => first.toLocaleUpperCase());
		});
	}

}

export interface PageHeaderBreadcrumb {
	title: string;
	router?: string;
}

export interface PageHeaderAction {
	name: string;
	icon?: string;
	router?: string;
	href?: string;
	onClick?: void;
	class?: string;
}
