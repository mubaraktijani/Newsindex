import { Component, OnInit } from '@angular/core';
import { PageHeaderBreadcrumb } from '../../layouts/pageHeader/pageHeader.layout';
import { Config } from '../../app.config';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {

	title = 'Categories';
	href = '/categories';
	src: string = Config.URL.categories;
	page_header_breadcrumb: Array<PageHeaderBreadcrumb> = [{ title: this.title, router: this.href }];

	constructor() { }

	ngOnInit() { }

}
