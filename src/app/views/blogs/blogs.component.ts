import { Component, OnInit } from '@angular/core';
import { Config } from '../../app.config';
import { PageHeaderBreadcrumb } from '../../layouts/pageHeader/pageHeader.layout';

@Component({
	selector: 'app-blogs',
	templateUrl: './blogs.component.html'
})
export class BlogsComponent implements OnInit {

	title = 'Blogs';
	href = '/blogs';
	src: string = Config.URL.blogs;
	page_header_breadcrumb: Array<PageHeaderBreadcrumb> = [{ title: this.title, router: this.href }];

	constructor() { }

	ngOnInit() { }

}
