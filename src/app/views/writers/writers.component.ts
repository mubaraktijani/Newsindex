import { Component, OnInit } from '@angular/core';
import { Config } from '../../app.config';
import { PageHeaderBreadcrumb } from '../../layouts/pageHeader/pageHeader.layout';

@Component({
	selector: 'app-writers',
	templateUrl: './writers.component.html'
})
export class WritersComponent implements OnInit {

	title = 'Writers';
	href = '/writers';
	src: string = Config.URL.writers;
	page_header_breadcrumb: Array<PageHeaderBreadcrumb> = [{ title: this.title, router: this.href }];

	constructor() { }

	ngOnInit() { }

}
