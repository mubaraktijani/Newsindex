import { Component, OnInit } from '@angular/core';
import { Config } from '../../app.config';
import { PageHeaderBreadcrumb } from '../../layouts/pageHeader/pageHeader.layout';

@Component({
	selector: 'app-viewed',
	templateUrl: './viewed.component.html'
})
export class ViewedComponent implements OnInit {

	title = 'My Viewed History';
	href = '/viewed';
	src: string = Config.URL.viewed;
	page_header_breadcrumb: Array<PageHeaderBreadcrumb> = [{ title: 'viewed', router: this.href }];

	constructor() { }

	ngOnInit() { }

}
