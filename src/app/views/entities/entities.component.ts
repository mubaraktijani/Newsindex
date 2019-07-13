import { Component, OnInit } from '@angular/core';
import { Config } from '../../app.config';
import { PageHeaderBreadcrumb } from '../../layouts/pageHeader/pageHeader.layout';

@Component({
	selector: 'app-entities',
	templateUrl: './entities.component.html'
})
export class EntitiesComponent implements OnInit {

	title = 'Entites';
	href = '/entities';
	src: string = Config.URL.entites;
	page_header_breadcrumb: Array<PageHeaderBreadcrumb> = [{ title: this.title, router: this.href }];

	constructor() { }

	ngOnInit() { }

}
